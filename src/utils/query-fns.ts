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

export async function getAllPeople() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/people/get-all`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch all people");
    }

    const data = (await res.json()) as Response<
      {
        id: number;
        firstname: string;
        lastname: string;
        programid: number;
        email: string;
        platinum: boolean;
        highschool: boolean;
        persontype: number;
        present: boolean;
      }[]
    >;

    if (!data) {
      throw new Error("Failed to parse all people");
    }

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!data.data) {
      throw new Error("Failed retrieve all people");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProgramsAndPeople() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/program-people/get-all`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch all people");
    }

    const data = (await res.json()) as Response<
      {
        id: number;
        name: string;
        people: {
          id: number;
          firstname: string;
          lastname: string;
          programid: number;
          email: string;
          platinum: boolean;
          highschool: boolean;
          persontype: number;
          present: boolean;
        }[];
      }[]
    >;

    if (!data.data) return;

    if (!data) {
      throw new Error("Failed to parse all people");
    }

    if (!data.data) {
      throw new Error("Failed retrieve all people");
    }

    const programsWithPeople = data.data;
    const output = [];

    for (const program of programsWithPeople) {
      for (const person of program.people) {
        output.push({
          id: person.id,
          firstname: person.firstname,
          lastname: person.lastname,
          programid: person.programid,
          email: person.email,
          platinum: person.platinum,
          highschool: person.highschool,
          persontype: person.persontype,
          present: person.present,
          programName: program.name,
        });
      }
    }

    return output;
  } catch (error) {
    throw error;
  }
}
