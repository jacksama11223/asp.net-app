const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Base URL (adjust if needed)
const BASE_URL = process.env.BASE_URL || 'http://141.253.114.218';

// Endpoints to test – extend as needed
const endpoints = [
  { url: '/api/community/posts', method: 'GET', expectedStatus: 200 },
  { url: '/api/community/posts/1', method: 'GET', expectedStatus: 200 },
  { url: '/api/community/posts/1/vote', method: 'POST', expectedStatus: 200 },
];

(async () => {
  const reportLines = [];
  reportLines.push('# SmartLMS Community API Test Report');
  reportLines.push(`Generated at ${new Date().toISOString()}`);
  reportLines.push('');

  const client = axios.create({ baseURL: BASE_URL, timeout: 8000 });

  for (const ep of endpoints) {
    const fullUrl = ep.url;
    try {
      const resp = await client.request({ method: ep.method, url: fullUrl });
      const ok = resp.status === ep.expectedStatus;
      reportLines.push(`${ok ? '✅' : '❌'} ${ep.method} ${fullUrl} → HTTP ${resp.status}`);
    } catch (err) {
      const status = err.response ? err.response.status : 'N/A';
      reportLines.push(`❌ ${ep.method} ${fullUrl} → Error (${status}) ${err.message}`);
    }
  }

  const reportPath = path.resolve('c:/code/asp.net/community_api_test_report.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');
  console.log('Report written to', reportPath);
})();
