import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { AppointmentPage } from "../../pages/appointment.page";
import { ConfirmationPage } from "../../pages/confirmation.page";

// No module-level variables — page objects are stored in the scenario context
// and retrieved per-step, preventing cross-scenario contamination.

function getAppointmentPage(world: CustomWorld): AppointmentPage {
  let page = world.getContext<AppointmentPage>('appointmentPage');
  if (!page) {
    page = new AppointmentPage(world.page);
    world.setContext('appointmentPage', page);
  }
  return page;
}

When("I select the {string} facility",
  async function (this: CustomWorld, facilityName: string) {
    await getAppointmentPage(this).selectFacility(facilityName);
  }
);

When("I check the {string} checkbox",
  async function (this: CustomWorld, _checkboxLabel: string) {
    await getAppointmentPage(this).checkReadmission();
  }
);

When("I select {string} from the {string} options",
  async function (this: CustomWorld, optionValue: string, _dropdownLabel: string) {
    await getAppointmentPage(this).selectHealthcareProgram(optionValue);
  }
);

When("I enter {string} as the visit date",
  async function (this: CustomWorld, date: string) {
    await getAppointmentPage(this).enterVisitDate(date);
  }
);

When("I enter {string} in the comment box",
  async function (this: CustomWorld, comment: string) {
    await getAppointmentPage(this).enterComment(comment);
  }
);

When("I click the {string} button",
  async function (this: CustomWorld, _buttonText: string) {
    await getAppointmentPage(this).clickBookAppointment();
  }
);

Then("I should still be on the appointment page",
  async function (this: CustomWorld) {
    const url = this.page.url();
    if (!url.includes('#appointment')) {
      throw new Error(`Expected to remain on appointment page but navigated to: ${url}`);
    }
  }
);

Then("I should see an appointment confirmation page",
  async function (this: CustomWorld) {
    const confirmationPage = new ConfirmationPage(this.page);
    await confirmationPage.assertIsVisible();
  }
);

Then("I should see a confirmation message {string}",
  async function (this: CustomWorld, _expectedMessage: string) {
    const confirmationPage = new ConfirmationPage(this.page);
    await confirmationPage.assertIsVisible();
  }
);

Then("I should see an error message from appointment page as {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    await getAppointmentPage(this).assertErrorMessage(expectedMessage);
  }
);
