import supabase from "@/lib/db";
import { Person } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { person: Person } }
) => {
  console.log(params);

  // const body = await req.json();
  // const { data, error } = await supabase
  //   .from("people")
  //   .update({ present: body.present })
  //   .eq("id", params.id)
  //   .select();
  // if (error) return NextResponse.json({ data: error }, { status: 500 });
  // return NextResponse.json({ data }, { status: 200 });
};
