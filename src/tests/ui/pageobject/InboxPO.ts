import { BrowserContext, expect, Locator, Page } from '@playwright/test';

import { currentTime } from '../../../utils/util';
declare const global: {
  [key: string]: unknown;
};
export class InboxPO {
  page: Page;
  context: BrowserContext;
  headerText: Locator;
  AddButton: Locator;
  phoneOrNameTextBox: Locator;
  nameTextBox: Locator;
  smsDescriptionTextBox: Locator;
  sendButton: Locator;
  reviewButton: Locator;
  emojiButton: Locator;
  addMessageVariable: Locator;
  scheduleButton: Locator;
  editScheduleButton: Locator;
  deleteScheduleMsgButton: Locator;
  getSenderMessage: Locator;
  senderNameTextBox: Locator;
  getName: Locator;
  closeConversationButton: Locator;
  templateButton: Locator;
  addTemplateButton: Locator;
  headerOfAddTemplatePopup: Locator;
  templateNameTextBox: Locator;
  templateMessageTextBox: Locator;
  templateMessageVariableBtn: Locator;
  templateMessageVariableOrganizationName: Locator;
  templateClickVariableOrganizationName: Locator;

  saveTemplateButton: Locator;
  searchTemplateTextBox: Locator;
  editButtonOfTemplate: Locator;
  updateTemplateButton: Locator;
  deleteTemplateButton: Locator;
  attachmentsButton: Locator;
  attachmentsText: Locator;
  searchConversationInputField: Locator;
  useShortcutMsgBox: Locator;
  useShortcutNoteMsgBox: Locator;
  useShortcutTemplate: Locator;
  useShortcutEmoji: Locator;
  useShortcutNotes: Locator;

  // Chat right toolbar
  rightToolBarIconButton: Locator;
  toolBarViewContactIcon: Locator;
  toolBarSearchIcon: Locator;
  toolBarAttachmentIcon: Locator;
  toolBarCampaignIcon: Locator;
  toolBarTranslateIcon: Locator;
  //toolBarSuggestionsIcon: Locator;
  toolBarHelpIcon: Locator;

  // Chat right toolbar - view contact
  viewContactHeader: Locator;

  // Chat right toolbar - search
  searchHeader: Locator;
  searchMessageInputField: Locator;

  // Chat right toolbar - attachment
  attachmentHeader: Locator;

  // Chat right toolbar - campaign
  campaignHeader: Locator;

  // Chat right toolbar - translate
  translateHeader: Locator;
  saveLanguageSettingsButton: Locator;

  // Chat right toolbar - suggestions
  suggestionsHeader: Locator;

