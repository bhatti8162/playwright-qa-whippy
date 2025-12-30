import { Locator, Page } from '@playwright/test';

export class SequencePO {
  page: Page;
  sequencesButton: Locator;
  sequenceHeader: Locator;
  createSequenceButton: Locator;
  titleTextBox: Locator;
  descriptionTextBox: Locator;
  sequenceTypeDropDown: Locator;
  selectSequentialTypeValue: Locator;
  nextStepButton: Locator;
  saveSequencesButton: Locator;
  addStepButton: Locator;
  stepTitle: Locator;
  enterMessageTextBox: Locator;
  saveStepButton: Locator;
  getSequencesStep: Locator;
  allSequencesButton: Locator;
  getAllSequences: Locator;
  editSequenceButton: Locator;
  deleteSequenceButton: Locator;
  searchSequenceButton: Locator;
  settingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sequencesButton = page.locator(
      `//a[@href="/sequences" and div[text()="Sequences"]]`
    );
    this.sequenceHeader = page.locator(
      "//*[@class='c-dZtKUU c-PJLV c-PJLV-geCXAV-gap-2 c-PJLV-joJbDg-align-center']/div[2]/div"
    );
    this.createSequenceButton = page.locator("//button[text()='Create Sequence']");
    this.titleTextBox = page.locator("input[name='title']");
    this.descriptionTextBox = page.locator("input[name='description']");
    this.sequenceTypeDropDown = page.locator("//span[text()='Sequential']");
    this.selectSequentialTypeValue = page.locator("//option[@value='branched']");
    this.nextStepButton = page.locator("//button[text()='Next Step']");
    this.saveSequencesButton = page.locator("button[type='submit']");
    this.addStepButton = page.locator("//button[text()='Add Step']");
    this.stepTitle = page.locator("input[placeholder='Title']");
    this.enterMessageTextBox = page.locator(
      `//*[@class='c-gqwkJN c-gqwkJN-iTKOFX-direction-column c-gqwkJN-irEjuD-align-stretch c-gqwkJN-awKDG-justify-start c-gqwkJN-kVNAnR-wrap-noWrap c-gqwkJN-ilkBNdM-css']`
    );
    this.saveStepButton = page.locator("//button[text()='Save Step']");
    this.getSequencesStep = page.locator('.c-lesPJm.c-htjgxi');
    this.allSequencesButton = page.locator("//*[text()='All Sequences']");
    this.getAllSequences = page.locator('div.c-lesPJm > div:nth-of-type(1) div.c-bZpbUM');
    this.editSequenceButton = page.locator(
      "//*[@class='c-dZtKUU c-PJLV c-PJLV-eAjJQS-gap-1 c-PJLV-joJbDg-align-center c-dZtKUU-ifGHEql-css']/parent::div/following-sibling::div/div[1]//button"
    );
    this.deleteSequenceButton = page.locator(
      "//*[@class='c-ixmRZq c-ixmRZq-hCpLfh-size-2 c-ixmRZq-hUJvqp-variant-red']"
    );
    this.searchSequenceButton = page.locator("//input[@placeholder='Search Sequences']");
    this.settingButton = page.locator(
      "//div[@class='c-dZtKUU c-PJLV c-PJLV-geCXAV-gap-2 c-PJLV-joJbDg-align-center c-dZtKUU-igZXhNx-css']/button[1]"
    );
  }

  async clickOnSequenceButton() {
    await this.page.waitForTimeout(3000);
    await this.sequencesButton.click();
  }

  async getSequenceHeader() {
    return await this.sequenceHeader.innerText();
  }

  async clickOnCreteSequencesButton() {
    await this.createSequenceButton.click();
  }

  async addSequencesData(data: { title: string; description: string }) {
    await this.titleTextBox.type(data.title);
    await this.descriptionTextBox.type(data.description);
  }

  async clickOnNextStepButton() {
    await this.nextStepButton.click();
  }

  async clickOnSaveSequencesButton() {
    await this.saveSequencesButton.click();
  }

  async clickOnAddStepButton() {
    await this.addStepButton.click();
  }

  async addSequenceData(data: { stepTitle: string; message: string }) {
    await this.stepTitle.type(data.stepTitle);
    await this.enterMessageTextBox.click();
    await this.enterMessageTextBox.type(data.message);
    await this.saveStepButton.click();
  }

  async updateSequenceData(data: { updatedSubtitle: string; updatedMessage: string }) {
    await this.stepTitle.type(data.updatedSubtitle);
    await this.enterMessageTextBox.type(data.updatedMessage);
    await this.saveStepButton.click();
  }

  async getSequencesStepData() {
    return await this.getSequencesStep.innerText();
  }

  async clickOnAllSequenceButton() {
    await this.allSequencesButton.click();
    await this.page.waitForTimeout(3000);
  }

  async getAllSequencesData() {
    return await this.getAllSequences.innerText();
  }

  async clickOnEditSequencesButton() {
    await this.editSequenceButton.click();
  }

  async UpdateSequences(data: { updatedTitle: string; updatedDescription: string }) {
    await this.settingButton.click();
    await this.titleTextBox.clear();
    await this.descriptionTextBox.clear();
    await this.titleTextBox.type(data.updatedTitle);
    await this.descriptionTextBox.type(data.updatedDescription);
  }

  async deleteSequence() {
    await this.settingButton.click();
    await this.deleteSequenceButton.click();
    await this.page.waitForTimeout(4000);
  }

  async searchTheCreatedSequence(data: { updatedTitle: string }) {
    await this.searchSequenceButton.type(data.updatedTitle);
    await this.page.waitForTimeout(1500);
  }

  async searchTheInvalidSequences() {
    await this.searchSequenceButton.type('jhksjfhsdkfdskhfsdfsd');
    await this.page.waitForTimeout(1500);
  }
}
