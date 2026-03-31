import { Before, After, Status } from "@cucumber/cucumber";
import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

Before(async function () {
  console.log("Launching browser...");
  this.browser = await chromium.launch({
    headless: true,
    //slowMo: 500
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function ({ result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    const dir = "allure-results";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const safeName = pickle.name.replace(/[^a-zA-Z0-9-_]/g, "_");
    const filePath = path.join(dir, `${safeName}.png`);

    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});