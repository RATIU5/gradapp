import supabase from "@/lib/db";
import { PersonWithoutId } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = (await req.json()) as PersonWithoutId[];
  const formattedObjects = body.map((person: PersonWithoutId) => {
    return {
      firstname: person.firstname,
      lastname: person.lastname,
      programid: person.programid,
      email: person.email,
      platinum: person.platinum,
      highschool: person.highschool,
      persontype: person.persontype,
      present: person.present,
    };
  });

  const { data, error } = await supabase
    .from("people")
    .insert(formattedObjects)
    .select();
  if (error) return NextResponse.json({ data: error }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
};

export const fetchCache = "force-no-store";
