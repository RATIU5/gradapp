import { parseCSV$ } from "./csv-parser";

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

export async function addNewStudents$(peopleCSV: string) {
  const students = parseCSV$(peopleCSV);
  const result = await fetch("/api/db/people", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(students),
  });
  if (!result.ok) throw new Error("Could not add students");
}
