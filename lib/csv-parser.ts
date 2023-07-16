import { StudentWithoutPresent } from "./types";

type Header = keyof StudentWithoutPresent;

export function parseCSV$(strData: string) {
  let i = 0;
  const rows = strData.split("\n");
  const headers = rows[0].split(",") as Header[];
  const headerCount = headers.length;
  if (headerCount < 7 || headerCount > 8) {
    const hasComma = rows[0].includes(",");
    if (!hasComma) {
      throw new Error("CSV must be separated by commas");
    } else {
      throw new Error(
        "CSV must have 8 columns: 'firstname,lastname,email,programid,platinum,highschool,studentfaculty'\nfound: " +
          rows[0]
      );
    }
  }

  const firstNameHeader = headers[0];
  const lastNameHeader = headers[1];
  const emailHeader = headers[2];
  const programIdHeader = headers[3];
  const platinumHeader = headers[4];
  const highSchoolHeader = headers[5];
  // Row 7 has a '\r' at the end of it, so we need to slice it off
  const studentFacultyHeader = headers[6].slice(0, headers[6].length - 1);

  if (firstNameHeader !== "firstname") {
    throw new Error(
      `CSV must have 'firstname' as the first column; found: '${firstNameHeader}' instead`
    );
  } else if (lastNameHeader !== "lastname") {
    throw new Error(
      `CSV must have 'lastname' as the second column; found: '${lastNameHeader}' instead`
    );
  } else if (emailHeader !== "email") {
    throw new Error(
      `CSV must have 'email' as the third column; found: '${emailHeader}' instead`
    );
  } else if (programIdHeader !== "programid") {
    throw new Error(
      `CSV must have 'programid' as the fourth column; found: '${programIdHeader}' instead`
    );
  } else if (platinumHeader !== "platinum") {
    throw new Error(
      `CSV must have 'platinum' as the fifth column; found: '${platinumHeader}' instead`
    );
  } else if (highSchoolHeader !== "highschool") {
    throw new Error(
      `CSV must have 'highschool' as the sixth column; found: '${highSchoolHeader}' instead`
    );
  } else if (studentFacultyHeader !== "studentfaculty") {
    throw new Error(
      `CSV must have 'studentfaculty' as the seventh column; found: '${studentFacultyHeader}' instead`
    );
  }

  const data: StudentWithoutPresent[] = [];
  for (i = 1; i < rows.length; i++) {
    const row = rows[i].split(",") as string[];
    if (row.length !== headerCount) {
      throw new Error(
        `CSV row ${i} has ${row.length} columns, but header has ${headerCount} columns`
      );
    }

    const firstName = row[0];
    const lastName = row[1];
    const email = row[2];
    const programId = parseInt(row[3]);
    const platinum = row[4].toLowerCase();
    const highSchool = row[5].toLowerCase();
    // Row 7 has a '\r' at the end of it, so we need to slice it off,
    // but not for the last row
    let studentFaculty;
    if (i === rows.length - 1) {
      studentFaculty = row[6].toLowerCase();
    } else {
      studentFaculty = row[6].slice(0, row[6].length - 1).toLowerCase();
    }

    if (Number.isNaN(programId)) {
      throw new Error(
        `CSV row ${i} has invalid value for 'programid' column: '${programId}'; expected integer`
      );
    } else if (platinum !== "true" && platinum !== "false") {
      throw new Error(
        `CSV row ${i} has invalid value for 'platinum' column: '${row[4]}'; expected 'true' or 'false'`
      );
    } else if (highSchool !== "true" && highSchool !== "false") {
      throw new Error(
        `CSV row ${i} has invalid value for 'highschool' column: '${row[5]}'; expected 'true' or 'false'`
      );
    } else if (studentFaculty !== "true" && studentFaculty !== "false") {
      throw new Error(
        `CSV row ${i} has invalid value for 'studentfaculty' column: '${row[6]}'; expected 'true' or 'false'`
      );
    }

    const obj = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      programid: programId,
      platinum: platinum === "true",
      highschool: highSchool === "true",
      studentfaculty: studentFaculty === "true",
    };

    data.push(obj);
  }

  return data;
}
