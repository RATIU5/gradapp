"use client";

import { addFacultySchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FacultyWithoutPresent, Program } from "@/lib/types";
import { addNewFaculty$, getAllPrograms$ } from "@/lib/queries";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

const AddFacultyForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isLoading, isError, data, error } = useQuery<Program[]>({
    queryKey: ["attendees"],
    queryFn: getAllPrograms$,
  });
  const newStudentMutation = useMutation({
    mutationFn: (faculty: FacultyWithoutPresent) => addNewFaculty$(faculty),
    onError: (error: any) => {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error adding the student",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Student added successfully",
      });
      await queryClient.refetchQueries({ stale: true });
    },
  });
  const form = useForm<z.infer<typeof addFacultySchema>>({
    resolver: zodResolver(addFacultySchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      programid: 1,
    },
  });

  function submitHandler(values: z.infer<typeof addFacultySchema>) {
    const faculty = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      programid: values.programid,
    };
    newStudentMutation.mutate(faculty);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 w-[20rem] flex flex-col flex-wrap"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="w-[20rem]">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Homer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="w-[20rem]">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Simpson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[20rem]">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hsimpson@website.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="programid"
          render={({ field }) => (
            <FormItem className="w-[20rem]">
              <FormLabel>Program</FormLabel>
              <Select onValueChange={(v) => field.onChange(parseInt(v))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoading ? "Loading..." : isError ? "Error" : "Select"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-80">
                  {data
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((program) => (
                      <SelectItem key={program.id} value={program.id + ""}>
                        {program.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-[20rem]"
          disabled={newStudentMutation.isLoading}
        >
          {newStudentMutation.isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            "Add Student"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddFacultyForm;
