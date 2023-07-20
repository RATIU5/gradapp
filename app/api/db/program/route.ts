import supabase from "@/lib/db";
import { ProgramWithoutId } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = (await req.json()) as ProgramWithoutId[];

  const { data, error } = await supabase.from("programs").insert(body).select();
  if (error) return NextResponse.json({ data: error }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
};

export const fetchCache = "force-no-store";
