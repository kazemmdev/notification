import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';

const VAPID_PUBLIC_KEY = 'BC9r7LrJRqQfJ03Ikhf0AhJ4Avp2tTeJkm6dFvsGvRHp7C3bMi9GpXP-VpLwsxbi7vKwlsoop724C8edHhyXlKw';
const VAPID_PRIVATE_KEY = 'm4_LvkGO1BRs8QSFnWO1133RHOpQd3CCbB_XiraU1UU';

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

  return NextResponse.json({ message: 'Notifications sent', payload }, { status: 200 });
}
