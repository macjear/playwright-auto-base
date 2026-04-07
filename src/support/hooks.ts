import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, request } from "playwright";
import { CustomWorld } from "./world";

// Global timeout: 60s per step
setDefaultTimeout(60_000);

// Launch a single browser instance for the whole test run (shared across scenarios)
let globalBrowserPromise: ReturnType<typeof chromium.launch> | null = null;

BeforeAll(async function () {
  globalBrowserPromise = chromium.launch({
    headless: process.env.CI === 'true' || process.env.HEADLESS === 'true',
    slowMo: process.env.CI === 'true' ? 0 : 100
  });
});

AfterAll(async function () {
  const browser = await globalBrowserPromise;
  await browser?.close();
});

Before(async function (this: CustomWorld) {
  try {
    const browser = await globalBrowserPromise!;
    this.browser = browser;
    this.context = await browser.newContext({
      baseURL: this.env.baseUrl,
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();

    this.apiContext = await request.newContext({
      baseURL: this.env.apiUrl,
      extraHTTPHeaders: { 'Content-Type': 'application/json' }
    });

    this.scenarioContext = new Map();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await this.attach(`[SETUP FAILED] Before hook error: ${message}`, 'text/plain');
    throw error;
  }
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
      await this.attach(`Failure URL: ${this.page.url()}`, 'text/plain');
    } catch {
      // page may be closed/unavailable if Before hook failed
    }
  }

  await this.apiContext?.dispose();
  await this.page?.close();
  await this.context?.close();
});