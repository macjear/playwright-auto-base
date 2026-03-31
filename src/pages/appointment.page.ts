import { Page } from "playwright";

export class AppointmentPage {
  constructor(private page: Page) {}

  async selectFacility(facilityName: string) {
    await this.page.selectOption("#combo_facility", facilityName);
  }

  async checkCheckbox(checkboxLabel: string) {
    const checkbox = this.page.locator(`input[type="checkbox"]`).filter({ hasText: checkboxLabel });
    await checkbox.click();
  }

  async selectOption(dropdownId: string, optionValue: string) {
    const radio = this.page.locator(`input[type="radio"][value="${optionValue}"]`);
    await radio.isVisible()
    await radio.click();
  }

  async enterVisitDate(date: string) {
    const dateField = this.page.locator("#txt_visit_date");
    await dateField.click();
    await dateField.fill(date);
    await this.page.waitForSelector(".datepicker.datepicker-dropdown", { timeout: 5000 });
    
    // Parse the date (format: MM/DD/YYYY)
    const [month, day, year] = date.split("/");
    const dateNum = parseInt(day);
    const dayCell = this.page.locator(`.datepicker-days td.day:not(.old):not(.new):has-text("${dateNum}")`).first();
    await dayCell.click();
    await dateField.press("Tab");
    await this.page.waitForSelector(".datepicker.datepicker-dropdown", { state: "hidden", timeout: 5000 });
  }

  async enterComment(comment: string) {
    await this.page.fill("#txt_comment", comment);
  }

  async clickButton(buttonText: string) {
    await this.page.click(`button:has-text("${buttonText}")`);
  }

  async getConfirmationMessage(): Promise<string> {
    const message = await this.page.locator(".container .alert").textContent();
    return message || "";
  }

  async getErrorMessage(): Promise<string> {
    const message = await this.page.locator(".text-danger").textContent();
    return message || "";
  }

  async isConfirmationPageVisible(): Promise<boolean> {
    try {
      // Wait for navigation to the confirmation page URL
      await this.page.waitForURL(/appointment\.php#summary/, { timeout: 5000 });
      
      // Then verify confirmation elements are visible
      const confirmationHeading = this.page.locator("h2:has-text('Appointment Confirmation')");
      const facilityElement = this.page.locator("#facility");
      const visitDateElement = this.page.locator("#visit_date");

      await confirmationHeading.waitFor({ timeout: 5000 });
      await facilityElement.waitFor({ timeout: 5000 });
      await visitDateElement.waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
