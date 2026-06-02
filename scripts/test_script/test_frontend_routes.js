const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://141.253.114.218';
const routes = [
  '/',
  '/dashboard',
  '/courses',
  '/community',
  '/wiki',
  '/study/1',
  '/profile/1',
  '/leaderboard',
];

(async () => {
  console.log('=== Frontend Route Healthcheck ===');
  let allOk = true;
  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    try {
      const resp = await axios.get(url, { timeout: 8000, maxRedirects: 0, validateStatus: null });
      if (resp.status === 200) {
        console.log(`✅ ${route} → 200 OK`);
      } else {
        console.log(`❌ ${route} → ${resp.status}`);
        allOk = false;
      }
    } catch (err) {
      console.log(`❌ ${route} → error: ${err.message}`);
      allOk = false;
    }
  }
  console.log('\nResult:', allOk ? 'ALL PASS' : 'SOME FAIL');
})();
