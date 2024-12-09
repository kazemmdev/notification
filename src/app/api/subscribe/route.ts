import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { db } from "@/libs/db"

interface PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export async function POST(req: NextRequest) {
  const body: PushSubscription = await req.json();
  const result = await db.subscriptions.create({
    data: {
      endpoint: body?.endpoint,
      key: body?.keys?.auth,
      token: body?.keys?.p256dh
    }
  });

  return NextResponse.json({ message: 'Subscription saved', result }, { status: 201 });
}
