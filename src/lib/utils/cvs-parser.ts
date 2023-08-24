import { z } from 'zod';

type CSVOptions = {
  separator?: string;
  headerNames: string[];
  columnTypes: (z.ZodString | z.ZodNumber | z.ZodBoolean)[];
};

export function parseCSV$(strData: string, options: CSVOptions) {
  const separator = options.separator || ',';
  const rows = strData.split('\n');

  try {
    // Headers sizes match
    const headers = rows[0].split(separator);
    if (headers.length !== options.headerNames.length) {
      throw new Error(
        `CSV must have ${options.headerNames.length} columns: '${options.headerNames.join(
          ','
        )}'\nfound: ${headers.join(',')}`
      );
    }

    const headerDefinition = [...headers] as const;
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
      const row = rows[i].split(separator);
      if (row.length !== headers.length) {
        throw new Error(
          `CSV row ${i} has ${row.length} columns, but header has ${headers.length} columns`
        );
      }

      const obj: { [key: (typeof headerDefinition)[number]]: string } = {};
      // Row has valid values for each column
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const expectedType = options.columnTypes[j];
        try {
          expectedType.parse(cell);
        } catch (e) {
          throw new Error(
            `CSV row ${i} column ${j + 1} has invalid value: '${cell}'; expected ${expectedType._def.typeName
            }`
          );
        }
        obj[headers[j]] = cell;
      }

      arr.push(obj);
    }

    return arr;
  } catch (e) {
    throw new Error(`CSV parse error: ${(e as Error).message}`);
  }
}
