import type { PostgrestError } from "@supabase/supabase-js";

type WithData<T> = {
  data: T;
  error: undefined;
};
type WithError<E> = { data: undefined; error: E };
export type Response<T> = WithData<T> | WithError<PostgrestError>;

export type ProgramWithPeople = {
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
};

export type Person = {
  id: number;
  firstname: string;
  lastname: string;
  programid: number;
  email: string;
  platinum: boolean;
  highschool: boolean;
  persontype: number;
  present: boolean;
};

export type PersonWithProgram = Person & { program: string };
