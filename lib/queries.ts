export async function getAllAttendees() {
  const result = await fetch("/api/db/people-with-programs");
  if (!result.ok) throw new Error("Could not fetch attendees");
  const { data } = await result.json();
  if (!data) throw new Error("No data found");
  return data;
}
