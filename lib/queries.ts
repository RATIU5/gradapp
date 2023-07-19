import { parseCSV$ } from "./csv-parser";
import { FacultyWithoutPresent, Student, StudentWithoutPresent } from "./types";

export async function getAllAttendees$() {
  const result = await fetch("/api/db/people-with-programs");
  if (!result.ok) throw new Error("Could not fetch attendees");
  const { data } = await result.json();
  if (!data) throw new Error("No data found");
  return data;
}

export async function setAttendeePresent$(id: number, present: boolean) {
  const result = await fetch(`/api/db/people/set-present/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ present }),
  });
  if (!result.ok) throw new Error("Could not update attendee");
}

export async function getAttendeesPresent$() {
  const result = await fetch("/api/db/people/present-students");
  if (!result.ok) throw new Error("Could not fetch attendees");
  const { data } = await result.json();
  if (!data) throw new Error("No attendees found");
  return data;
}

export async function getAllPrograms$() {
  const result = await fetch("/api/db/programs");
  if (!result.ok) throw new Error("Could not fetch programs");
  const { data } = await result.json();
  if (!data) throw new Error("No programs found");
  return data;
}

export async function addNewStudent$(student: StudentWithoutPresent) {
  const { studentfaculty, ...rest } = student;
  const person = {
    ...rest,
    persontype: studentfaculty ? 3 : 2,
    present: false,
  };
  const result = await fetch("/api/db/people", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([person]),
  });
  if (!result.ok) throw new Error("Could not add student");
}

export async function addNewStudents$(peopleCSV: string) {
  const students = parseCSV$(peopleCSV);
  const people = students.map(({ studentfaculty, ...rest }) => {
    return {
      ...rest,
      persontype: studentfaculty ? 3 : 2,
      present: false,
    };
  });
  const result = await fetch("/api/db/people", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(people),
  });
  if (!result.ok) throw new Error("Could not add students");
}

export async function addNewFaculty$(faculty: FacultyWithoutPresent) {
  const person = {
    ...faculty,
    persontype: 1,
    present: false,
    highschool: false,
    platinum: false,
  };
  const result = await fetch("/api/db/people", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([person]),
  });
  if (!result.ok) throw new Error("Could not add faculty");
}
