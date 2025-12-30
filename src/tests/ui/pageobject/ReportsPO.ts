import { Locator, Page } from '@playwright/test';

export class ReportsPO {
  page: Page;
  reportsButton: Locator;
  headerText: Locator;
  totalCreditText: Locator;
  totalMessageTextBox: Locator;
  averageCreditMessage: Locator;
  smsVsMMSButton: Locator;
  totalSmsCreditText: Locator;
  totalSMSMessage: Locator;
  averageSmSCredit: Locator;
  totalMMSCredit: Locator;
  totalMMSMessage: Locator;
  inBoundTab: Locator;
  totalOutboundCredit: Locator;
  totalInBoundCredit: Locator;
  totalInBoundVsOutBondButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.reportsButton = page.locator("//div[text()='Reports']");
    this.headerText = page.locator(
      "//*[@class='c-gqwkJN c-jNIRsY c-gqwkJN-ejCoEP-direction-row c-gqwkJN-irEjuD-align-stretch c-gqwkJN-awKDG-justify-start c-gqwkJN-kVNAnR-wrap-noWrap c-gqwkJN-ibliewU-css' and text()='Reports']"
    );
    this.totalCreditText = page.locator("//*[text()='Total Credits']");
    this.totalMessageTextBox = page.locator("//*[text()='Total Messages']");
    this.averageCreditMessage = page.locator("//*[text()='Avg. Credits per Message']");
    this.smsVsMMSButton = page.locator("//button[contains(text(),'SMS')]");
    this.totalSmsCreditText = page.locator("//*[text()='Total SMS Credits']");
    this.totalSMSMessage = page.locator("//*[text()='Total SMS Messages']");
    this.averageSmSCredit = page.locator("//*[text()='Avg. SMS Credits per Message']");
    this.totalMMSCredit = page.locator("//*[text()='Total MMS Credits']");
    this.totalMMSMessage = page.locator("//*[text()='Total MMS Messages']");
    this.inBoundTab = page.locator("//button[contains(text(),'Outbound')]");
    this.totalOutboundCredit = page.locator("//*[text()='Total Outbound Credits']");
    this.totalInBoundCredit = page.locator("//*[text()='Total Inbound Credits']");
    this.totalInBoundVsOutBondButton = page.locator(
      "//button[contains(text(),'Outbound')]"
    );
  }

  async clickOnReportsButton() {
    await this.reportsButton.click();
  }

  async getHeaderText() {
    return await this.headerText.innerText();
  }

  async clickOnSmsVsMmsButton() {
    await this.page.waitForTimeout(2000);
    await this.smsVsMMSButton.click();
  }

  async clickOnInBoundTab() {
    await this.inBoundTab.click();
  }

  async clickOnOutBondVsInBoundButton() {
    await this.totalInBoundVsOutBondButton.click();
  }
}
