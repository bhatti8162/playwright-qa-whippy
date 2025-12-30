import { expect, test } from '@playwright/test';

import { InboxPageData, loginData, url } from './pagedata/commondata';
import AutomationPo from './pageobject/AutomationPo';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';

test.describe('Automation end to end', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page, context }) => {
    const Login = new LoginPO(page);
    const Inbox = new InboxPO(page, context);

    // Step 1: Navigated to the Whippy page and verify
    await page.goto('/');
    const actualHeaderText = await Login.getHeaderTextOfLoginPage();
    expect(actualHeaderText).toEqual(loginData.headerText);

    // Step 2: Login into the application and verify user is navigated to the Inbox page
    await Login.loginIntoTheApplication(loginData);
    await page.waitForURL(url.inboxURL);

    expect(page.url()).toEqual(url.inboxURL);
    const headerTextOfInboxPage = await Inbox.getHeaderText();
    expect(headerTextOfInboxPage).toEqual(InboxPageData.headerText);
  });

  test('Automation E2E', async ({ page }) => {
    const Automation = new AutomationPo(page);
    //Step 1: Create read update delete keyword
    await Automation.CrudForKeyword();

    //Step 2: Create update and validate question bot
    await Automation.ValidateQuestionBot();
  });
});
