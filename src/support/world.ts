import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, APIRequestContext, APIResponse } from "playwright";
import { config, EnvironmentConfig } from "../../config/environments";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  response?: APIResponse;

  readonly env: EnvironmentConfig = config;

  // Scenario-scoped store for passing data between steps
  scenarioContext: Map<string, unknown> = new Map();

  constructor(options: IWorldOptions) {
    super(options);
  }

  getContext<T>(key: string): T {
    return this.scenarioContext.get(key) as T;
  }

  setContext<T>(key: string, value: T): void {
    this.scenarioContext.set(key, value);
  }
}

setWorldConstructor(CustomWorld);