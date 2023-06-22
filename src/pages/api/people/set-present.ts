import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await supabase
    .from("people")
    .update({ present: req.body.present })
    .eq("id", req.body.id);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }
  return res.status(200).json({ data: result.data });
}
