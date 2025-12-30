import { expect, test } from '@playwright/test';

import { InboxPageData, loginData, url } from './pagedata/commondata';
import ContactsPO from './pageobject/ContactsPO';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';

test.describe('Verify the functionality of the Inbox', () => {
  test.setTimeout(120000);

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

  test('Verify that user can add and close conversations', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);

    // Step 1: Click on the add button of the inbox
    await Inbox.clickOnAddButton();

    // Step 2: Send Sms
    await Inbox.addTheMessageData(InboxPageData);
    await Inbox.clickOnSendButton();

    // Step 3: Verify Sms

    const expectedMessage = await Inbox.verifyMessage();
    expect(InboxPageData.smsDescription).toEqual(expectedMessage);

    const getNameInOpenTab = await Inbox.getNameOfOpenTab();
    expect(InboxPageData.senderName).toEqual(getNameInOpenTab);

    // Step 4: Click on close the conversation button and verify conversation is closed
    await Inbox.clickOnCloseConversationButton();
    const getNameFromOpenTab = await Inbox.getNameOfOpenTab();
    expect(InboxPageData.senderName).not.toContain(getNameFromOpenTab);
  });

  test('Assigned to me', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);

    // Step 0: Click on assigned to me
    await page.locator("//span[text()='Assigned to me']").click();

    // Step 1: Check all conversation menus are loading working properly
    await inboxPage.subMenuLoadingAndValidateForAssignedMenu();
  });
  test('Verify that user can add,edit and delete template', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);

    // Step 1: Click on the add button of the inbox
    await Inbox.clickOnAddButton();

    // Step 2: Add user sms details
    await Inbox.addTheMessageData(InboxPageData);

    // Step 3: Click on template button and verify
    await Inbox.clickOnTemplateButton();

    // Step 4: Add new template button and verify
    await Inbox.clickOnAddNewTemplateButton();
    const receivedHeaderOfAddTemplate = await Inbox.getHeaderOfAddTemplatePopup();
    expect(receivedHeaderOfAddTemplate).toEqual(InboxPageData.addTemplateHeader);

    // Step 5: Add Template data and verify template is added
    await Inbox.addTemplateDetails(InboxPageData);

    const templateName = await Inbox.searchTemplate(InboxPageData);
    expect(templateName).toEqual(InboxPageData.templateName);

    // Step 6: Click on the edit button of the template and update
    await Inbox.clickOnEditButtonOfTemplate();
    await Inbox.updateTemplate(InboxPageData);

    // Step 7: Click on the edit button of the template and delete
    await Inbox.clickOnEditButtonOfTemplate();
    await Inbox.clickOnDeleteTemplateButton();
  });

  test('Verify that user can add the attachments', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);

    // Step 1: Click on the add button of the inbox
    await Inbox.clickOnAddButton();

    // Step 2: Add user sms details
    await Inbox.addTheMessageDataForAttachments(InboxPageData);
    await Inbox.sendAttachments('src/assets/Test Automation.pdf');
    await Inbox.clickOnSendButton();
    await page.waitForTimeout(5000);

    // Step 3: Verify Sms details
    //const getNameInOpenTab = await Inbox.getAttachmentsText();
    // console.log("Get name1 " + getNameInOpenTab)
    //  expect('Attachment').toContain(getNameInOpenTab);
  });

  test('Verify the right bar in chat section', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);
    const contactsPage = new ContactsPO(page);

    // Step 0: Check all conversation menus are loading working properly
    await inboxPage.subMenuLoadingAndValidate();

    // Step 1: Search invalid conversation of a contact and verify
    await inboxPage.searchInvalidConversationAndVerify('invalid1342');

    // Step 2: Search conversation of a contact and verify
    await inboxPage.searchConversationAndVerify('Whippy Testing');

    // Step 3: Click on the conversation
    await inboxPage.clickOnTheConversation('Whippy Testing');

    // Step 4: Check all conversation chat is assigned to proper user
    await inboxPage.checkUserIsAssigned();

    // Step 5: Check all conversation chat threebox menu
    await inboxPage.checkThreeDotMenuAndValidateAllOptions();

    // Step 6: Verify Chat Right Toolbar
    await inboxPage.verifyChatRightToolbar();

    // Step 7: Verify Chat Right Toolbar ViewContact
    await inboxPage.verifyChatRightToolbarViewContact();

    // Step 8: View Contact Details
    await contactsPage.verifyContactPreview(
      'Whippy Testing',
      '(323) 997-4985',
      'whippy@yopmail.com'
    );
    await page.keyboard.press('Escape');

    // Step 9: Verify Chat Right Toolbar Search And Verify
    await inboxPage.verifyChatRightToolbarSearchAndVerify('Welcome to Whippy');

    // Step 10: Attachment, Campaign, Translate, Suggestions, Help
    await inboxPage.verifyChatRightToolbarAttachment();
    await inboxPage.verifyChatRightToolbarCampaign();
    await inboxPage.verifyChatRightToolbarTranslate();
    await inboxPage.verifyChatRightToolbarSuggestions();
    await inboxPage.verifyChatRightToolbarHelp();

    // Step 11: individual message options
    await inboxPage.validateIndividualMsgOptions(InboxPageData);
  });

  test('Verify use shortcut editor', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);

    // Step 2: Search conversation of a contact and verify
    await inboxPage.searchConversationAndVerify('Whippy Testing');

    // Step 3: Click on the conversation
    await inboxPage.clickOnTheConversation('Whippy Testing');

    await inboxPage.openUseShortcut();
    await inboxPage.useShortcutEmojiAndValidate();
    await inboxPage.openUseShortcut();
    await inboxPage.useShortcutChangeToNotes();
    await inboxPage.useShortcutFilter();
  });

  test('Use shortcut variable template', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);

    // Step 2: Search conversation of a contact and verify
    await Inbox.searchConversationAndVerify('Whippy Testing');

    // Step 3: Click on the conversation
    await Inbox.clickOnTheConversation('Whippy Testing');

    // Step 3: Click on template use shortcut
    await Inbox.useShortcutOpenTemplate();

    // Step 4: Add new template button and verify
    await Inbox.clickOnAddNewTemplateButton();
    const receivedHeaderOfAddTemplate = await Inbox.getHeaderOfAddTemplatePopup();
    expect(receivedHeaderOfAddTemplate).toEqual(InboxPageData.addTemplateHeader);

    // Step 5: Add Template data and verify template is added
    await Inbox.addTemplateVariableDetails(InboxPageData);

    const templateName = await Inbox.searchTemplate(InboxPageData);
    expect(templateName).toEqual(InboxPageData.templateName);

    await Inbox.clickOnVariableOfTemplate();

    await Inbox.useShortcutOpenTemplate();
    const templateNameVar = await Inbox.searchTemplate(InboxPageData);
    expect(templateNameVar).toEqual(InboxPageData.templateName);

    // Step 6: Click on the edit button of the template and update
    await Inbox.clickOnEditButtonOfTemplate();
    await Inbox.updateTemplate(InboxPageData);

    // Step 7: Click on the edit button of the template and delete
    await Inbox.clickOnEditButtonOfTemplate();
    await Inbox.clickOnDeleteTemplateButton();
  });

  test('Verify the add message variable', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);

    // Step 0: Search conversation of a contact and verify
    await inboxPage.searchConversationAndVerify('Whippy Testing');

    // Step 1: Click on the conversation
    await inboxPage.clickOnTheConversation('Whippy Testing');

    // Step 2: Click on Review Invitation
    await inboxPage.clickOnAddMessageAndValidate();
  });

  test('Verify the Review Invitation, signature and emoji', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);

    // Step 0: Search conversation of a contact and verify
    await inboxPage.searchConversationAndVerify('Whippy Testing');

    // Step 1: Click on the conversation
    await inboxPage.clickOnTheConversation('Whippy Testing');

    // Step 2: Click on Review Invitation
    await inboxPage.clickOnReviewInvitationAndValidate();

    // Step 3: Click on emoji and validate it
    await inboxPage.clickOnEmojiAndValidate();

    // Step 4: CRUD Signature
    await inboxPage.ValidateSignature();
  });

  test('Verify the Schedule Message', async ({ page, context }) => {
    const inboxPage = new InboxPO(page, context);

    // Step 1: Create Schedule Message
    await inboxPage.createScheduleMsg();

    // Step 2: Update schedule message
    await inboxPage.updateScheduleMsg();

    // Step 3: Delete and recreate the schedule message
    await inboxPage.deleteScheduleMsg();
    await inboxPage.createScheduleMsg();

    // Step 4: Verify schedule message loading and working properly
    await inboxPage.clickOnScheduleBtnAndValidate();
  });

  test.skip('Verify the functionality of the attachments', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);

    // Step 1: Click on the attachments button from the left menu side
    await Inbox.clickOnAttachmentsButton();
    await Inbox.clickOnAttachmentsImage();

    // Step 2: ShareButton functionally
    expect(Inbox.shareButton).toBeVisible();
    await Inbox.shareButtonWorking();

    // Step 3: Download functionally
    expect(Inbox.downloadButton).toBeVisible();
    await Inbox.checkDownloadBtnWorking();

    // Step 4: Click  on attachments  image and verify
    expect(Inbox.downloadButtonOfAttachmentsButton).toBeVisible();
    expect(Inbox.printButtonOfAttachments).toBeVisible();
    expect(Inbox.shareButtonOfAttachments).toBeVisible();

    // Step 5: Verify the download,share, and open conversation button is displayed
    expect(Inbox.openConversationButton).toBeVisible();
    await Inbox.openConversationButtonWorking();
  });

  test('Verify the functionality of the Location', async ({ page, context }) => {
    const Inbox = new InboxPO(page, context);
    await Inbox.clickOnLocationButtonAndValidate();
  });
});
