'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { login, setAccessToken } from '@/lib/api'

interface SignInFormData {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { token } = await login(formData.email, formData.password)
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
          <CardTitle className="text-[#F5F5F5] text-2xl">Вход</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            Войдите в свой аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.password}
                onChange={handleChange}
                className="bg-[#161415] border-[#3F3C3E] text-[#F5F5F5] placeholder-[#A3A3A3] focus:border-[#95122C] focus:ring-[#95122C]"
                placeholder="Ваш пароль"
              />
            </div>

            <div className="text-right">
              <Link href="#" className="text-[#95122C] hover:underline text-sm">
                Забыли пароль?
              </Link>
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
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#A3A3A3]">
              Нет аккаунта?{' '}
              <Link href="/auth/register" className="text-[#95122C] hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}