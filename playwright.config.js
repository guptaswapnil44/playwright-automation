const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
if (!process.env.NODE_ENV) {
  require('dotenv').config({ path: `${__dirname}/src/config/.env` });
} else {
  require('dotenv').config({
    path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}`,
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
module.exports = defineConfig({
  timeout: 45000,

  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://login.salesforce.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

});
