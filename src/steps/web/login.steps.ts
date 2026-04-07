import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { LoginPage } from "../../pages/login.page";

// No module-level page object variables — each scenario gets its own instance
// via the CustomWorld, eliminating race conditions in parallel runs.

Given("I open the login page", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  this.setContext('loginPage', loginPage);
  await loginPage.goto();
});

When(
  "I login with username {string} and password {string}",
  async function (this: CustomWorld, username: string, password: string) {
    const loginPage = this.getContext<LoginPage>('loginPage') ?? new LoginPage(this.page);
    await loginPage.login(username, password);
  }
);

Then("I should see the appointment page", async function (this: CustomWorld) {
  const loginPage = this.getContext<LoginPage>('loginPage') ?? new LoginPage(this.page);
  await loginPage.assertOnAppointmentPage();
});

Then(
  "I should see an error message {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    const loginPage = this.getContext<LoginPage>('loginPage') ?? new LoginPage(this.page);
    await loginPage.assertErrorMessage(expectedMessage);
  }
);