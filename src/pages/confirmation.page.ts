import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class ConfirmationPage extends BasePage {
  readonly heading: Locator;
  readonly facilityValue: Locator;
  readonly visitDateValue: Locator;
  readonly readmissionValue: Locator;
  readonly programValue: Locator;
  readonly commentValue: Locator;

  constructor(page: Page) {
    super(page);
    this.heading          = page.locator('h2:has-text("Appointment Confirmation")');
    this.facilityValue    = page.locator('#facility');
    this.visitDateValue   = page.locator('#visit_date');
    this.readmissionValue = page.locator('#hospital_readmission');
    this.programValue     = page.locator('#program');
    this.commentValue     = page.locator('#comment');
  }

  async waitForConfirmation(): Promise<void> {
    // CURA navigates to appointment.php with or without a hash fragment
    await this.page.waitForURL(/appointment\.php/, { timeout: 15_000 });
    await this.heading.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async assertIsVisible(): Promise<void> {
    await this.waitForConfirmation();
    await expect(this.heading).toBeVisible();
    await expect(this.facilityValue).toBeVisible();
    await expect(this.visitDateValue).toBeVisible();
  }

  async getFacility(): Promise<string> {
    return (await this.facilityValue.textContent())?.trim() ?? '';
  }

  async getVisitDate(): Promise<string> {
    return (await this.visitDateValue.textContent())?.trim() ?? '';
  }

  async assertFacility(expected: string): Promise<void> {
    await expect(this.facilityValue).toHaveText(expected);
  }
}
