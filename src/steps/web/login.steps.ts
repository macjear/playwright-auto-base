import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import assert from "assert";
import { LoginPage } from "../../pages/login.page";

let loginPage: LoginPage;

Given("I open the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When(
  "I login with username {string} and password {string}",
  async function (this: CustomWorld, username: string, password: string) {
    await loginPage.login(username, password);
  }
);

Then("I should see the appointment page", async function (this: CustomWorld) {
  const url = this.page.url();
  assert.ok(
    url.includes("#appointment"),
    `Expected to be on appointment page but got ${url}`
  );
});

Then('I should see an error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    const actualMessage = await loginPage.getErrorMessage();
    assert.ok(
      actualMessage.includes(expectedMessage),
      `Expected error message "${expectedMessage}" but got "${actualMessage}"`
    );
  }
);