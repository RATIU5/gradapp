import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { data: arrivals, error } = await supabase
    .from("arrivals")
    .select("*")
    .is("present", false);
  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(200).json({ arrivals });
}
