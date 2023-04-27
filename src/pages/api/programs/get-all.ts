import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/server/db";
import type { Response } from "~/utils/types";

export default async function handler<T>(
  req: NextApiRequest,
  res: NextApiResponse<Response<T>>
) {
  const { data: programs, error } = await supabase.from("programs").select("*");
  if (error) {
    return res.status(500).json({ error, data: undefined });
  }
  return res.status(200).json({ data: programs, error: undefined });
}
