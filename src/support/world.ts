import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, APIRequestContext, APIResponse } from "playwright";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  response?: APIResponse;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);