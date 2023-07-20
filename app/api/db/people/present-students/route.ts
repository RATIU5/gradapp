import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { data, error } = await supabase
    .from("programs")
    .select(`name, people ( * )`)
    .is("people.present", true)
    .gt("people.persontype", 1);
  if (error) return NextResponse.json({ data: error }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
};

export const fetchCache = "force-no-store";
