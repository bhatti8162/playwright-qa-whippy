import { expect, FrameLocator, Locator, Page } from '@playwright/test';

import { url } from '../pagedata/commondata';

export default class ContactPage {
  page: Page;
  contactTab: Locator;
  contactsHeader: Locator;
  allContactsHeader: Locator;

  // Create contact
  createContactButton: Locator;
  createContactAsHeader: Locator;
  contactFullName: Locator;
  contactPhoneNumber: Locator;
  contactEmail: Locator;
  optInCheckBox: Locator;
  saveContactButton: Locator;
  cancelContactButton: Locator;

  // Search contacts
  searchContactInputField: Locator;

  // Conversation
  conversationIcon: Locator;
  enterMessageInputField: Locator;
  sendButton: Locator;

  // Upload contact
  uploadContactButton: Locator;
  uploadNameInputField: Locator;
  uploadOptIntoInputField: Locator;
  clickOnUploadFileButton: Locator;
  uploadFrame: FrameLocator;
  uploadDataFromFileButton: Locator;
  yesButton: Locator;
  goBackButton: Locator;
  nextButton: Locator;
  finishButton: Locator;
  deleteUploadButton: Locator;
  uploadDeleteSuccessMsg: Locator;
  contactsImportedSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTab = page.locator("//a[@href='/contacts']");
    this.contactsHeader = page.locator("div:text('Contacts')");
    this.allContactsHeader = page.locator("div:text('All Contacts')");

    // Create contact
    this.createContactButton = page.locator("button:text('Create Contact')");
    this.createContactAsHeader = page.getByRole('heading', { name: 'Create Contact' });
    this.contactFullName = page.locator("input[name='name']");
    this.contactPhoneNumber = page.locator("input[name='phone']");
    this.contactEmail = page.locator("input[name='email']");
    this.optInCheckBox = page.getByRole('checkbox');
    this.saveContactButton = page.locator("button:text('Save')");
    this.cancelContactButton = page.locator("button:text('Cancel')");

    // Search contact
    this.searchContactInputField = page.locator("input[placeholder='Search Contacts']");

    // Conversation
    this.conversationIcon = page
      .locator('[data-test-id="virtuoso-item-list"]')
      .getByRole('button');
    this.enterMessageInputField = page.getByPlaceholder('Use / for shortcuts');
    this.sendButton = page.getByRole('button', { name: 'Send' });

