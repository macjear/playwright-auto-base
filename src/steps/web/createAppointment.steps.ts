import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import assert from "assert";
import { AppointmentPage } from "../../pages/appointment.page";

let appointmentPage: AppointmentPage;

When("I select the {string} facility",
  async function (this: CustomWorld, facilityName: string) {
    appointmentPage = new AppointmentPage(this.page);
    await appointmentPage.selectFacility(facilityName);
  }
);

When("I check the {string} checkbox",
  async function (this: CustomWorld, checkboxLabel: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    await this.page.click(`input[type="checkbox"][name="hospital_readmission"]`);
  }
);

When("I select {string} from the {string} options",
  async function (this: CustomWorld, optionValue: string, dropdownLabel: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    const dropdownMap: { [key: string]: string } = {
      "Healthcare Program": "combo_program",
    };
    const dropdownId = dropdownMap[dropdownLabel] || dropdownLabel;
    await appointmentPage.selectOption(dropdownId, optionValue);
  }
);

When("I enter {string} as the visit date",
  async function (this: CustomWorld, date: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    await appointmentPage.enterVisitDate(date);
  }
);

When( "I enter {string} in the comment box",
  async function (this: CustomWorld, comment: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    await appointmentPage.enterComment(comment);
  }
);

When( "I click the {string} button",
  async function (this: CustomWorld, buttonText: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    await this.page.click(`button:has-text("${buttonText}")`);
  }
);

Then("I should see a confirmation message {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    const message = await appointmentPage.getConfirmationMessage();
    assert.ok(
      message.includes(expectedMessage),
      `Expected message "${expectedMessage}" but got "${message}"`
    );
  }
);

Then("I should see an error message from appointment page as {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    const message = await appointmentPage.getErrorMessage();
    assert.ok(
      message.includes(expectedMessage),
      `Expected error message "${expectedMessage}" but got "${message}"`
    );
  }
);

Then( "I should see an appointment confirmation page",
  async function (this: CustomWorld) {
    appointmentPage = appointmentPage || new AppointmentPage(this.page);
    const isVisible = await appointmentPage.isConfirmationPageVisible();
    assert.ok(isVisible, "Appointment confirmation page is not visible");
  }
);
