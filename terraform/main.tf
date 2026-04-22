# Yandex Cloud Infrastructure for Coredex
# Production-ready Terraform configuration

terraform {
  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = "~> 0.100"
    }
  }
}

provider "yandex" {
  token     = var.yc_token
  cloud_id  = var.yc_cloud_id
  folder_id = var.yc_folder_id
  zone      = "ru-central1-a"
}

# Kubernetes Cluster
resource "yandex_kubernetes_cluster" "coredex_cluster" {
  name        = "coredex-prod"
  description = "Production Kubernetes cluster for Coredex"

  network_id = yandex_vpc_network.coredex_network.id

  master {
    version = "1.28"
    zonal {
      zone      = yandex_vpc_subnet.coredex_subnet.zone
      subnet_id = yandex_vpc_subnet.coredex_subnet.id
    }

    public_ip = true

    security_group_ids = [yandex_vpc_security_group.k8s_sg.id]

    maintenance_policy {
      auto_upgrade = true
      maintenance_window {
        start_time = "02:00"
        duration   = "3h"
      }
    }
  }

  service_account_id      = yandex_iam_service_account.k8s_sa.id
  node_service_account_id = yandex_iam_service_account.k8s_sa.id

  release_channel = "STABLE"

  depends_on = [
    yandex_resourcemanager_folder_iam_member.k8s_sa_editor,
    yandex_resourcemanager_folder_iam_member.k8s_sa_images_puller
  ]
}

# Node Group with Autoscaling
resource "yandex_kubernetes_node_group" "coredex_nodes" {
  cluster_id = yandex_kubernetes_cluster.coredex_cluster.id
  name       = "coredex-node-group"

  instance_template {
    platform_id = "standard-v3"

    network_interface {
      nat                = true
      subnet_ids         = [yandex_vpc_subnet.coredex_subnet.id]
      security_group_ids = [yandex_vpc_security_group.node_sg.id]
    }

    resources {
      memory = 8
      cores  = 2
    }

    boot_disk {
      type = "network-ssd"
      size = 64
    }

    scheduling_policy {
      preemptible = false
    }

    metadata = {
      ssh-keys = "ubuntu:${file("~/.ssh/id_rsa.pub")}"
    }
  }

  scale_policy {
    auto_scale {
      min     = 3
      max     = 10
      initial = 3
    }
  }

  allocation_policy {
    location {
      zone = "ru-central1-a"
    }
  }

  maintenance_policy {
    auto_upgrade = true
    auto_repair  = true
    maintenance_window {
      start_time = "03:00"
      duration   = "3h"
    }
  }
}

# Managed PostgreSQL
resource "yandex_mdb_postgresql_cluster" "coredex_db" {
  name        = "coredex-postgres"
  environment = "PRODUCTION"
  network_id  = yandex_vpc_network.coredex_network.id

  config {
    version = 15
    resources {
      resource_preset_id = "s3-c2-m8"  # 2 vCPU, 8 GB RAM
      disk_type_id       = "network-ssd"
      disk_size          = 100
    }
  }

  database {
    name  = "coredex"
    owner = "coredex_user"
  }

  user {
    name     = "coredex_user"
    password = var.db_password
    permission {
      database_name = "coredex"
    }
  }

  host {
    zone      = "ru-central1-a"
    subnet_id = yandex_vpc_subnet.coredex_subnet.id
  }

  maintenance_window {
    type = "WEEKLY"
    day  = "SAT"
    hour = "02"
  }

  security_group_ids = [yandex_vpc_security_group.db_sg.id]
}

# Redis Cluster
resource "yandex_mdb_redis_cluster" "coredex_cache" {
  name        = "coredex-redis"
  environment = "PRODUCTION"
  network_id  = yandex_vpc_network.coredex_network.id

  config {
    version = "7.0"
    resources {
      resource_preset_id = "hm3-c2-m4"  # 2 vCPU, 4 GB RAM
      disk_type_id       = "network-ssd"
      disk_size          = 32
    }
  }

  host {
    zone      = "ru-central1-a"
    subnet_id = yandex_vpc_subnet.coredex_subnet.id
  }

  maintenance_window {
    type = "WEEKLY"
    day  = "SAT"
    hour = "03"
  }

  security_group_ids = [yandex_vpc_security_group.redis_sg.id]
}

# Object Storage Bucket
resource "yandex_storage_bucket" "coredex_assets" {
  bucket = "coredex-encrypted-assets"
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule {
    id      = "delete_old_versions"
    enabled = true

    noncurrent_version_expiration {
      days = 30
    }
  }
}

# Load Balancer
resource "yandex_lb_network_load_balancer" "coredex_lb" {
  name = "coredex-load-balancer"

  listener {
    name = "coredex-listener"
    port = 80
    external_address_spec {
      ip_version = "ipv4"
    }
  }

  listener {
    name = "coredex-ssl-listener"
    port = 443
    external_address_spec {
      ip_version = "ipv4"
    }
  }

  attached_target_group {
    target_group_id = yandex_lb_target_group.coredex_targets.id

    healthcheck {
      name = "http"
      http_options {
        port = 8080
        path = "/health"
      }
    }
  }
}

# CDN
resource "yandex_cdn_origin_group" "coredex_cdn" {
  name     = "coredex-cdn"
  use_next = true

  origin {
    source = yandex_lb_network_load_balancer.coredex_lb.listener[0].external_address_spec[0].address
    backup = false
  }
}

resource "yandex_cdn_resource" "coredex_cdn_resource" {
  cname               = "cdn.coredex.ru"
  active              = false
  origin_protocol     = "https"
  origin_group_id     = yandex_cdn_origin_group.coredex_cdn.id
  secondary_hostnames = ["www.coredex.ru"]

  options {
    disable_cache      = false
    edge_cache_settings = 345600  # 4 days
    browser_cache_settings = 86400  # 1 day
  }

  ssl_certificate {
    type = "lets_encrypt_gcore"
  }
}

# Lockbox (Secrets Management)
resource "yandex_lockbox_secret" "coredex_secrets" {
  name        = "coredex-production-secrets"
  description = "Production secrets for Coredex application"

  password_payload_specification {
    password_payload {
      key1 = "JWT_SECRET"
      key2 = "DB_PASSWORD"
      key3 = "REDIS_PASSWORD"
    }
  }
}

# Monitoring (Cloud Logging)
resource "yandex_logging_group" "coredex_logs" {
  name             = "coredex-application-logs"
  description      = "Centralized logging for Coredex application"
  retention_period = "2592000s"  # 30 days

  cloud_id = var.yc_cloud_id
  folder_id = var.yc_folder_id
}

# Variables
variable "yc_token" {
  description = "Yandex Cloud OAuth token"
  type        = string
  sensitive   = true
}

variable "yc_cloud_id" {
  description = "Yandex Cloud ID"
  type        = string
}

variable "yc_folder_id" {
  description = "Yandex Cloud Folder ID"
  type        = string
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  sensitive   = true
}

# Outputs
output "kubernetes_cluster_id" {
  value = yandex_kubernetes_cluster.coredex_cluster.id
}

output "postgres_cluster_id" {
  value = yandex_mdb_postgresql_cluster.coredex_db.id
}

output "redis_cluster_id" {
  value = yandex_mdb_redis_cluster.coredex_cache.id
}

output "load_balancer_ip" {
  value = yandex_lb_network_load_balancer.coredex_lb.listener[0].external_address_spec[0].address
}

output "cdn_cname" {
  value = yandex_cdn_resource.coredex_cdn_resource.cname
}