  // Chat right toolbar - help
  helpHeader: Locator;
  attachmentsButtonOfLeftMenu: Locator;
  locationButtonOfLeftMenu: Locator;
  headerTextOfAttachments: Locator;
  downloadButton: Locator;
  shareButton: Locator;
  openConversationButton: Locator;
  subMenuOpenButton: Locator;
  subMenuAutomatedButton: Locator;
  subMenuCloseButton: Locator;
  checkUserIsAssignedIcon: Locator;
  userThreeDotMenu: Locator;
  attachmentsImage: Locator;
  closeImage: Locator;
  downloadButtonOfAttachmentsButton: Locator;
  printButtonOfAttachments: Locator;
  shareButtonOfAttachments: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.headerText = page.locator(
      "//div[@class='c-gqwkJN c-eQmMaf c-gqwkJN-ejCoEP-direction-row c-gqwkJN-jroWjL-align-center c-gqwkJN-awKDG-justify-start c-gqwkJN-kVNAnR-wrap-noWrap c-eQmMaf-jdSNLL-size-2' and text()='Inbox']"
    );
    this.AddButton = page.locator("a[href='/inbox/all/open/new']");
    this.phoneOrNameTextBox = page.locator("input[name='contactValue']");
    this.nameTextBox = page.locator("input[name='name']");
    this.smsDescriptionTextBox = page.getByPlaceholder('Use / for shortcuts');
    this.sendButton = page.locator("//button[text()='Send']");
    this.reviewButton = page.locator(
      "//button[@data-intercom-target='conversation-review-invite']"
    );
    this.emojiButton = page.locator("(//div[@data-state='closed']//button)[3]");
    this.addMessageVariable = page.locator("(//div[@data-state='closed']//button)[2]");
    this.scheduleButton = page.locator(
      `//button[text()='Send']/ancestor::div[1]/preceding-sibling::div[2]//button`
    );
    this.editScheduleButton = page.locator(`button[type='button']+div > button`).last();
    this.deleteScheduleMsgButton = page
      .locator(`//button[@type='button']/preceding-sibling::div/button`)
      .first();
    this.getSenderMessage = page.locator(
      "div[data-test-id='virtuoso-scroller'] > div  > div:nth-child(2) > div:first-child p"
    );
    this.senderNameTextBox = page.getByPlaceholder('Name', { exact: true });
    this.getName = page.locator(
      "//div[@data-test-id='virtuoso-item-list']/div[1]/div/a/div/div[2]/div[1]/div[1]"
    );
    this.closeConversationButton = page.locator(
      'button[data-intercom-target="close-conversation-button"]'
    );
    this.templateButton = page
      .locator('div')
      .filter({ hasText: /^Add Attachment16$/ })
      .getByRole('button')
      .first();
    this.addTemplateButton = page.locator("//button[text()='Add Template']");
    this.headerOfAddTemplatePopup = page.locator('//h2');
    this.templateNameTextBox = page.locator(
      "//input[@placeholder='Example: New Customer Question']"
    );
    this.templateMessageTextBox = page.getByRole('textbox', { name: 'Enter Message' });
    this.templateMessageVariableBtn = page
      .getByLabel('Create a Template')
      .locator('button')
      .filter({ hasText: 'Pipe Picker' });
    this.templateMessageVariableOrganizationName = page
      .getByText('Organization Name')
      .first();
    this.templateClickVariableOrganizationName = page
      .getByText('{{organization_name}}')
      .first();

    this.saveTemplateButton = page.locator("//button[text()='Save Template']");
    this.searchTemplateTextBox = page.locator(
      "//input[@id='downshift-110-input' or @placeholder='Search message templates...']"
    );
    this.editButtonOfTemplate = page.locator(
      '//mark/ancestor::div[4]/following-sibling::div//button'
    );
    this.updateTemplateButton = page.locator("//button[text()='Update Template']");
    this.deleteTemplateButton = page.locator("//button[text()='Delete Template']");
    this.attachmentsButton = page.locator("//input[@type='file']");
    // this.attachmentsText = page.locator(
    //   '.c-lesPJm > div > div > .c-lesPJm > div > .c-gqwkJN'
    // );
    this.attachmentsText = page.locator(
      `//div[@data-index='0']//div[contains(@class,'OUTBOUND')]//div[contains(@class,'direction')]/div[contains(@class,'iev')]`
    );
    this.searchConversationInputField = page.locator("input[placeholder='Search Inbox']");
    this.useShortcutMsgBox = page.getByPlaceholder('Use / for shortcuts');
    this.useShortcutNoteMsgBox = page.getByPlaceholder('Enter Note').first();
    this.useShortcutTemplate = page.getByText('Templates').first();
    this.useShortcutEmoji = page.getByText('Emojis').first();
    this.useShortcutNotes = page.getByText('Switch to Notes mode').first();
    // Chat right toolbar
    this.rightToolBarIconButton = page.locator('.c-cLJfHT > .c-dZtKUU > div > .c-idvnTe');
    this.toolBarViewContactIcon = this.rightToolBarIconButton.nth(0);
    this.toolBarSearchIcon = this.rightToolBarIconButton.nth(1);
    this.toolBarAttachmentIcon = this.rightToolBarIconButton.nth(2);
    this.toolBarCampaignIcon = this.rightToolBarIconButton.nth(3);
    this.toolBarTranslateIcon = this.rightToolBarIconButton.nth(4);
    // this.toolBarSuggestionsIcon = this.rightToolBarIconButton.nth(5);
    this.toolBarHelpIcon = this.rightToolBarIconButton.nth(5);

