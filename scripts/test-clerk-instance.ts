import { createClerkClient } from '@clerk/backend';
import 'dotenv/config';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
});

async function run() {
  try {
    // Check if instance update is possible
    console.log('Testing clerk.instance...');
    const inst = await fetch('https://api.clerk.com/v1/instance', {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });
    console.log('Instance status:', inst.status, await inst.json());
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
