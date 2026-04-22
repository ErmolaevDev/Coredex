"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "Как работает Zero-Knowledge архитектура в Coredex?",
    answer:
      "Мы используем end-to-end encryption, при котором только вы имеете доступ к своим данным. Даже наша команда не может видеть ваши пароли, API-ключи и другую чувствительную информацию. Все данные шифруются на вашем устройстве перед отправкой на серверы.",
  },
  {
    id: 2,
    question: "Можно ли использовать Coredex для семьи?",
    answer:
      "Да! Тариф Family позволяет добавить до 5 членов семьи с разными уровнями доступа. Вы можете разделять подписки, устанавливать бюджеты и контролировать расходы всей семьи, сохраняя приватность личных данных каждого.",
  },
  {
    id: 3,
    question: "Как Coredex помогает с цифровым наследием?",
    answer:
      "Вы можете назначить наследников и указать инструкции, как они должны получить доступ к вашим цифровым активам в случае чего. Это может быть очень важно для семей, которые хотят убедиться, что криптовалюта, цифровые активы и важные аккаунты будут доступны их близким.",
  },
  {
    id: 4,
    question: "Совместим ли Coredex с моим умным домом?",
    answer:
      "Coredex поддерживает интеграцию с популярными платформами умного дома (Apple HomeKit, Google Home, Alexa и др.). Вы можете управлять всеми устройствами, подписками и подключениями через единый интерфейс.",
  },
  {
    id: 5,
    question: "Что будет, если я забуду главный пароль?",
    answer:
      "Благодаря нашей архитектуре, мы не можем восстановить ваш пароль. Однако мы предоставляем несколько методов восстановления доступа: биометрия, восстановление через email, и опция резервных кодов. Мы рекомендуем сохранить резервные коды в безопасном месте.",
  },
  {
    id: 6,
    question: "Как часто I should backup мои данные?",
    answer:
      "Coredex автоматически создаёт резервные копии ваших данных в режиме реального времени. Вы можете экспортировать свои данные в любой момент в защищённом формате. Мы также предоставляем опцию автоматического ежемесячного экспорта на ваш выбранный облачный хранилище.",
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="border-b border-[#3F3C3E]/50"
      initial={false}
    >
      <motion.button
        onClick={onToggle}
        className="w-full py-6 px-4 sm:px-6 flex items-start justify-between hover:bg-[#2A2729]/50 transition-colors group"
      >
        <span className="text-left text-base sm:text-lg font-semibold text-[#F5F5F5] group-hover:text-[#95122C] transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0 mt-1"
        >
          <ChevronDown className="h-5 w-5 text-[#95122C]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6 text-[#A3A3A3] leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section className="relative py-24 lg:py-32 bg-[#161415] overflow-hidden">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#95122C]/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-[#95122C] uppercase tracking-wide">FAQ</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#F5F5F5] leading-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="mt-6 text-lg text-[#A3A3A3]">
            Ответы на самые популярные вопросы о Coredex
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="rounded-2xl border border-[#3F3C3E] bg-gradient-to-br from-[#2A2729]/50 to-transparent backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <FAQItem
                item={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#A3A3A3]">
            Не нашли ответ? 
            <span className="text-[#95122C] font-semibold ml-2">
              Свяжитесь с нашей поддержкой →
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
