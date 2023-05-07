import { Response } from "~/utils/types";

export async function getAllPrograms() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/programs/get-all`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch all programs");
    }

    const data = (await res.json()) as Response<
      {
        name: string;
        description: string;
      }[]
    >;

    if (!data) {
      throw new Error("Failed to parse all programs");
    }

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!data.data) {
      throw new Error("Failed retrieve all programs");
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }

  return [];
}
