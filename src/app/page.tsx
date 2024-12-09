"use client"

import { useNotification } from "@/components/providers/push-provider"

export default function Home() {
  const { handleSubscribe } = useNotification()
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1>Push Notifications with Next.js</h1>
      <button onClick={handleSubscribe}>
        Subscribe
      </button>
    </div>
  )
}
