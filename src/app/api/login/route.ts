import { signIn } from "next-auth/react";

export async function POST(req, res) {
  const { callbackUrl } = req.body;

  const response = await signIn("google", { callbackUrl }, req.body);

  // If the signIn call was unsuccessful, the response will be undefined
  if (!response) {
    res.status(400).json({ error: "Sign in failed" });
    return;
  }

  // If everything went well, redirect the user to the callbackUrl
  res.status(200).json({ url: callbackUrl });
}
