import { test } from '@playwright/test';

import {
  CONTACT_DATA,
  CONTACT_UPLOAD_DATA,
  loginData,
  randomMessage,
  url,
} from './pagedata/commondata';
import ContactPage from './pageobject/ContactsPO';
import { LoginPO } from './pageobject/LoginPO';

test.describe('Contacts Tab', () => {
  let contactFullName: string, contactPhoneNumber: string, contactEmail: string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPO(page);
    const contactsPage = new ContactPage(page);

    // Navigate to the login page and Login
    await page.goto('./');
    await loginPage.loginIntoTheApplication(loginData);
    await page.waitForURL(url.inboxURL);

    // Click on the Contacts tab
    await contactsPage.clickOnContactTab();
    await contactsPage.verifyUserNavigatedToContactsPage();
  });

  test('Create Contact and preview contact', async ({ page }) => {
    const contactsPage = new ContactPage(page);

    // Step 0: Create Contact
    [contactFullName, contactPhoneNumber, contactEmail] = [
      CONTACT_DATA.fullName,
      CONTACT_DATA.phoneNumber,
      CONTACT_DATA.email,
    ];
    await contactsPage.createContact(contactFullName, contactPhoneNumber, contactEmail);

    // Step 1: Verify the contact is created
    await contactsPage.verifyContactCreatedSuccessfully(contactFullName);

    // Step 2: Preview the contact and verify the contact details
    await contactsPage.clickOnTheContact(contactFullName);
    await contactsPage.verifyContactPreview(
      contactFullName,
      contactPhoneNumber,
      contactEmail
    );
  });

  test('Search Contact', async ({ page }) => {
    const contactsPage = new ContactPage(page);

    // Step 0: Search Contact
    await contactsPage.searchContact(contactFullName);

    // Step 1: Verify search result by previewing the contact
    await contactsPage.clickOnTheContact(contactFullName);
    await contactsPage.verifyContactPreview(
      contactFullName,
      contactPhoneNumber,
      contactEmail
    );
  });

  test('Chat with Contact', async ({ page }) => {
    const contactsPage = new ContactPage(page);

    // Step 0: Search Contact
    await contactsPage.searchContact(CONTACT_DATA.fullName);

    // Step 1: Send message to the contact and verify the message
    await contactsPage.clickOnConversationIcon();
    await contactsPage.sendMessageToContact(randomMessage);
    await contactsPage.verifyMessageSentSuccessfully(randomMessage);
  });

  test('Upload Contact', async ({ page }) => {
    const contactsPage = new ContactPage(page);

    // Step 0: Upload Contact
    await contactsPage.clickOnUploadContactsButton();
    await contactsPage.uploadContacts(CONTACT_UPLOAD_DATA.uploadName);

    // Step 1: Verify Contacts is uploaded
    await contactsPage.verifyContactUploadedSuccessfully(
      CONTACT_UPLOAD_DATA.uploadName,
      CONTACT_UPLOAD_DATA.contacts
    );

    // Step 2: Delete the uploaded contact
    await contactsPage.deleteUpload();
  });
});
