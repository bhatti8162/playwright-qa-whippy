import { expect, Locator, Page } from '@playwright/test';
declare const global: {
  [key: string]: unknown;
};
export default class AutomationPo {
  readonly page: Page;
  readonly automationTab: Locator;
  readonly questionBotTab: Locator;
  readonly keywordList: Locator;
  readonly createKeyword: Locator;
  readonly createQuestion: Locator;
  readonly keywordInput: Locator;
  readonly addKeyword: Locator;
  readonly keywordResponse: Locator;
  readonly saveKeywordAutomation: Locator;
  readonly saveAutomatedResponse: Locator;

  readonly editKeyword: Locator;
  readonly editKeywordIcon: Locator;
  readonly editKeywordInput: Locator;
  readonly saveAction: Locator;
  readonly updateKeyword: Locator;
  readonly deleteKeyword: Locator;

  readonly questionInput: Locator;
  readonly questionMsgInput: Locator;
  readonly testQuestionBtn: Locator;
  readonly testQuestionInput: Locator;
  readonly testQuestionClose: Locator;
  readonly editQuestionBtn: Locator;
  readonly editQuestionMsgInput: Locator;
  readonly questionUpdateInput: Locator;
  readonly questionDeleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    global.textKeyword = String('test123');
    global.questionInputText = String('What is answer of 2+2');
    this.automationTab = page.locator("//div[text()='Automations']");
    this.questionBotTab = page.locator("//span[text()='Question Bot']");
    this.keywordList = page.locator("(//div[text()='Keywords'])[1]");
    this.createKeyword = page.locator("//button[text()='Create Keyword']");
    this.createQuestion = page.locator("(//button[text()='Create Question'])[1]");
    this.keywordInput = page.locator("(//div[@class=' css-hlgwow']//div)[2]");
    this.addKeyword = page.locator("//button[text()='Next - Add Action']");
    this.keywordResponse = page.locator("//p[@data-slate-node='element']");
    this.saveKeywordAutomation = page.locator(
      "//button[text()='Save Keyword Automation']"
    );
    this.saveAutomatedResponse = page.locator(
      "//button[text()='Save Automated Response']"
    );

    this.editKeyword = page
      .getByRole('row', { name: 'test123 Edit Keyword' })
      .first()
      .getByRole('button', { name: 'Edit Keyword' });
    this.editKeywordIcon = page.locator('.c-idvnTe').first();
    this.editKeywordInput = page.locator('.css-19bb58m').first();
    this.saveAction = page.getByText('Save Action');
    this.updateKeyword = page.locator("//button[text()='Update Keyword']");
    // this.deleteKeyword = page
    //   .getByRole('row', { name: 'test1234 Edit Keyword' })
    //   .getByRole('button')
    //   .nth(1)
    //   .last();
    this.deleteKeyword = page.locator(
      "tbody > tr:nth-child(2) button[type='button'] > button"
    );

    this.questionInput = page.locator(
      "//input[@placeholder='E.g. When are you open until?']"
    );
    this.questionMsgInput = page.locator("//p[@data-slate-node='element']");
    this.testQuestionBtn = page.locator("//button[text()='Test Questions']");
    this.testQuestionInput = page.locator("//p[@data-slate-node='element']");
    this.testQuestionClose = page.locator(
      "(//button[contains(@class,'c-idvnTe c-idvnTe-cRIXTU-size-2')])[1]"
    );
    this.editQuestionBtn = page.locator("//button[text()='Edit Question']");
    this.editQuestionMsgInput = page.locator("//p[text()='4']");
    // this.questionUpdateInput = page.locator("//input[@value='What is answer of 2+2']");
    this.questionUpdateInput = page.locator(
      "input[placeholder='When are you open until?']"
    );

    this.questionDeleteBtn = page.locator("(//button[@data-state='closed'])[3]");
  }

  async CrudForKeyword() {
    // create
    await this.automationTab.click();
    await this.createKeyword.click();
    await this.keywordInput.click();
    await this.page.keyboard.type(`${global.textKeyword}`);
    await this.page.keyboard.press('Enter');
    await this.addKeyword.click();
    await this.keywordResponse.click();
    await this.page.keyboard.type(`${global.textKeyword}`);
    await this.saveKeywordAutomation.click();
    await expect(this.page.getByText('Keyword created')).toBeVisible();
    await this.keywordList.click();
    //read
    await expect(this.page.getByText(`${global.textKeyword}`).first()).toBeVisible();

    //update
    // await this.editKeyword.click();
    // await this.editKeywordIcon.click();
    // await this.editKeywordInput.click();
    // await this.page.keyboard.press('Backspace');
    // await this.page.keyboard.type(`${global.textKeyword}` + 4);
    // await this.page.keyboard.press('Enter');
    // await this.saveAction.click();
    // await this.updateKeyword.click();
    // await expect(this.page.getByText('Keyword updated').nth(0)).toBeVisible();
    // await this.keywordList.click();
    // await expect(this.page.getByText(`${global.textKeyword}` + 4).first()).toBeVisible();

    // Delete
    await this.page.waitForLoadState();
    await expect(this.deleteKeyword).toBeVisible();
    await this.deleteKeyword.click({ force: true });
    await this.page.getByRole('button', { name: 'Yes, Delete Keyword' }).click();
    await expect(this.page.getByText('Keyword deleted')).toBeVisible();
  }

  async ValidateQuestionBot() {
    // create question bot
    await this.questionBotTab.click();
    await this.createQuestion.click();
    await this.questionInput.fill(`${global.questionInputText}`);
    await this.questionMsgInput.click();
    await this.page.keyboard.type('4');
    await this.saveAutomatedResponse.click();
    await expect(
      this.page.locator("//div[text()='Automated response created']")
    ).toBeVisible();

    // test question bot
    await this.testQuestionBtn.click();
    await this.testQuestionInput.click();
    await this.page.keyboard.type(`${global.questionInputText}`);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator("//p[text()='4']")).toBeVisible();
    await this.testQuestionClose.click();

    // update question bot
    await this.editQuestionBtn.nth(0).click();
    await this.page.waitForTimeout(3000);
    await this.questionUpdateInput.fill(global.questionInputText + '-1');
    await this.editQuestionMsgInput.click();
    await this.page.keyboard.type('3');
    await this.saveAutomatedResponse.click();
    await expect(
      this.page.locator("//div[text()='What is answer of 2+2-1']")
    ).toBeVisible();

    // Delete question bot
    await this.questionDeleteBtn.click();
    await this.page.click("//button[text()='Yes, Delete Automated Question']");
    await expect(
      this.page.locator("//div[text()='Automated question deleted']")
    ).toBeVisible();
  }
}
