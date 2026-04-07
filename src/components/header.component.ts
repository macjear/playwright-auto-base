import { Page, Locator } from "@playwright/test";

/**
 * HeaderComponent — Top-level header bar present on all pages.
 */
export class HeaderComponent {
  readonly logo: Locator;
  readonly pageTitle: Locator;
  readonly menuToggle: Locator;

  constructor(private readonly page: Page) {
    this.logo       = page.locator('.navbar-brand');
    this.pageTitle  = page.locator('h2.text-center').first();
    this.menuToggle = page.locator('.navbar-toggle');
  }

  async getTitle(): Promise<string> {
    return (await this.pageTitle.textContent())?.trim() ?? '';
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }
}