    // Chat right toolbar - view contact
    this.viewContactHeader = page.locator("text='contact'");

    // Chat right toolbar - search
    this.searchHeader = page.locator("div:text('search')");
    this.searchMessageInputField = page.locator("input[placeholder='Search Messages']");

    // Chat right toolbar - attachment
    this.attachmentHeader = page.locator("text='attachments'");

    // Chat right toolbar - campaign
    this.campaignHeader = page.locator("text='campaigns'");

    // Chat right toolbar - translate
    this.translateHeader = page.locator("text='language'");
    this.saveLanguageSettingsButton = page.locator(
      "button:text('Save Language Settings')"
    );

    // Chat right toolbar - suggestions
    this.suggestionsHeader = page.locator("text='suggestions'");

    // Chat right toolbar - help
    this.helpHeader = page.locator("text='help'");

    this.attachmentsButtonOfLeftMenu = page.locator(
      "//span[text()='Attachments' and @class='c-IDAMk c-IDAMk-cBLpOj-size-2 c-IDAMk-czEtpN-variant-contrast']"
    );
    this.locationButtonOfLeftMenu = page.locator("//div[text()='Locations']");
    this.headerTextOfAttachments = page.locator(
      "//span[@class='c-IDAMk c-IDAMk-cBLpOj-size-2 c-IDAMk-czEtpN-variant-contrast c-IDAMk-iecBjWS-css']"
    );
    this.downloadButton = page.locator(
      "//div[@class='c-gqwkJN c-lphQaD c-gqwkJN-ejCoEP-direction-row c-gqwkJN-jroWjL-align-center c-gqwkJN-knmidH-justify-between c-gqwkJN-kVNAnR-wrap-noWrap']/div[2]/a[1]"
    );
    this.shareButton = page.locator(
      "//div[@class='c-gqwkJN c-lphQaD c-gqwkJN-ejCoEP-direction-row c-gqwkJN-jroWjL-align-center c-gqwkJN-knmidH-justify-between c-gqwkJN-kVNAnR-wrap-noWrap']/div[2]/button"
    );
    this.openConversationButton = page.locator(
      "//div[@class='c-gqwkJN c-lphQaD c-gqwkJN-ejCoEP-direction-row c-gqwkJN-jroWjL-align-center c-gqwkJN-knmidH-justify-between c-gqwkJN-kVNAnR-wrap-noWrap']/div[2]/a[2]"
    );
    this.subMenuOpenButton = page.locator("//a[contains(text(),'Open')]");
    this.subMenuAutomatedButton = page.locator("//a[contains(text(),'Automated')]");
    this.subMenuCloseButton = page.locator("//a[contains(text(),'Closed')]");
    this.checkUserIsAssignedIcon = page.locator(
      "(//span[contains(@class,'c-jBHKZt c-jBHKZt-jQQlAZ-size-assign')])[1]"
    );
    this.userThreeDotMenu = page
      .locator(
        "button[data-state='closed']:right-of(button[data-intercom-target='close-conversation-button'])"
      )
      .nth(0);
    this.attachmentsImage = page.locator(
      "//div[@class='c-gqwkJN c-lphQaD c-gqwkJN-ejCoEP-direction-row c-gqwkJN-jroWjL-align-center c-gqwkJN-knmidH-justify-between c-gqwkJN-kVNAnR-wrap-noWrap']/div[1]"
    );
    this.closeImage = page.getByRole('button').nth(3);
    this.downloadButtonOfAttachmentsButton = page.locator(
      "//div[@class='c-dZtKUU c-PJLV c-PJLV-fwcBiw-gap-3 c-PJLV-joJbDg-align-center c-dZtKUU-ihGypPx-css']/a"
    );
    this.printButtonOfAttachments = page.locator(
      "//div[@class='c-dZtKUU c-PJLV c-PJLV-fwcBiw-gap-3 c-PJLV-joJbDg-align-center c-dZtKUU-ihGypPx-css']/div/button"
    );
    this.shareButtonOfAttachments = page.locator(
      "//div[@class='c-dZtKUU c-PJLV c-PJLV-fwcBiw-gap-3 c-PJLV-joJbDg-align-center c-dZtKUU-ihGypPx-css']/button[1]"
    );
  }

  async getHeaderText() {
    return this.headerText.innerText();
  }

  async clickOnAddButton() {
    await this.AddButton.click();
  }

  async addTheMessageData(inboxData: {
    senderPhoneNumber: string;
    senderName: string;
    smsDescription: string;
  }) {
    await this.phoneOrNameTextBox.type(inboxData.senderPhoneNumber, {
      delay: 200,
    });
    await this.nameTextBox.fill(inboxData.senderName);
    await this.smsDescriptionTextBox.type(inboxData.smsDescription);
  }

  async clickOnSendButton() {
    await this.sendButton.click();
  }

  async verifyMessage() {
    return await this.getSenderMessage.innerText();
  }

  async getNameOfOpenTab() {
    return await this.getName.innerText();
  }

  async clickOnCloseConversationButton() {
    await this.closeConversationButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnTemplateButton() {
    await this.templateButton.click();
  }

  async clickOnAddNewTemplateButton() {
    await this.addTemplateButton.click();
  }

  async getHeaderOfAddTemplatePopup() {
    return await this.headerOfAddTemplatePopup.innerText();
  }

  async addTemplateDetails(inboxPageData: {
    templateName: string;
    templateMessage: string;
  }) {
    await this.templateNameTextBox.type(inboxPageData.templateName, {
      delay: 100,
    });
    await this.templateMessageTextBox.click();
    await this.templateMessageTextBox.type(inboxPageData.templateMessage);
    await this.saveTemplateButton.click();
  }

  async addTemplateVariableDetails(inboxPageData: {
    templateName: string;
    templateMessage: string;
  }) {
    await this.templateNameTextBox.type(inboxPageData.templateName, {
      delay: 100,
    });
    await this.templateMessageTextBox.click();
    await this.templateMessageTextBox.type(inboxPageData.templateMessage);
    await this.templateMessageVariableBtn.click();
    await this.templateMessageVariableOrganizationName.click();
    await this.saveTemplateButton.click();
  }

  async searchTemplate(inboxData: { templateName: string }) {
    await this.searchTemplateTextBox.type(inboxData.templateName, {
      delay: 100,
    });
    return await this.page.locator('//mark').innerText();
  }

  async clickOnEditButtonOfTemplate() {
    await this.editButtonOfTemplate.click();
  }
  async clickOnVariableOfTemplate() {
    await this.templateClickVariableOrganizationName.click();
  }

  async updateTemplate(inboxPageData: { updateTemplate: string }) {
    await this.templateNameTextBox.clear();
    await this.templateNameTextBox.type(inboxPageData.updateTemplate, {
      delay: 100,
    });
    await this.templateMessageTextBox.click();
    await this.templateMessageTextBox.type('askahsdj');
    await this.updateTemplateButton.click();
  }

  async searchUpdatedTemplate(inboxData: { updateTemplate: string }) {
    await this.searchTemplateTextBox.clear();
    await this.searchTemplateTextBox.type(inboxData.updateTemplate, {
      delay: 100,
    });
    return await this.page.locator('//mark').innerText();
  }

  async clickOnDeleteTemplateButton() {
    await this.deleteTemplateButton.click();
  }

  async sendAttachments(filepath: string) {
    await this.attachmentsButton.setInputFiles(filepath);
    await this.page.waitForEvent('response');
    await this.page.waitForTimeout(2000);
  }

  async addTheMessageDataForAttachments(inboxData: {
    senderPhoneNumber: string;
    senderName: string;
  }) {
    await this.phoneOrNameTextBox.type(inboxData.senderPhoneNumber, {
      delay: 200,
    });
    await this.senderNameTextBox.fill(inboxData.senderName);
  }

  async getAttachmentsText() {
    await this.page.waitForLoadState();
    await this.page.waitForEvent('response');
    return await this.attachmentsText.innerText();
  }

  async subMenuLoadingAndValidate() {
    await this.subMenuOpenButton.click();
    await this.searchConversationInputField.type('Whippy');
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("//div[text()='Whippy Testing']")).toBeVisible();
    await this.searchConversationInputField.clear();
    await this.page.waitForTimeout(3000);

    await this.subMenuAutomatedButton.click();
    await expect(this.page.locator("(//div[text()='swat'])[1]")).toBeVisible();

    await this.subMenuCloseButton.click();
    await this.page.waitForTimeout(3000);

    await expect(this.page.getByText('test').first()).toBeVisible();
  }

  async subMenuLoadingAndValidateForAssignedMenu() {
    await this.subMenuOpenButton.click();
    await this.searchConversationInputField.type('Whippy');
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("//div[text()='Whippy Testing']")).toBeVisible();
    await this.searchConversationInputField.clear();
    await this.page.waitForTimeout(3000);
    await this.subMenuAutomatedButton.click();
    await this.page.waitForTimeout(3000);
    await expect(this.page.getByRole('heading', { name: 'Inbox Zero' })).toBeVisible();

    await this.subMenuCloseButton.click();
    await this.page.waitForTimeout(3000);
    await expect(
      this.page.locator(
        '//*[@data-test-id="virtuoso-item-list"]/div[1]//a/div/div[2]/div[1]/div[1]'
      )
    ).toBeVisible();
  }

  async checkUserIsAssigned() {
    await expect(this.checkUserIsAssignedIcon).toBeVisible();
    await this.checkUserIsAssignedIcon.click();
    await expect(this.page.locator("//div[text()='Sandeep Kumar']")).toBeVisible();
    await this.checkUserIsAssignedIcon.click();
  }

  async checkThreeDotMenuAndValidateAllOptions() {
    await this.markMsgAsUnread();
    await this.transferLocation();
    await this.exportPDF();
    await this.exportCSV();
  }

  async ThreeDotMenu() {
    this.userThreeDotMenu.click({ force: true });
    await this.page.waitForLoadState();
  }

  async markMsgAsUnread() {
    await this.ThreeDotMenu();
    await expect(this.page.locator("//div[text()='Mark as Unread']")).toBeVisible();
    await this.page.locator("//div[text()='Mark as Unread']").click();
  }

  async transferLocation() {
    await this.page.waitForTimeout(3000);
    await this.page.reload();
    await this.page.waitForTimeout(3000);
    await this.ThreeDotMenu();

    await expect(this.page.locator("//div[text()='Transfer Location']")).toBeVisible();
    await this.page.locator("//div[text()='Transfer Location']").click();
    await this.page.locator("//button[text()='Transfer']").click();
  }

  async exportPDF() {
    await this.ThreeDotMenu();
    await expect(this.page.locator("//div[text()='Export as PDF']")).toBeVisible();
    await this.page.locator("//div[text()='Export as PDF']").click();
    await this.page.waitForEvent('download');
  }

  async exportCSV() {
    await this.page.waitForTimeout(2000);
    await this.ThreeDotMenu();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator("//div[text()='Export as CSV']")).toBeVisible();
    await this.page.locator("//div[text()='Export as CSV']").click();
    await this.page.waitForEvent('download');
  }

  async validateIndividualMsgOptions(inboxData: {
    senderPhoneNumber: string;
    senderName: string;
  }) {
    // copying message
    // await this.page.getByText('sandeep.kumar@superwit.org').last().hover();
    await this.page.getByText('Automated by Whippy').last().hover();
    await this.page.getByRole('dialog').getByRole('button').first().click();
    await expect(this.page.getByText('Message copied to clipboard')).toBeVisible();

    // hide message
    await this.page.getByText('Automated by Whippy').last().hover();
    await this.page.getByRole('dialog').getByRole('button').nth(2).click();
    await this.page.getByRole('dialog').getByRole('button').nth(2).click();

    // transfer message
    await this.page.getByText('Automated by Whippy').last().hover();
    await this.page.getByRole('dialog').getByRole('button').nth(1).click();
    await this.phoneOrNameTextBox.type(inboxData.senderPhoneNumber, {
      delay: 200,
    });
    await this.nameTextBox.fill(inboxData.senderName);
    await this.page.getByPlaceholder('Use / for shortcuts').click();
    await this.page.keyboard.type('1234');
    await this.clickOnSendButton();

    // delete message
    await this.page.getByText('sandeep.kumar@superwit.org').last().hover();
    await this.page.getByRole('dialog').getByRole('button').nth(3).click();
    await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    await expect(
      this.page
        .getByRole('paragraph')
        .filter({ hasText: 'This message has been deleted...' })
    ).toBeVisible();
  }

  async searchInvalidConversationAndVerify(contactName: string) {
    await this.searchConversationInputField.type(contactName);
    await expect(this.page.locator(`//h1[text()='Inbox Zero']`).nth(0)).toBeVisible();
    await this.page.keyboard.press('Control+KeyA+Backspace');
  }

  async searchConversationAndVerify(contactName: string) {
    await this.searchConversationInputField.type(contactName);
    await expect(this.page.locator(`div:text('${contactName}')`).nth(0)).toBeVisible();
    await this.searchConversationInputField.clear();
  }

  async clickOnTheConversation(contactName: string) {
    await this.searchConversationInputField.type(`${contactName}`);
    await this.page.locator(`div:text('${contactName}')`).nth(0).click();
    await this.searchConversationInputField.clear();
    await expect(this.sendButton).toBeVisible();
  }

  async openUseShortcut() {
    await this.useShortcutMsgBox.clear();
    await this.useShortcutMsgBox.type('/');
    await this.useShortcutTemplate.isVisible();
    await this.useShortcutEmoji.isVisible();
    await this.useShortcutNotes.isVisible();
    await this.page.waitForTimeout(1000);
  }

  async useShortcutEmojiAndValidate() {
    await this.useShortcutEmoji.click();
    await this.page.waitForEvent('response');
    await this.page.waitForTimeout(1000);
    await this.page.locator("(//img[@loading='eager'])[1]").click();
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Control+KeyA+Backspace');
  }

  async useShortcutChangeToNotes() {
    await this.useShortcutNotes.click();
    await expect(this.useShortcutNoteMsgBox).toBeVisible();
  }
  async useShortcutFilter() {
    await this.useShortcutNoteMsgBox.type('@san');
    await expect(this.page.getByText('Sandeep Kumar')).toBeVisible();
  }

  async useShortcutOpenTemplate() {
    await this.openUseShortcut();
    await this.useShortcutTemplate.click();
  }

  async clickOnReviewInvitationAndValidate() {
    await this.reviewButton.click();
    await expect(this.page.getByText('Hey, Whippy Testing').first()).toBeVisible();
    await this.page.getByText('Hey, Whippy Testing').first().click({ force: true });
    await this.page.waitForLoadState();
    await this.page.keyboard.press('Control+KeyA');
    await this.page.keyboard.press('Backspace');
    await this.page.waitForLoadState();
  }

  async clickOnEmojiAndValidate() {
    await this.emojiButton.click();
    await this.page.waitForEvent('response');
    await this.page.waitForTimeout(3000);
    await this.page.locator("(//img[@loading='eager'])[1]").click();
    await this.page.waitForTimeout(3000);
    await this.page.getByPlaceholder('Use / for shortcuts').click();
    await this.page.keyboard.press('Control+KeyA+Backspace');
    await this.page.waitForTimeout(3000);
  }

  async ValidateSignature() {
    await this.page
      .locator(
        '//button[text()="Send"]/ancestor::div[1]/preceding-sibling::div[1]//button'
      )
      .click();
    await this.page.locator("//input[@placeholder='Search signatures...']").fill('123');
    await this.page.locator("//button[text()='Add Signature']").click();
    await this.page.locator("//input[@placeholder='Signature name']").fill('123');
    await this.page.locator("//div[@zindex='-1']//p[1]").click();
    await this.page.keyboard.type('askdhaklsjdhjkas');
    await this.page.locator("//button[text()='Save Signature']").click();
    await this.page.waitForSelector("//div[text()='Signature created']");
    await this.page.locator("//input[@placeholder='Search signatures...']").fill('123');
    await this.page.waitForSelector("//mark[text()='123']");
    await this.page
      .locator("//button[@class='c-idvnTe c-idvnTe-cRIXTU-size-2']")
      .last()
      .click();
    await this.page.locator("//button[text()='Delete Signature']").click();
  }

  async clickOnAddMessageAndValidate() {
    /**
    1. Click on the add message variable button.
    2. Click on the 'Organization Name' option from the dropdown.
    3. Validate that the selected option is visible.
     */
    await this.addMessageVariable.click();
    await this.page.locator("//div[text()='Organization Name']").click();
    // await expect(
    //   await this.page.locator("//span[text()='Organization Name']")
    // ).toBeVisible();
  }

  async elementsLoadingProperly() {
    await this.clickOnScheduledTab();
    await expect(
      this.page.locator("//input[@placeholder='Superwit LA [QA 1][1] & 1 more']")
    ).toBeVisible();
    await expect(
      this.page.locator(
        "(//input[contains(@class,'DateInput_input DateInput_input_1')])[1]"
      )
    ).toBeVisible();
  }
  async updateScheduleMsg() {
    /**
     * this is base function update schedule message
     */
    await this.editScheduleButton.click();
    await this.page.waitForEvent('response');
    global.schedMsg = 'schedule' + currentTime;
    await this.page
      .getByRole('dialog', { name: 'Edit Scheduled Message' })
      .getByRole('paragraph')
      .click();
    await this.page.keyboard.press('Control+KeyA+Backspace');
    await this.page.keyboard.type(`${global.schedMsg}`);
    await this.page.locator("//button[text()='Update Message']").click();
    await this.page.waitForEvent('response');
  }
  async createScheduleMsg() {
    /**
     * this is base function creating schedule message
     */
    await this.clickOnTheConversation('Whippy Testing');
    await this.scheduleButton.isVisible();
    await this.scheduleButton.click();
    await this.page.waitForLoadState();
    global.schedMsg = 'schedule' + currentTime;
    await this.page
      .getByRole('dialog', { name: 'Create Scheduled Message' })
      .getByPlaceholder('Enter Message')
      .fill(`${global.schedMsg}`);
    await this.page.waitForLoadState();
    await this.page.locator("//button[text()='Schedule Message']").click({ force: true });
    await this.page.waitForLoadState();
    await this.page.waitForEvent('response');
    await expect(
      this.page.locator(`//div[contains(text(),"${global.schedMsg}")]`).last()
    ).toBeVisible();
  }

  async deleteScheduleMsg() {
    /**
     * this is base function delete schedule message
     */
    await this.clickOnScheduledTab();
    await this.deleteScheduleMsgButton.click({ force: true });
    await this.page.locator("//button[text()='Yes, Delete Message']").click();
    await expect(
      this.page.locator("//div[text()='Scheduled message deleted']")
    ).toBeVisible();
  }

  async clickOnScheduleBtnAndValidate() {
    /**
     * this is base function validate schedule message
     */
    await this.clickOnScheduledTab();
    await this.elementsLoadingProperly();
    await expect(
      await this.page.locator(`//div[contains(text(),"${global.schedMsg}")]`).last()
    ).toBeVisible();
    await this.page
      .locator("(//button[contains(@class,'c-idvnTe c-idvnTe-cRIXTU-size-2')])[2]")
      .click();
    await this.page.waitForLoadState();
    await this.page.locator("//button[text()='Yes, Send Now']").click();
    await this.page.waitForEvent('response');
    await this.clickOnAllConversation();
    await this.clickOnTheConversation('Whippy Testing');
    await expect(
      await this.page.locator(`//div[contains(text(),"${global.schedMsg}")]`).last()
    ).toBeVisible();
  }

  async clickOnAllConversation() {
    await this.page.locator("//span[text()='All Conversations']").click();
    await this.page.waitForLoadState();
  }

  async clickOnScheduledTab() {
    await this.page.locator("//span[text()='Scheduled']").click();
    await this.page.waitForLoadState();
  }

  /**
   * Chat toolbar
   */
  async verifyChatRightToolbar() {
    await expect(this.toolBarViewContactIcon).toBeVisible();
    await expect(this.toolBarSearchIcon).toBeVisible();
    await expect(this.toolBarAttachmentIcon).toBeVisible();
    await expect(this.toolBarCampaignIcon).toBeVisible();
    await expect(this.toolBarTranslateIcon).toBeVisible();
    // await expect(this.toolBarSuggestionsIcon).toBeVisible();
    await expect(this.toolBarHelpIcon).toBeVisible();
  }

  async verifyChatRightToolbarViewContact() {
    await this.toolBarViewContactIcon.click();
    await expect(this.viewContactHeader).toBeVisible();
  }

  async verifyChatRightToolbarSearchAndVerify(message: string) {
    await this.toolBarSearchIcon.click();
    await expect(this.searchMessageInputField).toBeVisible();
    await this.searchMessageInputField.type(message);
    await expect(this.page.locator(`mark:text('${message}')`).nth(0)).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async verifyChatRightToolbarAttachment() {
    await this.toolBarAttachmentIcon.click();
    await expect(this.attachmentHeader).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async verifyChatRightToolbarCampaign() {
    await this.toolBarCampaignIcon.click();
    await expect(this.campaignHeader).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async verifyChatRightToolbarTranslate() {
    await this.toolBarTranslateIcon.click();
    await expect(this.translateHeader).toBeVisible();
    await expect(this.page.locator("input[placeholder='English']").nth(0)).toBeVisible();
    await expect(this.page.locator("input[placeholder='Spanish']")).toBeVisible();
    await expect(this.saveLanguageSettingsButton).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async verifyChatRightToolbarSuggestions() {
    // await this.toolBarSuggestionsIcon.click();
    // await expect(this.suggestionsHeader).toBeVisible();
    // await this.page.keyboard.press("Escape");
  }

  async verifyChatRightToolbarHelp() {
    await this.toolBarHelpIcon.click();
    await expect(this.helpHeader).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  async clickOnLocationButtonAndValidate() {
    await this.locationButtonOfLeftMenu.click();
    await this.locationButtonOfLeftMenu.click();
    await expect(
      this.page.locator("//span[text()='Superwit LA [QA 1][1]']")
    ).toBeVisible();
    await expect(
      this.page.locator("//span[text()='Superwit LA [QA 1][2]']")
    ).toBeVisible();
  }

  async clickOnAttachmentsButton() {
    await this.attachmentsButtonOfLeftMenu.click();
    await this.page.waitForEvent('response');
    // await this.page.getByPlaceholder('Locations').click();
    // await this.page
    //   .getByRole('option', { name: 'Select All' })
    //   .locator('div')
    //   .nth(1)
    //   .click();
    // await this.page.waitForEvent('response');
  }

  async checkDownloadBtnWorking() {
    await this.downloadButton.click();
    await this.page.waitForEvent('download');
    await this.closeImage.click();
  }

  async openConversationButtonWorking() {
    const pagePromise = this.context.waitForEvent('page');
    await this.openConversationButton.click();
    const newPage = await pagePromise;
    await expect(newPage.locator("//div[text()='swat']")).toBeVisible();
    await newPage.close();
  }

  async shareButtonWorking() {
    await this.shareButton.click();
    await this.page.getByRole('button').nth(3).click();
    await this.page.waitForLoadState();
  }

  async getHeaderTextOfAttachmentsSection() {
    await this.page.waitForLoadState();
    await this.page.waitForEvent('response');
    await this.headerTextOfAttachments.innerText();
  }

  async clickOnAttachmentsImage() {
    await this.attachmentsImage.click();
    await this.closeImage.click();
    await this.page.waitForLoadState();
  }
}
