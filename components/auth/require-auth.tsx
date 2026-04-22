"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TOKEN_KEY } from "@/lib/api"
import { Spinner } from "@/components/ui/spinner"

/**
 * Client guard: JWT lives in localStorage only, so Edge middleware cannot read it.
 * Redirects to /login when there is no token.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY)
    if (!t) {
      router.replace("/login")
      return
    }
    setAllowed(true)
  }, [router])

  if (!allowed) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    )
  }

  return <>{children}</>
}
