import { expect, Locator, Page } from '@playwright/test';

export default class CampaignsPO {
  page: Page;
  campaignsLink: Locator;
  campaignsHeader: Locator;
  createCampaignButton: Locator;
  campaignsNameTextBox: Locator;
  campaignsPhoneNumberTextBox: Locator;
  selectPhoneNumber: Locator;
  saveButton: Locator;
  selectAudienceTextBox: Locator;
  selectAudience: Locator;
  selectExcludeTextBox: Locator;
  selectExclude: Locator;
  campaignsMessage: Locator;
  addTriggerButton: Locator;
  linkTriggerButton: Locator;
  keywordTrigger:Locator
  responseTrigger:Locator
  actionTypeButton: Locator;
  saveTriggerButton: Locator;
  sendCampaignsButton: Locator;
  inputCampaigns: Locator;
  sendCampaignsButton1: Locator;
  saveAsDraftButton: Locator;
  saveAutomationButton: Locator;
  draftsButtonFromLeftMenu: Locator;
  firstCampaigns: Locator;
  allCampaignsButtonFromLeftMenu: Locator;
  editDraftButtonOfLatestDraft: Locator;
  basicInfoButton: Locator;
  moreMenuButton: Locator;
  deleteDraftButton: Locator;
  deleteCampaignsButton: Locator;
  scheduleMessage: Locator;
  templateButton: Locator;
  selectFirstTemplate: Locator;
  scheduleCampaignsButton: Locator;
  uploadContactButton: Locator;
  searchCampaignsButton: Locator;
  locationDropDown: Locator;
  selectLocation: Locator;
  selectAllButton: Locator;
  userDropDown: Locator;
  selectUser: Locator;
  viewAudienceButton: Locator;
  viewExcludeAudienceButton: Locator;
  viewContactSuggestionButton: Locator;
  viewMessagePreviewButton: Locator;
  viewHelpButton: Locator;
  closeButton: Locator;
  scheduledButton: Locator;
  archivedButton: Locator;
  smsOverView: Locator;
  Delivered100: Locator;
  NotDelivered: Locator;
  unResponded: Locator;
  responded: Locator;
  downloadButton: Locator;
  completeButton: Locator;
  duplicateCampaignsButton: Locator;
  shareCampaignsButton: Locator;
  templateButtonOfMenu: Locator;
  createTemplateButton: Locator;
  saveTemplateButton: Locator;
  basicInfoButtonOfTemplate: Locator;
  editTemplateButton: Locator;
  deleteButton: Locator;
  unSubscribedButton: Locator;
  closeButtonOfUnSubscribed: Locator;
  openConversationButtonOfArchived: Locator;
  sendMessageButton: Locator;
  audienceTextBoxOfCampaigns: Locator;
  sendButton: Locator;
  automationsContainer: Locator;
  createAutomationLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campaignsLink = page.locator(
      "//a[@href='/campaigns' and div[text()='Campaigns']]"
    );
    this.campaignsHeader = page.locator(
      "//*[@class='c-dZtKUU c-PJLV c-PJLV-geCXAV-gap-2 c-PJLV-joJbDg-align-center']/div[2]/div"
    );
    this.createCampaignButton = page.locator("//button[text()='Create Campaign']");
    this.campaignsNameTextBox = page.locator("input[placeholder='Name Campaign']");
    this.campaignsPhoneNumberTextBox = page.locator(
      "input[placeholder='Select a Phone Number']"
    );
    this.selectPhoneNumber = page.locator(
      "//div[text()='Superwit LA [QA 1][1] - (213) 338-1105']"
    );
    this.saveButton = page.locator("//button[text()='Save']");
    this.selectAudienceTextBox = page.locator(
      "//label[text()='Select Audience']/following-sibling::div//input"
    );
    this.selectAudience = page.locator(
      "//div[text()='Add New Contact']/ancestor::div[2]/following-sibling::div[1]"
    );
    this.selectExcludeTextBox = page.locator(
      "//label[text()='Exclude']/following-sibling::div//input"
    );
    this.selectExclude = page.locator(
      "//div[text()='Add New Contact']/ancestor::div[2]/following-sibling::div[1]"
    );
    this.campaignsMessage = page.locator("//div[@role='textbox']");
    this.addTriggerButton = page.locator("//button[text()='Add Trigger']");
    this.linkTriggerButton = page.locator("//div[text()='Link Click Trigger']");
    this.keywordTrigger = page.locator("//div[text()='Keyword Trigger']")
    this.responseTrigger = page.locator("//div[text()='Response Trigger']")
    this.actionTypeButton = page.locator("button[aria-label='action-select-trigger']");
    this.saveTriggerButton = page.locator("//button[text()='Save Trigger']");
    this.sendCampaignsButton = page.locator("//*[text()='Send Campaign']");
    this.inputCampaigns = page.locator("//input[@placeholder='1']");
    this.sendCampaignsButton1 = page.locator(
      "//button[text()='Cancel']/following-sibling::button"
    );
    this.saveAsDraftButton = page.locator("//*[text()='Save as Draft']");
    this.saveAutomationButton = page.locator("//*[text()='Save Automation']");
    this.draftsButtonFromLeftMenu = page.locator("//span[text()='Drafts']");
    this.firstCampaigns = page.locator(
      "//div[@class='c-lesPJm c-lesPJm-igSGhRI-css']/div[2]/div[1]/div[1]/div[1]"
    );
    this.allCampaignsButtonFromLeftMenu = page.locator("//span[text()='All Campaigns']");
    this.editDraftButtonOfLatestDraft = page.locator(
      "//div[@class='c-lesPJm c-lesPJm-igSGhRI-css']/div[2]//button[text()='Edit Draft']"
    );
    this.basicInfoButton = page.locator("//div[text()='Basic Info']");
    this.moreMenuButton = page.locator(
      "//input[@placeholder='Search Campaigns']/ancestor::div[3]/following-sibling::div[1]//button[@type='button']"
    );
    this.deleteDraftButton = page.locator("//div[text()='Delete Draft']");
    this.deleteCampaignsButton = page.locator("//button[text()='Yes, Delete Campaign']");
    this.scheduleMessage = page.locator(
      "//label[text()='Schedule Message (optional)']/parent::div/following-sibling::div/button"
    );
    this.templateButton = page.locator("//button[text()='Templates']");
    this.selectFirstTemplate = page.locator(
      "//div[@role='listbox']/div/div/div[1]//div[@class='c-lesPJm c-lesPJm-ijrvHag-css']"
    );
    this.scheduleCampaignsButton = page.locator("//*[text()='Schedule Campaign']");
    this.uploadContactButton = page.locator(
      "//label[text()='Select Audience']/following-sibling::div//button[contains(@id,'rad')]/preceding-sibling::div/*[1]"
    );
    this.searchCampaignsButton = page.locator("//input[@placeholder='Search Campaigns']");
    this.locationDropDown = page.locator("//input[@placeholder='Locations']");
    this.selectLocation = page.locator(
      "//div[text()='Superwit LA [QA 1][1]']/preceding-sibling::button/following-sibling::div"
    );
    this.selectAllButton = page.locator(
      "//div[text()='Select All']/preceding-sibling::button/following-sibling::div"
    );
    this.userDropDown = page.locator("//input[@placeholder='Users']");
    this.selectUser = page.locator(
      "//div[text()='Sandeep Kumar']/preceding-sibling::button//following-sibling::div"
    );
    this.viewAudienceButton = page.locator("//div[@role='toolbar']/div/div[1]/button");
    this.viewExcludeAudienceButton = page.locator(
      "//div[@role='toolbar']/div/div[2]/button"
    );
    this.viewContactSuggestionButton = page.locator(
      "//div[@role='toolbar']/div/div[3]/button"
    );
    this.viewMessagePreviewButton = page.locator(
      "//div[@role='toolbar']/div/div[4]/button"
    );
    this.viewHelpButton = page.locator("//div[@role='toolbar']/div/div[5]/button");
    this.closeButton = page.locator(
      "//div[@class='c-gqwkJN c-kvItdm c-gqwkJN-ejCoEP-direction-row c-gqwkJN-irEjuD-align-stretch c-gqwkJN-awKDG-justify-start c-gqwkJN-kVNAnR-wrap-noWrap c-gqwkJN-icCayda-css']/following-sibling::button"
    );
    this.scheduledButton = page.locator("//span[text()='Scheduled']");
    this.archivedButton = page.locator("//span[text()='Archived']");
    this.smsOverView = page.locator("//div[@role='tablist']/button[1]");
    this.Delivered100 = page.locator("//div[@role='tablist']/button[2]");
    this.NotDelivered = page.locator("//div[@role='tablist']/button[3]");
    this.unResponded = page.locator("//div[@role='tablist']/button[5]");
    this.responded = page.locator("//div[@role='tablist']/button[4]");
    this.downloadButton = page.locator(
      'div.c-iFkUsR > div:nth-of-type(2) > div > div.c-lesPJm svg'
    );
    this.completeButton = page.locator("//button//span[text()='Complete']");
    this.duplicateCampaignsButton = page.locator("//div[text()='Duplicate Campaign']");
    this.shareCampaignsButton = page.locator("//div[text()='Share Campaign']");
    this.templateButtonOfMenu = page.locator("//span[text()='Templates']");
    this.createTemplateButton = page.locator("//button[text()='Create Template']");
    this.saveTemplateButton = page.locator("//button[text()='Save Template']");
    this.basicInfoButtonOfTemplate = page.locator("//div[text()='Basic Info']");
    this.editTemplateButton = page.locator("//button[text()='Edit Template']");
    this.deleteButton = page.locator('div.c-iFkUsR > div:nth-of-type(2) svg');
    this.unSubscribedButton = page.locator(
      'td:nth-of-type(5) > div > div > div:nth-of-type(1) path'
    );
    this.closeButtonOfUnSubscribed = page.locator("//button[text()='Close']");
    this.openConversationButtonOfArchived = page.locator(
      'td:nth-of-type(6) > div > div > div:nth-of-type(3) svg'
    );
    this.sendMessageButton = page.locator("//div[text()='Send Message ']");
    this.audienceTextBoxOfCampaigns = page.locator(
      "//input[@placeholder='Search for audience by contacts']"
    );
    this.sendButton = page.locator("//button[text()='Send']");
    this.automationsContainer = page.locator("div:nth-of-type(5) div.c-lesPJm-ietiejN-css")
    this.createAutomationLabel = page.locator("//label[text()='Create Campaign Automation (optional)']")
  }

  async clickOnTheCampaignsLinkFromHeader() {
    await this.campaignsLink.click();
  }

  async getCampaignsHeader() {
    return await this.campaignsHeader.innerText();
  }

  async clickOnCreateCampaignsButton() {
    await this.createCampaignButton.click();
  }

  async enterBasicInformation(campaignsData: { campaignsName: string }) {
    await this.campaignsNameTextBox.type(campaignsData.campaignsName);
    await this.campaignsPhoneNumberTextBox.click();
    await this.selectPhoneNumber.click();
    await this.saveButton.click();
  }

  async enterAudienceDetails(campaignsData: { campaignsAudience: string }) {
    await this.selectAudienceTextBox.click();
    await this.page.waitForTimeout(2000);
    await this.selectAudienceTextBox.type('Test ' + campaignsData.campaignsAudience);
    await this.page.waitForTimeout(2000);
    await this.selectAudience.click();
    await this.page.waitForTimeout(2000);
  }

  async enterExcludeDetails(campaignsData: { campaignsExclude: string }) {
    await this.selectExcludeTextBox.click();
    await this.selectExcludeTextBox.type(campaignsData.campaignsExclude);
    await this.selectExclude.click();
    await this.saveButton.click();
  }

  async enterMessageDetail(campaignsData: { campaignsMessage: string }) {
    await this.campaignsMessage.click();
    await this.campaignsMessage.type(campaignsData.campaignsMessage);
  }

  async clickOnSaveButton() {
    await this.saveButton.click();
  }

  async clickOnAddTriggerButton() {
    await this.addTriggerButton.click();

  }

  async verifyPOpUp() {
    await this.page.waitForTimeout(1500)
    expect(this.keywordTrigger).toBeVisible()
    expect(this.responseTrigger).toBeVisible()

  }

  async clickOnLinkTriggerButton(campaignData: { campaignLinkMessage: string }) {
    await this.linkTriggerButton.click();
    await this.campaignsMessage.type(campaignData.campaignLinkMessage);
    await this.saveTriggerButton.click();
  }
  async scheduleCampaigns() {
    const placeHolderText = await this.page
      .locator('//input')
      .getAttribute('placeholder');
    const text = String(placeHolderText).replace('Type', '').trim();
    await this.page.locator('//input').type(text);
    await this.sendCampaignsButton1.click();
  }

  async clickOnSaveDraftButton() {
    await this.saveAsDraftButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnDraftMenuFromTheLeftMenu() {
    await this.draftsButtonFromLeftMenu.click();
  }

  async getLatestCampaignsFromDraft() {
    await this.page.waitForTimeout(2000);
    return await this.firstCampaigns.innerText();
  }

  async clickOnALlCampaignsButtonFromTheLeftMenu() {
    await this.allCampaignsButtonFromLeftMenu.click();
  }

  async clickOnEditDraftAndUpdateTheDraftCampaigns(campaignData: {
    updatedCampaignsName: string;
  }) {
    await this.editDraftButtonOfLatestDraft.click();
    await this.basicInfoButton.click();
    await this.campaignsNameTextBox.clear();
    await this.campaignsNameTextBox.type(campaignData.updatedCampaignsName);
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
    await this.saveAsDraftButton.click();
  }

  async clickOnMoreMenuButton() {
    await this.moreMenuButton.click();
  }

  async clickOnDeleteDraftButton() {
    await this.page.waitForTimeout(3000);
    await this.deleteDraftButton.click();
  }

  async clickOnDeleteCampaignsButton() {
    await this.deleteCampaignsButton.click();
  }

  async addSchedule() {
    await this.scheduleMessage.click();
  }

  async addTemplate() {
    await this.templateButton.click();
    await this.selectFirstTemplate.click();
  }

  async clickOnCampaignsScheduledButton() {
    await this.scheduleCampaignsButton.click();
  }

  async uploadContactButtonOfAudience() {
    await this.uploadContactButton.click();
  }

  async searchCampaigns(campaignName: string) {
    await this.searchCampaignsButton.type(campaignName);
  }

  async verifyLocationDropDown() {
    await this.locationDropDown.click();
    await this.selectLocation.click();
  }

  async verifyUserDropDown() {
    await this.userDropDown.click();
    await this.selectUser.click();
  }

  async variableFunctionality() {
    await this.page
      .locator('div.c-dhEIqI > div:nth-of-type(2) > div:nth-of-type(2) path')
      .click();
    await this.page
      .locator("//*[@placeholder='Search message variables...']")
      .type('Organization Name');
    await this.page.waitForTimeout(2000);
    await this.page.locator("//*[text()='Organization Name']").click();
  }

  async emojiFunctionality() {
    await this.page
      .locator(
        'div.c-gqwkJN-awKDG-justify-start > div > div.c-gqwkJN-iTKOFX-direction-column div:nth-of-type(4) svg'
      )
      .click();
    await this.page.locator("//input[@class='epr-search']").type('Happy');
    await this.page.keyboard.press('Escape');
  }

  async translateButtonFunctionality() {
    await this.page.locator('div.c-lesPJm-ikmBbln-css path').click();
    await this.page.locator("//*[text()='Save Translated Message']").click();
  }

  async signatureButtonFunctionality() {
    await this.page
      .locator(
        "//*[@class='c-idvnTe c-idvnTe-cRIXTU-size-2 c-idvnTe-igfEOy-variant-ghost c-idvnTe-ikmBbln-css']"
      )
      .click();
    await this.page
      .locator("//*[@placeholder='Search signatures...']")
      .type('Testing team');
    await this.page.locator("//mark[text()='Testing team']").click();
  }

  async clickOnViewAudienceButton() {
    await this.viewAudienceButton.click();
  }

  async getHeaderText() {
    return this.page
      .locator(
        "//div[@class='c-gqwkJN c-kvItdm c-gqwkJN-ejCoEP-direction-row c-gqwkJN-irEjuD-align-stretch c-gqwkJN-awKDG-justify-start c-gqwkJN-kVNAnR-wrap-noWrap c-gqwkJN-icCayda-css']"
      )
      .innerText();
  }

  async clickOnViewExcludeAudienceButton() {
    await this.viewExcludeAudienceButton.click();
  }

  async clickOnViewContactSuggestionButton() {
    await this.viewContactSuggestionButton.click();
  }

  async clickOnViewMessagePreviewButton() {
    await this.viewMessagePreviewButton.click();
  }

  async clickOnViewHelpButton() {
    await this.viewHelpButton.click();
  }

  async clickOnCloseButton() {
    await this.closeButton.click();
  }

  async clickOnScheduledButton() {
    await this.scheduledButton.click();
  }

  async clickOnArchivedButton() {
    await this.archivedButton.click();
  }

  async clickOnFirstCampaignsButton() {
    await this.firstCampaigns.click();
  }

  async verifySmSOVerViewDetailsIsDisplayed() {
    await expect(this.smsOverView).toBeVisible();
  }

  async clickOnDelivery100() {
    await this.Delivered100.click();
    await this.page.waitForTimeout(2000);
  }

  async clickONUnResponded() {
    await this.unResponded.click();
    await this.page.waitForTimeout(2000);
  }

  async clickONRespondedButton() {
    await this.responded.click();
    await this.page.waitForTimeout(2000);
  }

  async clickONNotDelivered() {
    await this.NotDelivered.click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnDownloadButton() {
    await this.downloadButton.click();
  }

  async clickOnCompleteButton() {
    await this.completeButton.click();
  }

  async clickOnThreeDotButton() {
    await this.page.waitForTimeout(3000);
    await this.page
      .locator(
        "//button[contains(@id,'radix')]/button[@class='c-idvnTe c-idvnTe-cRIXTU-size-2']"
      )
      .click();
  }

  async clickOnDuplicateCampaignsButton() {
    await this.duplicateCampaignsButton.click();
  }

  async clickOnShareCampaignsButton() {
    await this.shareCampaignsButton.click();
  }

  async clickOnEditCampaignsNameButton() {
    await this.page.locator("//div[text()='Edit Campaign Name']").click();
  }

  async updateCampaigns(campaignData: string) {
    await this.page.locator('#campaign-name').clear();
    await this.page.locator('#campaign-name').type(campaignData);
    await this.page.waitForTimeout(2000);

    await this.page.locator("//button[text()='Save Name']").click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnTemplateButton() {
    await this.templateButtonOfMenu.click();
  }

  async clickOnCreateTemplateButton() {
    await this.createTemplateButton.click();
  }

  async clickOnSaveTemplateButton() {
    await this.saveTemplateButton.click();
  }

  async searchTemplate(templateName: string) {
    await this.page
      .locator("//input[@placeholder='Search Templates']")
      .type(templateName);
    return this.page
      .locator("//button[text()='Use Template']/ancestor::div[2]/preceding-sibling::div")
      .innerText();
  }

  async clickOnBasicInfoButtonOfTemplate() {
    await this.basicInfoButtonOfTemplate.click();
  }

  async updateCampaignsOfTemplate(campaigns: string) {
    await this.page.locator("//input[@placeholder='Name Campaign']").clear();
    await this.page.locator("//input[@placeholder='Name Campaign']").type(campaigns);
    await this.saveButton.click();
  }

  async clickOnEditTemplateButton() {
    await this.editTemplateButton.click();
  }

  async clickOnDeleteButton() {
    await this.deleteButton.click();
    await this.page.locator("//button[text()='Yes, Delete Template']").click();
  }

  async getBlankPageText() {
    return await this.page
      .locator("//span[text()='No Campaign Template Matches Your Search']")
      .innerText();
  }

  async clickOnUnSubScribedButton() {
    await this.unSubscribedButton.click();
  }
  async clickOnCloseButtonOfUnSubscribedButton() {
    await this.closeButtonOfUnSubscribed.click();
  }

  async openConversationButton() {
    await this.openConversationButtonOfArchived.click();
  }

  async clickOnSendMessageButton() {
    await this.sendMessageButton.click();
  }

  async addAudience() {
    await this.audienceTextBoxOfCampaigns.type('Test');
    await this.selectAudience.click();
    await this.page.locator("//div[@role='textbox']").type('Test Automation');
    await this.sendButton.click();
  }

  async clickOnAutomationContainer() {
    await this.automationsContainer.click({ force: true })
  }

  async verifyAutomationContainerMenu() {
    await expect(this.automationsContainer).toBeVisible()
  }

  async clickOnSaveAutomationButton() {
    await this.page.locator("//button[text()='Save Automation']").click()
  }

  async clickOnDeleteAutomationButton() {
    await this.page.locator("//*[text()='Delete Automation']").click()
  }

  
}
