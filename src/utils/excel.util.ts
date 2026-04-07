// Install when needed: npm install --save-dev xlsx
import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type XlsxModule = any;

/**
 * ExcelUtil — Read test data from Excel workbooks.
 * Install: npm install --save-dev xlsx
 */
export class ExcelUtil {
  private static getXlsx(): XlsxModule {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('xlsx');
    } catch {
      throw new Error('ExcelUtil: xlsx package is not installed. Run: npm install --save-dev xlsx');
    }
  }

  /**
   * Read all rows from a named sheet in an Excel file.
   * Returns an array of plain objects keyed by column header.
   */
  static readSheet<T extends Record<string, unknown>>(
    filePath: string,
    sheetName: string
  ): T[] {
    const xlsx = ExcelUtil.getXlsx();
    const absolute = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(absolute)) {
      throw new Error(`ExcelUtil: file not found: ${absolute}`);
    }
    const workbook = xlsx.readFile(absolute);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(
        `ExcelUtil: sheet "${sheetName}" not found in "${filePath}". Available: ${workbook.SheetNames.join(', ')}`
      );
    }
    return xlsx.utils.sheet_to_json(sheet) as T[];
  }

  /**
   * Write rows to an Excel file, creating it if it does not exist.
   */
  static write<T extends Record<string, unknown>>(
    filePath: string,
    sheetName: string,
    rows: T[]
  ): void {
    const xlsx = ExcelUtil.getXlsx();
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);
    const absolute = path.resolve(process.cwd(), filePath);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    xlsx.writeFile(workbook, absolute);
  }
}
