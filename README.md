# Playwright + Cucumber BDD - Test Automation Suite

> Base test automation framework written in TypeScript for testing the CURA Healthcare website.

**App Link:** https://katalon-demo-cura.herokuapp.com/

---

## Sample Test Report

![Allure Report Summary](/resources/image.png)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation |
| [Cucumber](https://cucumber.io/) | BDD / Gherkin scenarios |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [Allure](https://allurereport.org/) | HTML test reporting |
| [pg](https://node-postgres.com/) | PostgreSQL client |
| [oracledb](https://oracle.github.io/node-oracledb/) | Oracle DB client |
| [AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) | S3 & DynamoDB clients |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install

# 3. Set up environment variables
cp .env.example .env   # then fill in your values

# 4. Run tests
npm test
```

> Requires **Node.js 18+** and **Allure CLI** (`npm i -g allure-commandline`)

---

## Running Tests

```bash
npm test                # all tests
npm run test:web        # @web scenarios
npm run test:api        # @api scenarios
npm run test:smoke      # @smoke scenarios
npm run test:headed     # visible browser
npm run test:ci         # headless + retries (for CI)
```

---

## Allure Reports

```bash
npm run allure:generate   # build report from results
npm run allure:open       # open static report
npm run allure:serve      # serve live report in browser
```

---

## Project Structure

```
src/
├── features/        # Gherkin .feature files (web/ + api/)
├── steps/           # Step definitions (web/ + api/)
├── pages/           # Page Object Model
├── components/      # Reusable UI components
├── support/         # Hooks & Cucumber World
├── models/          # Request/response interfaces
├── utils/           # Helpers (S3, Excel, file, JSON)
├── db/              # DB connections (Postgres, Oracle, DynamoDB, S3)
├── constants/       # App-wide constants
└── data/            # External test data files
```

---

## Environment Variables

Create a `.env` file at the project root. **Never commit it.**

### General

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://katalon-demo-cura.herokuapp.com` | App under test |
| `CI` | `false` | Headless mode + retries |

### PostgreSQL

| Variable | Description |
|----------|-------------|
| `DG_POSTGRE_DB_URL` | Connection string |
| `DG_POSTGRE_DB_USER` | Username |
| `DG_POSTGRE_DB_PASSWORD` | Password |

### Oracle

| Variable | Description |
|----------|-------------|
| `DG_ORACLE_DB_URL` | Connect string (`host:port/service`) |
| `DG_ORACLE_DB_USER` | Username |
| `DG_ORACLE_DB_PASSWORD` | Password |

### AWS (S3 / DynamoDB)

| Variable | Description |
|----------|-------------|
| `AWS_AC_REGION` | AWS region (e.g. `us-east-1`) |
| `AWS_LOGIN_TYPE` | `role` for STS assumption, otherwise default chain |
| `AWS_ACCOUNT_ID` | AWS account ID |
| `AWS_CURRENT_ROLE` | IAM role name (when `AWS_LOGIN_TYPE=role`) |
| `AWS_SESSION_NAME` | STS session name (when `AWS_LOGIN_TYPE=role`) |
| `DYNAMODB_AC_ENDPOINT` | DynamoDB endpoint URL |

---

## Writing a Test

**1. Feature file** — `src/features/web/myFeature.feature`
```gherkin
@web
Feature: My Feature

  Scenario: Example scenario
    Given I open the login page
    When I login with "John Doe" and "password"
    Then I should see the appointment page
```

**2. Step definitions** — `src/steps/web/myFeature.steps.ts`
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

Given('I open the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});
```

**3. Page Object** — `src/pages/login.page.ts`
```typescript
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByTestId('txt-username');
  readonly passwordInput = this.page.getByTestId('txt-password');
  readonly loginButton   = this.page.getByTestId('btn-login');
}
```

---

## Key Features

- **BDD with Gherkin** — Human-readable `.feature` files using Given/When/Then syntax
- **Page Object Model (POM)** — Encapsulated page interactions in typed Page classes
- **Component Object Model (COM)** — Reusable UI components shared across pages
- **Multi-browser** — Chromium, Firefox, and WebKit (Safari) via Playwright projects
- **Web & API testing** — UI and API test scenarios in a single framework
- **Database support** — Built-in helpers for PostgreSQL, Oracle, DynamoDB, and S3
- **Allure reporting** — Step-level detail, test history, retries, and failure attachments
- **Tagged execution** — Run subsets with `@smoke`, `@web`, `@api`, or any custom tag
- **Failure artifacts** — Screenshots and video automatically captured on failure
- **CI-ready** — Headless mode, auto-retry, and `cross-env` for cross-platform env vars
