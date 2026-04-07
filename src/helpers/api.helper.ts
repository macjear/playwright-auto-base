import { APIRequestContext, APIResponse } from "playwright";

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * ApiHelper — Wraps Playwright's APIRequestContext with typed convenience methods.
 * Intended to be used in step definitions via `this.apiContext`.
 */
export class ApiHelper {
  constructor(private readonly context: APIRequestContext) {}

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await this.context.get(endpoint, {
      headers: options?.headers,
      params: options?.params
    });
    await assertOk(response, 'GET', endpoint);
    return response.json() as Promise<T>;
  }

  async post<T>(endpoint: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    const response = await this.context.post(endpoint, {
      data: body,
      headers: options?.headers
    });
    await assertOk(response, 'POST', endpoint);
    return response.json() as Promise<T>;
  }

  async put<T>(endpoint: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    const response = await this.context.put(endpoint, {
      data: body,
      headers: options?.headers
    });
    await assertOk(response, 'PUT', endpoint);
    return response.json() as Promise<T>;
  }

  async delete(endpoint: string, options?: ApiRequestOptions): Promise<void> {
    const response = await this.context.delete(endpoint, {
      headers: options?.headers
    });
    await assertOk(response, 'DELETE', endpoint);
  }

  async getRaw(endpoint: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.context.get(endpoint, {
      headers: options?.headers,
      params: options?.params
    });
  }
}

async function assertOk(response: APIResponse, method: string, endpoint: string): Promise<void> {
  if (!response.ok()) {
    const body = await response.text().catch(() => '(no body)');
    throw new Error(
      `API ${method} ${endpoint} failed with status ${response.status()}: ${body}`
    );
  }
}
