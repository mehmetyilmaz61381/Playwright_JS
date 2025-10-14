const { test: base } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

const test = base.extend({
  async afterEach({ page }, testInfo) {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.attachments.push({
        name: 'screenshot',
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  },
});

module.exports = { test };