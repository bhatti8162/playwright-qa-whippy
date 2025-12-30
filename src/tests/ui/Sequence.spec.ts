import { expect, test } from '@playwright/test';

import { ALL_SEQUENCES_DATA, InboxPageData, loginData, url } from './pagedata/commondata';
import CampaignsPO from './pageobject/CampaignsPO';
import { InboxPO } from './pageobject/InboxPO';
import { LoginPO } from './pageobject/LoginPO';
import { SequencePO } from './pageobject/SequencePO';

test.describe('Verify the functionality of the Sequences', () => {
  test.beforeEach(async ({ page, context }) => {
    const Login = new LoginPO(page);
    const Inbox = new InboxPO(page, context);
    const Sequences = new SequencePO(page);

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

    // Step 3: Click on the sequences button
    await Sequences.clickOnSequenceButton();
    const headerText = await Sequences.getSequenceHeader();
    expect(headerText).toEqual(ALL_SEQUENCES_DATA.headerText);
  });

  test('Verify that user can successfully create,update, and delete  sequences', async ({
    page,
  }) => {
    const Sequences = new SequencePO(page);
    const Campaign = new CampaignsPO(page);

    // Step 1: Click on Create new sequence button
    await Sequences.clickOnSequenceButton();

    // Step 2: Create Sequence data
    await Sequences.clickOnCreteSequencesButton();
    await Sequences.addSequencesData(ALL_SEQUENCES_DATA);

    // Step 3: Click on next step button
    await Sequences.clickOnNextStepButton();

    // Step 4: Click on save sequences button
    await Sequences.clickOnSaveSequencesButton();

    // Step 5: Click on add steps button
    await Sequences.clickOnAddStepButton();

    // Step 6: Add Sequences data
    await Sequences.addSequenceData(ALL_SEQUENCES_DATA);
    const sequenceData = await Sequences.getSequencesStepData();
    expect(sequenceData).toEqual(ALL_SEQUENCES_DATA.message);

    // Step 7: Click on all sequences button and verify
    await Sequences.clickOnAllSequenceButton();
    const sequence = await Sequences.getAllSequencesData();
    expect(sequence).toEqual(ALL_SEQUENCES_DATA.title);

    // Step 8: Click on edit sequence button and update the sequences
    await Sequences.clickOnEditSequencesButton();
    await Sequences.UpdateSequences(ALL_SEQUENCES_DATA);
    await Sequences.clickOnNextStepButton();
    await Sequences.clickOnSaveSequencesButton();

    // Step 9: Click on the all sequences button and verify sequences is updated
    await Sequences.clickOnAllSequenceButton();
    const sequence2 = await Sequences.getAllSequencesData();
    expect(sequence2).toEqual(ALL_SEQUENCES_DATA.updatedTitle);

    // Step 10: Search the created Sequence and verify
    await Sequences.searchTheCreatedSequence(ALL_SEQUENCES_DATA);
    const sequence4 = await Sequences.getAllSequencesData();
    expect(sequence4).toEqual(ALL_SEQUENCES_DATA.updatedTitle);
    await Sequences.searchSequenceButton.clear();

    // Step 11: Click on Delete button and verify sequences is deleted
    await Sequences.clickOnEditSequencesButton();
    await Sequences.deleteSequence();
    const sequence3 = await Sequences.getAllSequencesData();
    expect(sequence3).not.toContain(ALL_SEQUENCES_DATA.updatedTitle);

    // Step 12: Verify location and user dropdown
    await Campaign.verifyLocationDropDown();
    await Campaign.verifyUserDropDown();
  });

  test('Verify the Sequences functionality ', async ({ page }) => {
    const Sequences = new SequencePO(page);

    // Step 1: Click on Create new sequence button
    await Sequences.clickOnSequenceButton();

    // Step 2: Search the Invalid Sequences
    await Sequences.searchTheInvalidSequences();
  });
});
