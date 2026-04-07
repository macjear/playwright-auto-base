import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/header.component";
import { NavComponent } from "../components/nav.component";

/**
 * BasePage — All page objects extend this class.
 * Provides shared component objects (header, nav), navigation helpers,
 * and a consistent way to wait for pages to settle.
 */
export abstract class BasePage {
  readonly header: HeaderComponent;
  readonly nav: NavComponent;

  constructor(protected readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.nav    = new NavComponent(page);
  }

  /**
   * Wait for the network to settle and no spinners visible.
   * Override in specific pages for custom load conditions.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to a URL relative to baseURL set in the browser context.
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForLoad();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
