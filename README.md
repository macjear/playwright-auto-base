# Playwright + Cucumnber BDD - Test Automation Suite

Base test automation framework written in TypeScript for testing the CURA Healthcare website.

**Demo Application:** https://katalon-demo-cura.herokuapp.com/

## Sample Report

![allure_report_summary](/src/resources/image.png)

## Project Structure

```
src/
  features/
    web/
      login.feature              # Login test scenarios
      createAppointment.feature  # Appointment creation scenarios
    api/
      users.feature             # API test scenarios
  pages/
    login.page.ts               # Login page object model
    appointment.page.ts         # Appointment page object model
  steps/
    web/
      login.steps.ts            # Login step definitions
      createAppointment.steps.ts # Appointment step definitions
    api/
      users.steps.ts            # API step definitions
  support/
    hooks.ts                    # Test lifecycle hooks (before/after scenarios)
    world.ts                    # Cucumber world configuration
cucumber.js                     # Cucumber configuration
playwright.config.ts            # Playwright configuration
package.json                    # Project dependencies
tsconfig.json                   # TypeScript configuration
```

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run only web tests
npm test -- --tags "@web"

# Run only API tests
npm test -- --tags "@api"

# Run specific feature
npm test -- --grep "login"

```

## Tech Stack

- **Playwright** - Web browser automation
- **Cucumber** - BDD test framework
- **TypeScript** - Type-safe code
- **Allure** - Test reporting 
- **Node.js** - Runtime environment

## Test Execution Notes

- `@web` scenarios launch a browser in headed or headless mode (configured in playwright.config.ts)
- `@api` scenarios create a Playwright API request context
- Tests run sequentially by default
- Each scenario gets a fresh browser context for isolation
- Test results are captured before each scenario runs

## Dependencies

Key packages:
- `@playwright/test` - Playwright testing library
- `@cucumber/cucumber` - Cucumber BDD framework
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution (for Node.js)