    // Upload contact
    this.uploadContactButton = page.locator("button:text('Upload Contacts')");
    this.uploadNameInputField = page.locator("input[name='name']");
    this.uploadOptIntoInputField = page.locator("input[name='optIn']");
    this.clickOnUploadFileButton = page.getByRole('button', {
      name: 'Click to Upload a File',
    });
    this.uploadFrame = page.frameLocator("iframe[title='Dromo Importer: Contacts']");
    this.uploadDataFromFileButton = this.uploadFrame.locator(
      "text='Upload data from file'"
    );
    this.yesButton = this.uploadFrame.getByRole('button', { name: 'Yes' });
    this.goBackButton = this.uploadFrame.getByRole('button', { name: 'Go Back' });
    this.nextButton = this.uploadFrame.getByRole('button', { name: 'Next' });
    this.finishButton = this.uploadFrame.getByRole('button', { name: 'Finish' });
    this.deleteUploadButton = page.locator("button:text('Delete Upload')");
    this.uploadDeleteSuccessMsg = page.locator("text='Upload deleted'");
    this.contactsImportedSuccessMsg = page.locator("text='Contacts imported'");
  }

  async clickOnContactTab() {
    await this.contactTab.click();
    await this.page.waitForURL(url.contactsURL);
  }

  async verifyUserNavigatedToContactsPage() {
    await expect(this.contactsHeader.nth(1)).toBeVisible();
    await expect(this.allContactsHeader).toBeVisible();
  }

  /**
   * Create Contact
   */
  async clickOnCreateContactButton() {
    await this.createContactButton.click();
  }

  async createContact(
    contactFullName: string,
    contactPhoneNumber: string,
    contactEmail: string
  ) {
    await this.clickOnCreateContactButton();
    await expect(this.createContactAsHeader).toBeVisible();
    await this.contactFullName.fill(contactFullName);
    await this.contactPhoneNumber.fill(contactPhoneNumber);
    await this.contactEmail.fill(contactEmail);
    await this.saveContactButton.click();
  }

  async verifyContactCreatedSuccessfully(contactFullName: string) {
    await expect(
      this.page.locator(`div:text('${contactFullName}')`).nth(0)
    ).toBeVisible();
  }

  async clickOnTheContact(contactFullName: string) {
    await this.page.locator(`div:text('${contactFullName}')`).nth(0).click();
    await this.page.waitForSelector(`button:text('${contactFullName}')`);
  }

  async verifyContactPreview(
    contactFullName: string,
    contactPhoneNumber: string,
    contactEmail: string
  ) {
    await expect(
      this.page.locator(`button:text('${contactFullName}')`).nth(0)
    ).toBeVisible();
    await expect(
      this.page.locator(`button:text('${contactPhoneNumber}')`).nth(0)
    ).toBeVisible();
    await expect(
      this.page.locator(`button:text('${contactEmail}')`).nth(0)
    ).toBeVisible();
  }

  /**
   * Search contact
   */
  async searchContact(contactFullName: string) {
    await this.searchContactInputField.fill(contactFullName);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Conversation
   */
  async clickOnConversationIcon() {
    await this.conversationIcon.nth(0).click();
  }

  async sendMessageToContact(message: string) {
    await this.page.waitForTimeout(5000);
    await this.enterMessageInputField.click();
    await this.page.keyboard.type(message, { delay: 50 });
    await this.sendButton.click();
  }

  async verifyMessageSentSuccessfully(message: string) {
    await expect(this.page.locator(`text='${message}'`).nth(0)).toBeVisible();
  }

  /**
   * Upload contacts
   */
  async clickOnUploadContactsButton() {
    await this.uploadContactButton.click();
  }

  async uploadContacts(uploadName: string) {
    await this.uploadNameInputField.type(uploadName);
    await this.clickOnUploadFileButton.click({ delay: 2500 });
    await this.page.waitForSelector("iframe[title='Dromo Importer: Contacts']");
    await expect(this.uploadFrame.locator("text='Add Contacts'")).toBeVisible();
    await this.uploadContactFile();
    await this.yesButton.click();
    await this.nextButton.click();
    await this.finishButton.click();
    await this.yesButton.click();
    await this.page.waitForSelector("text='Contacts imported'");
    await expect(this.contactsImportedSuccessMsg).toBeVisible();
  }

  async uploadContactFile() {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadDataFromFileButton.click(),
    ]);
    await fileChooser.setFiles('src/assets/contacts.xlsx');
  }

  async verifyFileUploadedSuccessfully(uploadName: string) {
    await expect(this.page.locator(`text='Uploads'`).nth(0)).toBeVisible();
    await expect(this.page.locator(`text='All Uploads'`).nth(0)).toBeVisible();
    await expect(this.page.locator(`text='${uploadName}'`).nth(0)).toBeVisible();
  }

  async verifyContactUploadedSuccessfully(uploadName: string, contactNames: string[]) {
    await this.page.locator(`text='${uploadName}'`).nth(0).click();
    const contactNamesLength = contactNames.length;
    for (let i = 0; i < contactNamesLength; i++) {
      await expect(this.page.locator(`text='${contactNames[i]}'`).nth(0)).toBeVisible();
    }
  }

  async deleteUpload() {
    await this.page.locator('button > .c-idvnTe').nth(0).click();
    await this.deleteUploadButton.click();
    await expect(this.uploadDeleteSuccessMsg).toBeVisible();
  }
}
