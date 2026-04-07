import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { AssertionHelper } from "../../helpers/assertion.helper";
import { ContextKey } from "../../support/context-keys";

When("I send a GET request to {string}",
  async function (this: CustomWorld, endpoint: string) {
    const response = await this.apiContext.get(endpoint);
    this.setContext(ContextKey.LAST_API_RESPONSE, response);
    this.response = response;
  }
);

When("I send a POST request to {string} with body:",
  async function (this: CustomWorld, endpoint: string, body: string) {
    const response = await this.apiContext.post(endpoint, {
      data: JSON.parse(body)
    });
    this.setContext(ContextKey.LAST_API_RESPONSE, response);
    this.response = response;
  }
);

Then("the response status code should be {int}",
  async function (this: CustomWorld, expectedStatus: number) {
    const response = this.response;
    if (!response) throw new Error('No API response found. Did you send a request first?');
    AssertionHelper.statusCode(response.status(), expectedStatus);
  }
);

Then("the response body should contain {string}",
  async function (this: CustomWorld, expectedKey: string) {
    const response = this.response;
    if (!response) throw new Error('No API response found. Did you send a request first?');
    const body = await response.text();
    AssertionHelper.includes(body, expectedKey);
  }
);