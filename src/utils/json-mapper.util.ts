/**
 * JsonMapper — Maps raw JSON data to typed models.
 * Extend with domain-specific mappers as needed.
 */
export class JsonMapper {
  /**
   * Safely maps a plain object to a typed shape.
   * Throws if any required keys are missing.
   */
  static map<T>(data: Record<string, unknown>, requiredKeys: (keyof T)[]): T {
    for (const key of requiredKeys) {
      if (!(key as string in data)) {
        throw new Error(`JsonMapper: missing required key "${String(key)}" in source object`);
      }
    }
    return data as unknown as T;
  }

  static fromJson<T>(jsonString: string): T {
    try {
      return JSON.parse(jsonString) as T;
    } catch (err) {
      throw new Error(`JsonMapper: failed to parse JSON: ${(err as Error).message}`);
    }
  }
}
