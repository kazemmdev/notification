import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { getDatabase } from "@/libs/db"
import type { Subscriptions } from "@/schema/subscriptions"

interface PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export async function POST(req: NextRequest) {
  const body: PushSubscription = await req.json();

  const db = await getDatabase();
  const collection = db.collection<Subscriptions>("subscriptions");
  const result = await collection.insertOne({
    endpoint: body?.endpoint,
    key: body?.keys?.auth,
    token: body?.keys?.p256dh
  });

  return NextResponse.json({ message: 'Subscription saved', result }, { status: 201 });
}
