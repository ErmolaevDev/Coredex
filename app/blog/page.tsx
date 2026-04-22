import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Блог Coredex | Советы по управлению цифровыми активами",
  description: "Читайте статьи о управлении подписками, безопасности и лучших практиках цифровой жизни.",
}

const blogPosts = [
  {
    id: 1,
    title: "Как организовать все подписки в одном месте",
    excerpt: "Полное руководство по систематизации и отслеживанию всех ваших подписок, лицензий и сервисов.",
    date: "15 апреля 2026",
    author: "Иван Петров",
    category: "Советы",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    readTime: "8 мин",
  },
  {
    id: 2,
    title: "Безопасность в эпоху цифровых активов",
    excerpt: "Почему Zero-Knowledge архитектура важна для защиты вашей приватности и как Coredex её использует.",
    date: "12 апреля 2026",
    author: "Мария Иванова",
    category: "Безопасность",
    image: "https://images.unsplash.com/photo-1550439062-609e7e64c3e4?w=600&h=400&fit=crop",
    readTime: "10 мин",
  },
  {
    id: 3,
    title: "Сэкономьте $1000 в год на подписках",
    excerpt: "Реальная история о том, как пользователь Coredex найден и отменили ненужные подписки.",
    date: "10 апреля 2026",
    author: "Коредекс Тим",
    category: "Истории",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    readTime: "5 мин",
  },
  {
    id: 4,
    title: "Управление семейными финансами с Coredex",
    excerpt: "Как семьи используют Coredex для управления совместными подписками и контроля расходов.",
    date: "8 апреля 2026",
    author: "Роман Сидоров",
    category: "Семья",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    readTime: "7 мин",
  },
  {
    id: 5,
    title: "Цифровое наследие: что должна знать каждая семья",
    excerpt: "Почему важно планировать цифровое наследие и как Coredex помогает сохранить доступ к вашим активам.",
    date: "5 апреля 2026",
    author: "Ольга Кузнецова",
    category: "Планирование",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    readTime: "9 мин",
  },
  {
    id: 6,
    title: "Лучшие практики управления API-ключами",
    excerpt: "Как эффективно управлять API-ключами, лицензиями и хранить их в безопасности с Coredex.",
    date: "2 апреля 2026",
    author: "Сергей Волков",
    category: "Разработка",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    readTime: "11 мин",
  },
]

const categories = ["Все", "Советы", "Безопасность", "Истории", "Семья", "Планирование", "Разработка"]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#161415]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-[#95122C]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide mb-6">Блог Coredex</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5F5F5] leading-tight mb-6">
            Советы и истории о управлении цифровыми активами
          </h1>
          <p className="text-xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed">
            Читайте статьи о безопасности, оптимизации расходов и лучших практиках управления вашей цифровой жизнью.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-20 z-40 bg-[#161415]/80 backdrop-blur-md border-b border-[#3F3C3E]/50 py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  category === "Все"
                    ? "bg-[#95122C] text-white"
                    : "bg-[#2A2729] text-[#A3A3A3] hover:border-[#95122C]/50 border border-[#3F3C3E]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <div className="rounded-2xl border border-[#3F3C3E] overflow-hidden bg-[#2A2729] hover:border-[#95122C]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#95122C]/10 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#3F3C3E]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#95122C] text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#95122C] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[#A3A3A3] text-sm mb-6 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#3F3C3E]/50 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[#95122C] font-medium text-sm group-hover:gap-3 transition-all">
                      Читать
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 border-y border-[#3F3C3E]/50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
            Получайте новые статьи еженедельно
          </h2>
          <p className="text-[#A3A3A3] mb-8">
            Подпишитесь на нашу рассылку и будьте в курсе последних советов и обновлений.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-xl bg-[#2A2729] border border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#95122C]"
            />
            <button className="px-6 py-3 rounded-xl bg-[#95122C] text-white font-semibold hover:bg-[#c41e3a] transition-colors">
              Подписать
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
