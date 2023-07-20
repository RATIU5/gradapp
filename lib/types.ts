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

export type PersonWithoutId = Omit<Person, "id">;

export type PersonWithProgram = Person & {
  programs: {
    name: string;
  };
};

export type Program = {
  id: number;
  name: string;
};

export type ProgramWithoutId = Omit<Program, "id">;

export type ProgramWithPeople = Program & {
  people: Person[];
};

export type Student = {
  firstname: string;
  lastname: string;
  programid: number;
  email: string;
  platinum: boolean;
  highschool: boolean;
  studentfaculty: boolean;
  present: boolean;
};

export type StudentWithoutPresent = Omit<Student, "present">;

export type Faculty = Omit<
  Student,
  "highschool" | "studentfaculty" | "platinum"
>;

export type FacultyWithoutPresent = Omit<
  Student,
  "highschool" | "studentfaculty" | "platinum" | "present"
>;
