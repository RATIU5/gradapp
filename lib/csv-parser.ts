import { Student } from "./types";

type Header = keyof Student;

export function parseCSV$(strData: string) {
  let i = 0;
  const rows = strData.split("\n");
  const headers = rows[0].split(",") as Header[];
  const headerCount = headers.length;
  if (headerCount < 8) {
    const hasComma = rows[0].includes(",");
    if (!hasComma) {
      throw new Error("CSV must be separated by commas");
    } else {
      throw new Error(
        "CSV must have 8 columns: 'firstname,lastname,email,programid,platinum,highschool,studentfaculty,present'"
      );
    }
  }

  const data: Student[] = [];
  for (i = 1; i < rows.length; i++) {
    const row = rows[i].split(",") as (string | number | boolean)[];
    if (row.length !== headerCount) {
      throw new Error(
        `CSV row ${i} has ${row.length} columns, but header has ${headerCount} columns`
      );
    }

    const obj: Student = {} as Student;
    for (let j = 0; j < headerCount; j++) {
      (obj as any)[header] = row[j];
    }
    data.push(obj);
  }
}
