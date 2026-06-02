const puppeteer = require('puppeteer');
const fs = require('fs');

async function exportPage(url, outputPath) {
  console.log(`Starting headless browser to capture: ${url}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set a standard viewport
  await page.setViewport({ width: 1536, height: 864 });

  console.log('Navigating to the page... Please wait for it to fully load.');
  // Go to the page and wait until there are no more than 2 network connections for at least 500 ms.
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Optional: wait a bit more for React to render anything else
  await page.waitForTimeout(3000);
  
  console.log('Page loaded. Extracting HTML and CSS...');
  
  // Extract full HTML and inline all CSS
  const fullHtml = await page.evaluate(async () => {
    // 1. Get all stylesheets linked via <link rel="stylesheet">
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    for (const link of links) {
      try {
        const response = await fetch(link.href);
        const cssText = await response.text();
        const style = document.createElement('style');
        style.textContent = cssText;
        link.replaceWith(style);
      } catch (err) {
        console.error('Failed to fetch stylesheet:', link.href);
      }
    }
    
    // 2. Remove scripts to prevent React from trying to re-hydrate on the static page
    const scripts = document.querySelectorAll('script');
    scripts.forEach(s => s.remove());
    
    // Return the complete outer HTML of the document
    return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
  });

  fs.writeFileSync(outputPath, fullHtml, 'utf8');
  console.log(`✅ Thành công! File HTML đã được lưu tại: ${outputPath}`);

  await browser.close();
}

// Chạy script
const targetUrl = 'http://141.253.114.218/study/1'; // Có thể thay bằng courseId mong muốn
const outputFile = 'GIAO_DIEN_TRANG_WEB.html';

exportPage(targetUrl, outputFile).catch(err => {
  console.error('Lỗi trong quá trình lấy HTML:', err);
});
