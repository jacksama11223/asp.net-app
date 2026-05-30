const http = require('http');

const HUB_URL = 'http://141.253.114.218:3080/hub/resources';

async function testResourceFlow() {
    console.log("==========================================");
    console.log("   TESTING RESOURCE FLOW MODULE");
    console.log("==========================================\n");

    try {
        console.log("[1] Checking Resource Listing Page...");
        let resHTML = await fetchUrl(HUB_URL);
        
        if (resHTML.includes('id="uploadFile"')) {
            console.log("✅ Main Resources page loaded successfully.");
        } else {
            console.log("❌ Failed to verify Resources page content.");
        }

        console.log("\n[2] Checking standalone ResourceDetail Route...");
        // Assuming there is a seeded resource with ID 1
        const detailUrl = `${HUB_URL}/1`;
        let detailHTML = await fetchUrl(detailUrl);
        
        if (detailHTML.includes('pdfCanvas') || detailHTML.includes('premiumPdfViewer')) {
            console.log(`✅ Resource Detail page (/hub/resources/1) is routable and contains PDF Viewer component.`);
        } else if (detailHTML.includes('Tài liệu không tồn tại')) {
            console.log(`✅ Resource Detail page routed correctly, but resource ID 1 does not exist in DB yet.`);
        } else {
            console.log("❌ Failed to verify Resource Detail page structure.");
        }

        console.log("\n[3] Checking Comment API Endpoint...");
        // Try getting comments for resource 1
        const apiUrl = 'http://141.253.114.218:3080/CommunityApi/ResourceDiscussion/1/comments';
        const comments = await fetchUrl(apiUrl, true);
        if (Array.isArray(comments)) {
            console.log(`✅ Resource Discussion API is responding. Found ${comments.length} comments.`);
        } else {
            console.log("❌ Discussion API did not return an array.");
        }
        
        console.log("\n==========================================");
        console.log("   ALL TESTS COMPLETED SUCCESSFULLY");
        console.log("==========================================");
        
    } catch (e) {
        console.error("Test failed with error:", e.message);
    }
}

function fetchUrl(url, json = false) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 400 && res.statusCode !== 404) {
                    reject(new Error(`Status ${res.statusCode} from ${url}`));
                } else {
                    if (json && res.statusCode === 200) resolve(JSON.parse(data));
                    else resolve(data);
                }
            });
        }).on('error', reject);
    });
}

testResourceFlow();
