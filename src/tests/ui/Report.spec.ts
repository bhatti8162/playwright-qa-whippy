import { expect, test } from '@playwright/test';

import { InboxPageData, loginData, url } from './pagedata/commondata';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';
import { ReportsPO } from './pageobject/ReportsPO';

test.describe('Verify the functionality of the Reports', () => {
  test.beforeEach(async ({ page, context }) => {
    const Login = new LoginPO(page);
    const Inbox = new InboxPO(page, context);

    // Step 1: Navigated to the Whippy page and verify
    await page.goto('./');
    const actualHeaderText = await Login.getHeaderTextOfLoginPage();
    expect(actualHeaderText).toEqual(loginData.headerText);

    // Step 2: Login into the application and verify user is navigated to the Inbox page
    await Login.loginIntoTheApplication(loginData);
    await page.waitForURL(url.inboxURL);

    expect(page.url()).toEqual(url.inboxURL);
    const headerTextOfInboxPage = await Inbox.getHeaderText();
    expect(headerTextOfInboxPage).toEqual(InboxPageData.headerText);
  });

  test('Verify the functionality of the Reports', async ({ page }) => {
    const Report = new ReportsPO(page);

    // Step 1: Click on the reports button
    await Report.clickOnReportsButton();

    // Step 2: Get HeaderText
    const headerText = await Report.getHeaderText();
    expect(headerText).toEqual('Reports');

    // Verify all option
    expect(Report.totalCreditText).toBeVisible();
    expect(Report.totalMessageTextBox).toBeVisible();
    expect(Report.averageCreditMessage).toBeVisible();

    // Step 3: Click on the sms vs mms button
    await Report.clickOnSmsVsMmsButton();
    expect(Report.totalSmsCreditText).toBeVisible();
    expect(Report.averageSmSCredit).toBeVisible();
    expect(Report.totalMMSCredit).toBeVisible();
    expect(Report.totalMMSMessage).toBeVisible();

    // Step 4: Verify Bound vs inbound option
    await Report.clickOnOutBondVsInBoundButton();
    await page.waitForTimeout(3000);
  });
});
