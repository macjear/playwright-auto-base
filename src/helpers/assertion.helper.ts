import assert from "assert";

/**
 * AssertionHelper — Shared assertion utilities for step definitions.
 * Wraps Node assert with meaningful error messages.
 */
export class AssertionHelper {
  static includes(actual: string, expected: string): void {
    assert.ok(
      actual.includes(expected),
      `Expected string to include "${expected}" but got: "${actual}"`
    );
  }

  static equals<T>(actual: T, expected: T, message?: string): void {
    assert.strictEqual(
      actual,
      expected,
      message ?? `Expected "${expected}" but got "${actual}"`
    );
  }

  static isTrue(value: boolean, message?: string): void {
    assert.ok(value, message ?? 'Expected value to be true');
  }

  static isFalse(value: boolean, message?: string): void {
    assert.ok(!value, message ?? 'Expected value to be false');
  }

  static isNotEmpty(value: string, fieldName: string): void {
    assert.ok(
      value.trim().length > 0,
      `Expected "${fieldName}" to be non-empty but was empty`
    );
  }

  static statusCode(actual: number, expected: number): void {
    assert.strictEqual(
      actual,
      expected,
      `Expected HTTP status ${expected} but got ${actual}`
    );
  }
}
