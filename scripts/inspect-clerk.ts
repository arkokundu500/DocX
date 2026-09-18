import { createClerkClient } from '@clerk/backend';
import 'dotenv/config';

const secretKey = process.env.CLERK_SECRET_KEY;
const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const clerk = createClerkClient({ secretKey, publishableKey });

async function run() {
  try {
    console.log('Fetching users from Clerk...');
    const users = await clerk.users.getUserList({ limit: 10 });
    console.log('Total users:', users.totalCount);
    users.data.forEach(u => {
      console.log('User:', {
        id: u.id,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        emails: u.emailAddresses.map(e => e.emailAddress),
        phones: u.phoneNumbers.map(p => p.phoneNumber),
        metadata: u.publicMetadata
      });
    });
  } catch (e: any) {
    console.error('Clerk Error:', e.message || e);
    if (e.errors) console.error('Details:', JSON.stringify(e.errors, null, 2));
  }
}
run();
