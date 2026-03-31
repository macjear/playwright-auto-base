import { Page } from "playwright";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
  }

  async login(username: string, password: string) {
    await this.page.fill("#txt-username", username);
    await this.page.fill("#txt-password", password);
    await this.page.click("#btn-login");
  }

  async getErrorMessage(): Promise<string> {
    const errorElement = await this.page.locator(".text-danger").first();
    const message = await errorElement.textContent();
    return message?.trim() || "";
  }
}