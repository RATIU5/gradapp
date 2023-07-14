import * as z from "zod";

export const addStudentSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First name must be less than 50 characters.",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name must be less than 50 characters.",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  programid: z.number().positive(), // check to make sure the program exists
  platinum: z.boolean(),
  highschool: z.boolean(),
  studentfaculty: z.boolean(), // check to make sure the person type exists
  present: z.boolean(),
});
