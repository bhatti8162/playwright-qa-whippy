import { expect, test } from '@playwright/test';

import { InboxPageData, inValidLoginData, loginData, url } from './pagedata/commondata';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';

test.describe('Verify login functionality', () => {
  test('Verify that user successfully login into the application', async ({
    page,
    context,
  }) => {
    const Login = new LoginPO(page);
    const Inbox = new InboxPO(page, context);

    // Step 1: Navigated to the Whippy page and verify
    await page.goto('./');
    await page.setViewportSize({ width: 1920, height: 1080 });
    const actualHeaderText = await Login.getHeaderTextOfLoginPage();
    expect(actualHeaderText).toEqual(loginData.headerText);

    // Step 2: Login into the application and verify user is navigated to the Inbox page
    await Login.loginIntoTheApplication(loginData);
    await page.waitForURL(url.inboxURL);

    expect(page.url()).toEqual(url.inboxURL);
    const headerTextOfInboxPage = await Inbox.getHeaderText();
    expect(headerTextOfInboxPage).toEqual(InboxPageData.headerText);
  });

  test('Verify that user is on same page when user enter invalid credentials', async ({
    page,
  }) => {
    const Login = new LoginPO(page);

    // Step 1: Navigated to the Whippy page and verify
    await page.goto('./');
    await page.setViewportSize({ width: 1920, height: 1080 });
    const actualHeaderText = await Login.getHeaderTextOfLoginPage();
    expect(actualHeaderText).toEqual(loginData.headerText);

    // Step 2: Enter Invalid login credentials and verify user is in same page
    await Login.loginIntoTheApplication(inValidLoginData);
    expect(page.url()).toEqual(url.loginURL);
  });
});
