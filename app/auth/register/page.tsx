'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { register, setAccessToken } from '@/lib/api'

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  promoCode: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    promoCode: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      setIsLoading(false)
      return
    }

    try {
      const { token } = await register(formData.username, formData.email, formData.password, formData.promoCode)
      setAccessToken(token)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-[#161415] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#2A2729] border-[#3F3C3E] rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-[#95122C] text-2xl font-bold">Coredex</h1>
          </div>
          <CardTitle className="text-[#F5F5F5] text-2xl">Регистрация</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            Создайте аккаунт для управления цифровыми активами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#F5F5F5]">Логин</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={50}
                value={formData.username}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="Ваш логин"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F5F5F5]">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#F5F5F5]">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="Минимум 8 символов"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#F5F5F5]">Повторение пароля</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="Повторите пароль"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promoCode" className="text-[#F5F5F5]">Промокод (опционально)</Label>
              <Input
                id="promoCode"
                name="promoCode"
                type="text"
                value={formData.promoCode}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="Введите промокод"
              />
            </div>

            {error && (
              <p className="text-[#95122C] text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#95122C] hover:bg-[#7a0f1f] text-white transition-all duration-200 hover:scale-105"
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#A3A3A3]">
              Уже есть аккаунт?{' '}
              <Link href="/auth/sign-in" className="text-[#95122C] hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}