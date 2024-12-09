import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import webPush from 'web-push';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;

webPush.setVapidDetails(
  'mailto:test@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

interface PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

const subscriptions: PushSubscription[] = []; // Replace with a database in production

export async function POST(req: NextRequest) {
  const { title, message }: { title: string; message: string } = await req.json();
  const payload = JSON.stringify({ title, message });

  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload).catch(console.error);
  });

  return NextResponse.json({ message: 'Notifications sent' }, { status: 200 });
}
