import { expect, test } from '@playwright/test';

import {
  CAMPAIGNS_DATA,
  CONTACT_UPLOAD_DATA,
  InboxPageData,
  loginData,
  url,
} from './pagedata/commondata';
import CampaignsPO from './pageobject/CampaignsPO';
import ContactsPO from './pageobject/ContactsPO';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';

test.describe('Verify the functionality of the Campaigns', () => {
  test.beforeEach(async ({ page, context }) => {
    const Login = new LoginPO(page);
    const Inbox = new InboxPO(page, context);
    const Campaigns = new CampaignsPO(page);

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

    // Step 3: Click on the Campaigns button from the header
    await Campaigns.clickOnTheCampaignsLinkFromHeader();
    const headerText = await Campaigns.getCampaignsHeader();
    expect(headerText).toEqual('All Campaigns');
  });
  test('Verify user can save,edit, and delete campaigns drafts  ', async ({
    page,
    context,
  }) => {
    const Campaigns = new CampaignsPO(page);
    const Inbox = new InboxPO(page, context);

    // Click on the create new campaigns button
    await Campaigns.clickOnCreateCampaignsButton();

    // Enter basic information
    await Campaigns.enterBasicInformation(CAMPAIGNS_DATA);

    // Enter audience details
    await Campaigns.enterAudienceDetails(CAMPAIGNS_DATA);
    await Campaigns.enterExcludeDetails(CAMPAIGNS_DATA);

    // Enter message details
    await Campaigns.enterMessageDetail(CAMPAIGNS_DATA);

    // Send the attachments and click on the save button
    await Inbox.sendAttachments('src/assets/Test.pdf');
    await Inbox.sendAttachments('src/assets/Test Automation.pdf');
    await Campaigns.clickOnSaveButton();

    // Click on the save button
    await Campaigns.clickOnSaveButton();
    await Campaigns.clickOnAddTriggerButton();

    // Click on add trigger button
    await Campaigns.clickOnLinkTriggerButton(CAMPAIGNS_DATA);

    // Click on send campaigns button
    // await Campaigns.clickOnSendCampaignsButton()

    // Click on the send Draft button
    await Campaigns.clickOnSaveDraftButton();

    // Click on draft menu button from the left menu
    await Campaigns.clickOnDraftMenuFromTheLeftMenu();
    const actualDraft = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualDraft).toEqual(CAMPAIGNS_DATA.campaignsName);

    // Click on the all campaigns button and verify
    await Campaigns.clickOnALlCampaignsButtonFromTheLeftMenu();
    const actualDraft1 = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualDraft1).toEqual(CAMPAIGNS_DATA.campaignsName);

    // Updated the campaigns data
    await Campaigns.clickOnEditDraftAndUpdateTheDraftCampaigns(CAMPAIGNS_DATA);

    // Click on draft menu button from the left menu
    await Campaigns.clickOnDraftMenuFromTheLeftMenu();
    const actualUpdatedDraft = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualUpdatedDraft).toEqual(CAMPAIGNS_DATA.updatedCampaignsName);

    // Click on the all campaigns button and verify
    await Campaigns.clickOnALlCampaignsButtonFromTheLeftMenu();
    const actualUpdatedDraft2 = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualUpdatedDraft2).toEqual(CAMPAIGNS_DATA.updatedCampaignsName);

    // Click on more menu of the latest draft
    await Campaigns.clickOnMoreMenuButton();

    // Click on delete draft button
    await Campaigns.clickOnDeleteDraftButton();
    await Campaigns.clickOnDeleteCampaignsButton();

    // Click on the all campaigns button and verify
    await Campaigns.clickOnALlCampaignsButtonFromTheLeftMenu();
    const actualUpdatedDraft3 = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualUpdatedDraft3).not.toEqual(CAMPAIGNS_DATA.updatedCampaignsName);
  });

  test('Verify E2E test case', async ({ page, context }) => {
    const Campaigns = new CampaignsPO(page);
    const Inbox = new InboxPO(page, context);
    const Contact = new ContactsPO(page);

    // Click on the create new campaigns button
    await Campaigns.clickOnCreateCampaignsButton();

    // Enter basic information
    await Campaigns.enterBasicInformation(CAMPAIGNS_DATA);

    // Enter audience details
    await Campaigns.enterAudienceDetails(CAMPAIGNS_DATA);
    await Campaigns.uploadContactButtonOfAudience();
    await Contact.uploadContacts(CONTACT_UPLOAD_DATA.uploadNameForAudience);
    await Campaigns.enterExcludeDetails(CAMPAIGNS_DATA);

    // Enter message details
    await Campaigns.enterMessageDetail(CAMPAIGNS_DATA);

    //  Send the attachments
    await Inbox.sendAttachments('src/assets/Test Automation.pdf');
    await Campaigns.addTemplate();
    await Campaigns.clickOnSaveButton();

    //  Click on the save button
    await Campaigns.addSchedule();
    await Campaigns.clickOnSaveButton();
    await Campaigns.clickOnAddTriggerButton();

    // Click on add trigger button
    await Campaigns.clickOnLinkTriggerButton(CAMPAIGNS_DATA);

    // Click on the Campaigns schedule button
    await Campaigns.clickOnCampaignsScheduledButton();

    // Schedule the campaigns
    await Campaigns.scheduleCampaigns();

    // Click on the all campaigns button from the left menu
    await Campaigns.clickOnALlCampaignsButtonFromTheLeftMenu();
    const actualUpdatedDraft3 = await Campaigns.getLatestCampaignsFromDraft();
    expect(actualUpdatedDraft3).toEqual(CAMPAIGNS_DATA.campaignsName);

    // Verify campaigns is scheduled
    expect(
      page.locator(
        "//div[@class='c-lesPJm c-lesPJm-igSGhRI-css']/div[2]/div[1]/div[1]/div[2]/span"
      )
    ).toBeVisible();

    // Search the created Campaigns
    await Campaigns.searchCampaigns(CAMPAIGNS_DATA.campaignsName);
    expect(actualUpdatedDraft3).toEqual(CAMPAIGNS_DATA.campaignsName);
    await Campaigns.searchCampaignsButton.clear();

    // Verify the location dropdown functionality
    await Campaigns.verifyLocationDropDown();
    await Campaigns.selectAllButton.click();

    // Verify the user dropdown functionality
    await Campaigns.verifyUserDropDown();

    // Click on the scheduled button functionality
    await Campaigns.clickOnScheduledButton();
    const scheduledText = await Campaigns.getLatestCampaignsFromDraft();
    expect(scheduledText).toEqual(CAMPAIGNS_DATA.campaignsName);

    // Verify invalid campaigns functionality
    await Campaigns.searchCampaigns('dasdasdasdasdasdasadd');
    await page.waitForTimeout(3000);
    await expect(Campaigns.firstCampaigns).not.toBeVisible();
  });

  test('Verify message functionality', async ({ page }) => {
    const Campaigns = new CampaignsPO(page);

    // Click on the create new campaigns button
    await Campaigns.clickOnCreateCampaignsButton();

    // Enter basic information
    await Campaigns.enterBasicInformation(CAMPAIGNS_DATA);

    // Enter audience details
    await Campaigns.enterAudienceDetails(CAMPAIGNS_DATA);
    await Campaigns.enterExcludeDetails(CAMPAIGNS_DATA);

    // Enter message details
    await Campaigns.enterMessageDetail(CAMPAIGNS_DATA);

    // Verify the variable functionality
    await Campaigns.variableFunctionality();

    // Verify the emoji functionality
    await Campaigns.emojiFunctionality();

    // Verify the translate button functionality
    await Campaigns.translateButtonFunctionality();

    // Verify the signature button functionality
    await Campaigns.signatureButtonFunctionality();
  });

  test('Verify that right bar menu functionality', async ({ page }) => {
    const Campaigns = new CampaignsPO(page);

    // Click on the create new campaigns button
    await Campaigns.clickOnCreateCampaignsButton();

    // Click on the view Audience button and verify
    await Campaigns.clickOnViewAudienceButton();
    const headerText = await Campaigns.getHeaderText();
    expect(headerText).toEqual('Audience');
    await Campaigns.clickOnCloseButton();

    // Click on the view exclude audience button and verify
    await Campaigns.clickOnViewExcludeAudienceButton();
    const headerText2 = await Campaigns.getHeaderText();
    expect(headerText2).toEqual('Excluded Contacts');
    await Campaigns.clickOnCloseButton();

    // Click on the view contacts suggestion button and verify
    await Campaigns.clickOnViewContactSuggestionButton();
    const headerText3 = await Campaigns.getHeaderText();
    expect(headerText3).toEqual('Content Suggestions');
    await Campaigns.clickOnCloseButton();

    // Click on the message preview button and verify
    await Campaigns.clickOnViewMessagePreviewButton();
    const headerText4 = await Campaigns.getHeaderText();
    expect(headerText4).toEqual('Preview Message');
    await Campaigns.clickOnCloseButton();

    // Click on the view help button and verify
    await Campaigns.clickOnViewHelpButton();
    const headerText5 = await Campaigns.getHeaderText();
    expect(headerText5).toEqual('Help');
    await Campaigns.clickOnCloseButton();
  });

  test('Verify the functionality of the Complete menu', async ({ page }) => {
    const Campaigns = new CampaignsPO(page);
    test.setTimeout(120000);

    // Click on the complete button from the left side menu
    await Campaigns.clickOnCompleteButton();
    const campaigns1 = await Campaigns.firstCampaigns.innerText();

    // Click on the first campaigns
    await Campaigns.clickOnFirstCampaignsButton();

    // Verify thw SMS OVerview Details
    expect(Campaigns.smsOverView).toBeVisible();
    await page.waitForTimeout(2000);

    // Click on the 100 % Delivered button
    await Campaigns.clickOnDelivery100();
    expect(Campaigns.Delivered100).toBeVisible();
    await page.waitForTimeout(2000);

    // Click on the Not Delivered button
    await Campaigns.clickONNotDelivered();
    await page.waitForTimeout(2000);

    // Click on the Responded button
    await Campaigns.clickONRespondedButton();
    await expect(page.locator("//button[text()=' Refresh Analytics']")).toBeVisible();

    // Click on the UnREsponded button
    await Campaigns.clickONUnResponded();

    // Click on the Download button
    await Campaigns.clickOnDownloadButton();
    await page.waitForEvent('download');
    await page.waitForTimeout(2000);

    // Click on three dot button and verify search button functionality
    await Campaigns.clickOnThreeDotButton();
    await Campaigns.clickOnDuplicateCampaignsButton();
    await page.waitForTimeout(2000);

    // Search the Campaigns and tap on the more button
    await Campaigns.searchCampaigns(campaigns1);
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaignsButton.clear();
    await Campaigns.clickOnMoreMenuButton();

    // Click on delete draft button
    await Campaigns.clickOnDeleteDraftButton();
    await Campaigns.clickOnDeleteCampaignsButton();
    await page.waitForTimeout(2000);

    // Click on the Complete button
    await Campaigns.clickOnCompleteButton();
    await page.waitForTimeout(2000);

    // Search the Created Campaigns
    await Campaigns.searchCampaigns(campaigns1);
    await page.waitForTimeout(2000);

    // Click on the THree dot button and verify the share functionality button
    await Campaigns.clickOnFirstCampaignsButton();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnThreeDotButton();
    await Campaigns.clickOnShareCampaignsButton();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(2000);
    await Campaigns.clickOnThreeDotButton();

    // Click on the edit campaigns button functionality
    await Campaigns.clickOnEditCampaignsNameButton();
    await page.waitForTimeout(2000);
    const updateCampaigns = 'Update' + campaigns1;
    await Campaigns.updateCampaigns(updateCampaigns);
    await page.waitForTimeout(2000);
    await Campaigns.clickOnShareCampaignsButton();

    // Click on the Complete button and search the campaigns
    await Campaigns.clickOnCompleteButton();
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaigns(updateCampaigns);
  });

  test('Verify the functionality of the archived', async ({ page }) => {
    const Campaigns = new CampaignsPO(page);
    test.setTimeout(150000);

    // Click on the create new campaigns button
    await Campaigns.clickOnArchivedButton();
    await Campaigns.clickOnFirstCampaignsButton();

    // Verify thw SMS OVerview Details
    expect(Campaigns.smsOverView).toBeVisible();

    // Click on the 100 % Delivered button
    await Campaigns.clickOnDelivery100();
    // expect(Campaigns.Delivered100).toBeVisible()

    // Click on the Not Delivered button
    await Campaigns.clickONNotDelivered();

    // Click on the Responded button
    await Campaigns.clickONRespondedButton();

    // Click on the UnREsponded button
    await Campaigns.clickONUnResponded();

    // Click on the Download button and verify is downloaded
    await Campaigns.clickOnDownloadButton();
    await page.waitForEvent('download');

    // Click on the archived button and search the campaigns, and  select that campaigns
    await Campaigns.clickOnArchivedButton();
    await Campaigns.searchCampaigns('quick-campaign-2023');
    await page.waitForTimeout(3000);
    await Campaigns.firstCampaigns.click();
    await page.waitForTimeout(2000);

    // Click on the 100% delivery button
    await Campaigns.clickONNotDelivered();

    // Click on the Unsubscribed button and again click on the close button
    await Campaigns.clickOnUnSubScribedButton();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnCloseButtonOfUnSubscribedButton();
    await page.waitForTimeout(2000);

    await Campaigns.clickOnSendMessageButton();
    await Campaigns.addAudience();

    // Click on the Three dot button and tap on the duplicate campaigns button
    await page.waitForTimeout(3000);
    await Campaigns.clickOnThreeDotButton();
    await Campaigns.clickOnDuplicateCampaignsButton();
    await page.waitForTimeout(2000);

    // Verify that duplicate campaigns is created
    await Campaigns.searchCampaigns('quick-campaign-2023');
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaignsButton.clear();

    // Click on more button and delete draft button
    await Campaigns.clickOnMoreMenuButton();
    await Campaigns.clickOnDeleteDraftButton();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnDeleteCampaignsButton();
    await page.waitForTimeout(2000);

    // Click on the archived button and search the campaigns
    await Campaigns.clickOnArchivedButton();
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaigns('quick-campaign-2023');
    await page.waitForTimeout(2000);

    // Click on the THree dot button and verify the share functionality button
    await Campaigns.clickOnFirstCampaignsButton();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnThreeDotButton();
    await Campaigns.clickOnShareCampaignsButton();
    await page.waitForTimeout(2000);
    // expect(page.locator("//div[@role='status']")).toBeVisible()
    await Campaigns.clickOnThreeDotButton();
    await page.waitForTimeout(2000);

    // Click on the edit campaigns button functionality
    await Campaigns.clickOnEditCampaignsNameButton();
    await page.waitForTimeout(2000);
    const updateCampaigns = 'Update Campaigns' + 'quick-campaign-2023';
    await Campaigns.updateCampaigns(updateCampaigns);
    await page.waitForTimeout(2000);

    // Verify the share campaigns button functionality
    await Campaigns.clickOnShareCampaignsButton();
    await page.waitForTimeout(2000);

    // Click on the Archived button and search the updated campaigns
    await Campaigns.clickOnArchivedButton();
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaigns(updateCampaigns);

    // Click on the campaigns and click on the three dot button
    await Campaigns.firstCampaigns.click();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnThreeDotButton();
    await page.waitForTimeout(2000);

    // Click on the edit campaigns button
    await Campaigns.clickOnEditCampaignsNameButton();
    await page.waitForTimeout(2000);

    // Update the campaigns
    const updateCampaigns1 = 'quick-campaign-2023';
    await Campaigns.updateCampaigns(updateCampaigns1);
    await page.waitForTimeout(2000);
    await Campaigns.clickOnShareCampaignsButton();
    await page.waitForTimeout(2000);

    // Click on the archived button and search the updated campaigns
    await Campaigns.clickOnArchivedButton();
    await page.waitForTimeout(2000);
    await Campaigns.searchCampaigns(updateCampaigns1);
  });

  test('Verify the functionality of the template ', async ({ page, context }) => {
    const Campaigns = new CampaignsPO(page);
    const Contact = new ContactsPO(page);
    const Inbox = new InboxPO(page, context);

    // Click on the Template button
    await Campaigns.clickOnTemplateButton();

    // Click on Create Template button
    await Campaigns.clickOnCreateTemplateButton();
    await Campaigns.enterBasicInformation(CAMPAIGNS_DATA);

    // Enter audience details and upload the contacts from the excel
    await Campaigns.enterAudienceDetails(CAMPAIGNS_DATA);
    await Campaigns.uploadContactButtonOfAudience();
    await Contact.uploadContacts(
      'Test Campaigns ' + CONTACT_UPLOAD_DATA.uploadNameForAudience
    );
    await Campaigns.enterExcludeDetails(CAMPAIGNS_DATA);

    // Enter message details
    await Campaigns.enterMessageDetail(CAMPAIGNS_DATA);

    // Send the attachments
    await Inbox.sendAttachments('src/assets/Test Automation.pdf');
    await Campaigns.addTemplate();
    await Campaigns.clickOnSaveButton();

    // Click on save template button
    await Campaigns.clickOnSaveTemplateButton();

    // Click on the Template button
    await Campaigns.clickOnTemplateButton();

    // search the template and click o edit template button
    const createdTemplateName = await Campaigns.searchTemplate(
      CAMPAIGNS_DATA.campaignsName
    );
    await page.waitForTimeout(3000);
    expect(createdTemplateName).toEqual(CAMPAIGNS_DATA.campaignsName);

    // Click on the Basic info button of template
    const updateTemplate = 'Template' + CAMPAIGNS_DATA.campaignsName;
    await Campaigns.clickOnEditTemplateButton();
    await page.waitForTimeout(2000);
    await Campaigns.clickOnBasicInfoButtonOfTemplate();
    await page.waitForTimeout(2000);

    // Update the Template Information
    await Campaigns.updateCampaignsOfTemplate(updateTemplate);

    // Click on the save template button
    await Campaigns.clickOnSaveTemplateButton();

    // Click on the template button from the left menu
    await Campaigns.clickOnTemplateButton();

    // Search the updated template
    const updatedTemplateName = await Campaigns.searchTemplate(updateTemplate);
    await page.waitForTimeout(3000);
    expect(updatedTemplateName).toEqual(updateTemplate);

    // Click on edit template button and perform delete button
    await Campaigns.clickOnEditTemplateButton();
    await page.waitForTimeout(2000);

    // Click on the delete button
    await Campaigns.clickOnDeleteButton();

    // Search the updated templated name and verify blank page text
    await page
      .locator("//input[@placeholder='Search Templates']")
      .type(updatedTemplateName);
    const blankPageText = await Campaigns.getBlankPageText();
    expect(blankPageText).toEqual('No Campaign Template Matches Your Search');
  });

  test('Verify the functionality of the automation menu', async({page,context})=>{
    const Campaigns = new CampaignsPO(page);
    const Inbox = new InboxPO(page, context);
    const Contact = new ContactsPO(page)

     // Click on the create new campaigns button
     await Campaigns.clickOnCreateCampaignsButton();

     // Enter basic information
     await Campaigns.enterBasicInformation(CAMPAIGNS_DATA);
 
     // Enter audience details
     await Campaigns.enterAudienceDetails(CAMPAIGNS_DATA);
     await Campaigns.uploadContactButtonOfAudience();
     await Contact.uploadContacts(CONTACT_UPLOAD_DATA.uploadNameForAudience);
     await Campaigns.enterExcludeDetails(CAMPAIGNS_DATA);
 
     // Enter message details
     await Campaigns.enterMessageDetail(CAMPAIGNS_DATA);
 
     //  Send the attachments
     await Inbox.sendAttachments('src/assets/Test Automation.pdf');
     await Campaigns.addTemplate();
     await Campaigns.clickOnSaveButton();
 
     //  Click on the save button
     await Campaigns.addSchedule();
     await Campaigns.clickOnSaveButton();

      await Campaigns.verifyAutomationContainerMenu()

    // await Campaigns.clickOnAutomationContainer();
    await Campaigns.clickOnAddTriggerButton();

    await Campaigns.verifyPOpUp()

    // Click on add trigger button
    await Campaigns.clickOnLinkTriggerButton(CAMPAIGNS_DATA);

    // Click on the save automation button
    await Campaigns.clickOnSaveAutomationButton()

    // Click on the Delete Automation button
    await Campaigns.clickOnDeleteAutomationButton();

  })
});
