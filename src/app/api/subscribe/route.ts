import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

interface PushSubscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

const subscriptions: PushSubscription[] = [];

export async function POST(req: NextRequest) {
  const subscription: PushSubscription = await req.json();
  console.log(subscription)
  subscriptions.push(subscription); 
  return NextResponse.json({ message: 'Subscription saved' }, { status: 201 });
}
