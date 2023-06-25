import {
  Person,
  PersonWithProgram,
  ProgramWithPeople,
  Response,
} from "~/utils/types";

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

    const data = (await res.json()) as Response<Person[]>;

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
      throw new Error("Network error while fetching programs with people");
    }

    const data = (await res.json()) as Response<ProgramWithPeople[]>;

    if (!data.data) return;

    if (!data) {
      throw new Error("Failed to parse all programs with people");
    }

    if (!data.data) {
      throw new Error("Failed retrieve all programs with people");
    }

    const programsWithPeople = data.data;
    const output: PersonWithProgram[] = [];

    for (const program of programsWithPeople) {
      for (const person of program.people) {
        output.push({ ...person, programName: program.name });
      }
    }

    return output;
  } catch (error) {
    throw error;
  }
}

export async function getAllPresentPeopleWithPrograms() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL as string
      }/program-people/get-all-present`
    );

    if (!res.ok) {
      throw new Error(
        "Network error while fetching programs with people present"
      );
    }

    const data = (await res.json()) as Response<ProgramWithPeople[]>;

    if (!data.data) return;

    if (!data) {
      throw new Error("Failed to parse all programs with people present");
    }

    if (!data.data) {
      throw new Error("Failed retrieve all programs with people present");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllNotPresentPeopleWithPrograms() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL as string
      }/program-people/get-all-not-present`
    );

    if (!res.ok) {
      throw new Error(
        "Network error while fetching programs with people not present"
      );
    }

    const data = (await res.json()) as Response<ProgramWithPeople[]>;

    if (!data.data) return;

    if (!data) {
      throw new Error("Failed to parse all programs with people not present");
    }

    if (!data.data) {
      throw new Error("Failed retrieve all programs with people not present");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function setPersonPresent(id: number, present: boolean) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/people/set-present`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          present,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Network error while setting people present");
    }
  } catch (error) {
    throw error;
  }
}
