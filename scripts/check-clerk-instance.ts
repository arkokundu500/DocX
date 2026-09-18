import 'dotenv/config';

async function checkClerkDetails() {
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) return;

  const endpoints = [
    '/v1/instance/restrictions',
    '/v1/oauth_applications',
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`https://api.clerk.com${ep}`, {
        headers: { Authorization: `Bearer ${secret}` },
      });
      console.log(`Endpoint ${ep} status:`, res.status);
      const data = await res.json();
      console.log(`Data for ${ep}:`, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error on ${ep}:`, e);
    }
  }
}

checkClerkDetails();
