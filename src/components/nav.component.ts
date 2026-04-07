import { Page, Locator } from "@playwright/test";

/**
 * NavComponent — Sidebar navigation links present on authenticated pages.
 */
export class NavComponent {
  readonly homeLink: Locator;
  readonly historyLink: Locator;
  readonly profileLink: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.homeLink    = page.locator('a[href="./"]').filter({ hasText: 'Go to Homepage' });
    this.historyLink = page.locator('a[href="#history"]');
    this.profileLink = page.locator('a[href="#profile"]');
    this.logoutLink  = page.locator('a[href="logout.php"]');
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }

  async isVisible(): Promise<boolean> {
    return this.logoutLink.isVisible();
  }
}
