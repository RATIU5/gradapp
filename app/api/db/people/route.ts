import supabase from "@/lib/db";
import { Student } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = (await req.json()) as Student[];
  const formattedObjects = body.map((person: Student) => {
    return {
      firstname: person.firstname,
      lastname: person.lastname,
      programid: person.programid,
      email: person.email,
      platinum: person.platinum,
      highschool: person.highschool,
      persontype: person.studentfaculty ? 3 : 2,
      present: false,
    };
  });

  const { data, error } = await supabase
    .from("people")
    .insert(formattedObjects)
    .select();
  if (error) return NextResponse.json({ data: error }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
};
