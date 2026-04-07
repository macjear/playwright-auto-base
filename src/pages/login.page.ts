import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton   = page.locator('#btn-login');
    this.errorMessage  = page.locator('.text-danger').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/profile.php#login');
    await this.waitForLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10_000 });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async assertOnAppointmentPage(): Promise<void> {
    await this.page.waitForURL(/.*#appointment/, { timeout: 15_000 });
  }
}