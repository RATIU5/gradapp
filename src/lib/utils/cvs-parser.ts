import { z } from 'zod';

type CSVOptions = {
  separator?: string;
  headerNames: string[];
  columnTypes: z.ZodType<any>[];
};

export function parseCSV$(strData: string, options: CSVOptions) {
  options.columnTypes.forEach((type, index) => {
    if (typeof type.parse !== 'function') {
      console.error(`Invalid Zod type at columnTypes index ${index}`);
      throw new Error("One or more columnTypes aren't valid Zod types.");
    }
  });
  const separator = options.separator || ',';
  const rows = strData.split('\n').filter((row) => row.trim().length > 0);

  try {
    // Headers sizes match
    const headers = rows[0].split(separator).map((header) => header.trim());
    if (headers.length !== options.headerNames.length) {
      throw new Error(
        `CSV must have ${options.headerNames.length} columns: '${options.headerNames.join(
          ','
        )}'\nfound: ${headers.join(',')}`
      );
    }

    // Header names match
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const expectedHeader = options.headerNames[i];
      if (header !== expectedHeader) {
        throw new Error(
          `CSV must have '${expectedHeader}' as column ${i + 1}; found: '${header}' instead`
        );
      }
    }

    const arr = [];
    for (let i = 1; i < rows.length; i++) {
      // Row has same columns as header
      const row = rows[i].split(separator).map((cell) => cell.trim());
      if (row.length !== headers.length) {
        throw new Error(
          `CSV row ${i} has ${row.length} columns, but header has ${headers.length} columns`
        );
      }

      const obj: { [key: string]: any } = {}; // allowing any value type since some columns might not be strings after parsing
      // Row has valid values for each column
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const expectedType = options.columnTypes[j];

        if (!expectedType) {
          throw new Error(`Missing type definition for column ${headers[j]}`);
        }

        try {
          const parsedValue = expectedType.parse(cell);
          obj[headers[j]] = parsedValue; // Use parsed value, which might be transformed by Zod
        } catch (e) {
          if (e instanceof z.ZodError) {
            throw new Error(
              `CSV row ${i} column ${j + 1} has an invalid value: '${cell}'. ${e.message}`
            );
          }
          throw e; // rethrow other non-Zod errors
        }
      }

      arr.push(obj);
    }

    return arr;
  } catch (e) {
    throw new Error(`CSV parse error: ${(e as Error).message}`);
  }
}
