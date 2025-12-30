import { Locator, Page } from '@playwright/test';

export class LoginPO {
  page: Page;
  signInButton: Locator;
  headerText: Locator;
  emailTextBox: Locator;
  passwordTextBox: Locator;
  loginToWhippyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('button');
    this.headerText = page.locator("//span[text()='Sign in to your account']");
    this.emailTextBox = page.locator('#email');
    this.passwordTextBox = page.locator('#password');
    this.loginToWhippyButton = page.locator("button[type='submit']");
  }

  async getHeaderTextOfLoginPage() {
    await this.headerText.waitFor();
    return await this.headerText.innerText();
  }

  async loginIntoTheApplication(data: { email: string; password: string }) {
    await this.emailTextBox.fill(data.email);
    await this.passwordTextBox.fill(data.password);
    await this.loginToWhippyButton.click();
  }
}
