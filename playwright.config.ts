import { devices, PlaywrightTestConfig } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: '.env',
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src/tests',

  /* Maximum time one test can run for. */
  timeout: 350 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 120000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: 1,

  /* Opt out of parallel tests on CI. */
  workers: 4,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://app.whippy.co/login',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    navigationTimeout: 150 * 1000,
    screenshot: 'only-on-failure',
    video: 'off',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    headless: true,
    viewport: null,
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "smoke",
    //   testIgnore: / . ForgotPasswordTest.spec.ts /,
    // },
    {
      // name: "chromium",
      // testIgnore: / . ForgotPasswordTest.spec.ts /,
      // /* Project-specific settings. */
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-fullscreen', '--use-fake-device-for-media-stream'],
        },
        permissions: ['camera'],
      },
    },
    // {
    //   name: "iphone",
    //   use: {
    //     ...devices["iPhone 13 Pro Max"],
    //     permissions: ["camera"],
    //   },
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //     },
    //   },
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',+
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  //outputDir: "./test-results/",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'yarn start',
  //   port: 3000,
  // },
};
export default config;
