import * as fs from "fs";
import * as path from "path";

/**
 * FileUtil — Read/write test resource files.
 */
export class FileUtil {
  /**
   * Read a JSON file relative to project root and return parsed object.
   */
  static readJson<T>(relativePath: string): T {
    const absolute = path.resolve(process.cwd(), relativePath);
    const raw = fs.readFileSync(absolute, 'utf-8');
    return JSON.parse(raw) as T;
  }

  /**
   * Write content to a file, creating parent directories if needed.
   */
  static write(relativePath: string, content: string): void {
    const absolute = path.resolve(process.cwd(), relativePath);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, content, 'utf-8');
  }

  static exists(relativePath: string): boolean {
    return fs.existsSync(path.resolve(process.cwd(), relativePath));
  }
}
