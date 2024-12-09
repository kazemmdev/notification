import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import webPush from "web-push"
import { db } from "@/libs/db"

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!

webPush.setVapidDetails(
  "mailto:dev@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
)

interface PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export async function POST(req: NextRequest) {
  const { title, message }: { title: string; message: string } = await req.json()
  const payload = JSON.stringify({ title, message })
  const items = await db.subscriptions.findMany()

  items.forEach((subscription: any) => {
    const push: PushSubscription = {
      endpoint: subscription.endpoint,
      keys: { auth: subscription?.key, p256dh: subscription?.token },
    }
    webPush.sendNotification(push, payload).catch(console.error)
  })

  return NextResponse.json({ message: "Notifications sent" }, { status: 200 })
}
