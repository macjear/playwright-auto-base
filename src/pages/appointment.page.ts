import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class AppointmentPage extends BasePage {
  readonly facilityDropdown: Locator;
  readonly readmissionCheckbox: Locator;
  readonly visitDateInput: Locator;
  readonly commentInput: Locator;
  readonly bookButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.facilityDropdown    = page.locator('#combo_facility');
    this.readmissionCheckbox = page.locator('input[name="hospital_readmission"]');
    this.visitDateInput      = page.locator('#txt_visit_date');
    this.commentInput        = page.locator('#txt_comment');
    this.bookButton          = page.locator('button:has-text("Book Appointment")');
    this.errorMessage        = page.locator('.text-danger').first();
  }

  async selectFacility(facilityName: string): Promise<void> {
    await this.facilityDropdown.selectOption({ label: facilityName });
  }

  async checkReadmission(): Promise<void> {
    if (!(await this.readmissionCheckbox.isChecked())) {
      await this.readmissionCheckbox.check();
    }
  }

  async selectHealthcareProgram(programValue: string): Promise<void> {
    const radio = this.page.locator(`input[type="radio"][value="${programValue}"]`);
    await radio.check();
  }

  async enterVisitDate(date: string): Promise<void> {
    const [mm, dd, yyyy] = date.split('/').map(Number);

    // Click to open the datepicker
    await this.visitDateInput.click();
    const datepicker = this.page.locator('.datepicker.datepicker-dropdown');
    await datepicker.waitFor({ state: 'visible', timeout: 8_000 });

    // Navigate to the correct month by clicking Prev/Next
    const monthNames = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];
    for (let guard = 0; guard < 24; guard++) {
      const switchEl = datepicker.locator('.datepicker-days .datepicker-switch');
      const switchText = (await switchEl.textContent())?.trim() ?? '';
      // switchText looks like "April 2026"
      const parts = switchText.split(' ');
      const calMonth = monthNames.indexOf(parts[0]) + 1;
      const calYear  = parseInt(parts[1]);

      if (calMonth === mm && calYear === yyyy) break;

      const calDate    = new Date(calYear, calMonth - 1);
      const targetDate = new Date(yyyy, mm - 1);
      if (calDate < targetDate) {
        await datepicker.locator('.next').first().click();
      } else {
        await datepicker.locator('.prev').first().click();
      }
    }

    // Click the specific day (exclude days from adjacent months)
    const dayCell = datepicker
      .locator('.datepicker-days td.day:not(.old):not(.new)')
      .filter({ hasText: new RegExp(`^${dd}$`) })
      .first();
    await dayCell.click();

    // Wait for datepicker to close
    await datepicker.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
  }

  async enterComment(comment: string): Promise<void> {
    await this.commentInput.fill(comment);
  }

  async clickBookAppointment(): Promise<void> {
    await this.bookButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10_000 });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
