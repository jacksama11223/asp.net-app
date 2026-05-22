const axios = require('axios');

// Base URL configured to the Load Balancer IP
const BASE_URL = process.env.BASE_URL || 'http://141.253.114.218';

(async () => {
  console.log('====================================================');
  console.log(`Starting Swagger API UI Routing Test on ${BASE_URL}...`);
  console.log('====================================================\n');

  let allPassed = true;

  // Test 1: Swagger JSON endpoint
  try {
    const jsonUrl = `${BASE_URL}/swagger/v1/swagger.json`;
    console.log(`Testing Swagger JSON Schema: ${jsonUrl}`);
    const response = await axios.get(jsonUrl, { timeout: 5000 });
    
    if (response.status === 200 && response.data.openapi) {
      console.log(`✅ SUCCESS: Swagger JSON retrieved successfully (OpenAPI Version: ${response.data.openapi})`);
      console.log(`   - Total API paths found: ${Object.keys(response.data.paths || {}).length}`);
    } else {
      console.log(`❌ FAILED: Unexpected response status ${response.status} or missing openapi property.`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ FAILED: Cannot connect or retrieve Swagger JSON. Error: ${error.message}`);
    if (error.response) {
      console.log(`   - Status code: ${error.response.status}`);
    }
    allPassed = false;
  }

  console.log('\n----------------------------------------------------\n');

  // Test 2: Swagger UI HTML page
  try {
    const uiUrl = `${BASE_URL}/swagger/index.html`;
    console.log(`Testing Swagger UI HTML: ${uiUrl}`);
    const response = await axios.get(uiUrl, { timeout: 5000 });
    
    if (response.status === 200 && response.data.includes('<html') && response.data.includes('swagger')) {
      console.log('✅ SUCCESS: Swagger UI HTML page retrieved successfully.');
    } else {
      console.log(`❌ FAILED: Unexpected response or HTML content invalid.`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ FAILED: Cannot retrieve Swagger UI HTML. Error: ${error.message}`);
    if (error.response) {
      console.log(`   - Status code: ${error.response.status}`);
    }
    allPassed = false;
  }

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 SYSTEM INTEGRITY PASS: Swagger API UI is correctly exposed on Port 80!');
  } else {
    console.log('⚠️ SYSTEM INTEGRITY FAIL: Please verify Nginx proxy settings and container health.');
  }
  console.log('====================================================');
})();
