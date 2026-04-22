"use client"

import { Card } from "@/components/ui/card"
import { Shield, Lock, Server, Eye, CheckCircle2, Fingerprint } from "lucide-react"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "Your data is encrypted at rest and in transit using AES-256 encryption.",
  },
  {
    icon: Eye,
    title: "Zero-knowledge architecture",
    description: "We can't see your sensitive data. Only you hold the keys to decrypt it.",
  },
  {
    icon: Server,
    title: "Secure cloud storage",
    description: "Data stored in SOC 2 Type II compliant data centers with redundant backups.",
  },
  {
    icon: Fingerprint,
    title: "Biometric authentication",
    description: "Additional layer of security with fingerprint and face recognition support.",
  },
]

const certifications = [
  { name: "SOC 2", description: "Type II Certified" },
  { name: "GDPR", description: "Compliant" },
  { name: "CCPA", description: "Compliant" },
  { name: "ISO 27001", description: "Certified" },
]

export function Security() {
  return (
    <section id="security" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glassmorphism px-4 py-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Security First</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Your security is our{" "}
              <span className="text-gradient">top priority</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We use industry-leading security practices to ensure your data remains private and protected at all times.
            </p>

            <div className="mt-10 space-y-6">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="flex gap-5 p-4 rounded-xl transition-colors hover:bg-secondary/30"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Glow effect behind card */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-50" />
            
            <Card className="relative glass-card p-10 overflow-hidden">
              {/* Animated background */}
              <div className="pointer-events-none absolute inset-0 animate-shimmer opacity-30" />
              
              <div className="relative space-y-8">
                {/* Security visualization */}
                <div className="relative mx-auto h-56 w-56">
                  {/* Outer rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-56 w-56 rounded-full border border-primary/10 animate-pulse" style={{ animationDuration: '4s' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full border border-primary/20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  
                  {/* Core glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary/20 animate-pulse-glow" />
                  </div>
                  
                  {/* Center shield */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 glow-primary">
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  
                  {/* Orbiting dots */}
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute h-3 w-3 rounded-full bg-primary animate-pulse"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(100px) translateY(-50%)`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold">256-bit AES Encryption</h3>
                  <p className="mt-2 text-muted-foreground">
                    Bank-level security for all your data
                  </p>
                </div>

                {/* Certification badges */}
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-semibold">{cert.name}</div>
                        <div className="text-xs text-muted-foreground">{cert.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
