const { chromium } = require('playwright');
(async () => {
    // Launch browser with fresh context and disabled cache
    const browser = await chromium.launch();
    const context = await browser.newContext({
        // Clear all caches and storage
        bypassCSP: true,
        ignoreHTTPSErrors: true,
        // Disable cache
        extraHTTPHeaders: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    });

    const page = await context.newPage();

    // Clear any existing storage and cache
    await page.context().clearCookies();
    await page.context().clearPermissions();

    // Navigate to the page with cache bypass
    await page.goto('http://localhost:3000', {
        waitUntil: 'networkidle',
        // Add timeout for slow loading
        timeout: 30000
    });

    // Wait additional 2 seconds for dynamic content to load
    await page.waitForTimeout(2000);

    // Wait for any potential loading spinners or animations
    try {
        await page.waitForFunction(() => {
            // Wait for document to be fully ready
            return document.readyState === 'complete';
        }, { timeout: 10000 });
    } catch (e) {
        console.log('Page ready state check timed out, proceeding anyway');
    }

    // Take screenshot
    await page.screenshot({
        path: 'screenshot.png',
        fullPage: true
    });

    await browser.close();
    console.log('Screenshot taken successfully');
})()