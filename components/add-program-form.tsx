"use client";

import { addProgramSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramWithoutId } from "@/lib/types";
import { addNewProgram$ } from "@/lib/queries";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

const AddProgramForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const newProgramMutation = useMutation({
    mutationFn: (program: ProgramWithoutId) => addNewProgram$(program),
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Program added successfully",
      });
      await queryClient.refetchQueries({ stale: true });
    },
  });
  const form = useForm<z.infer<typeof addProgramSchema>>({
    resolver: zodResolver(addProgramSchema),
    defaultValues: {
      name: "",
    },
  });

  function submitHandler(values: z.infer<typeof addProgramSchema>) {
    const program = {
      name: values.name,
    };
    newProgramMutation.mutate(program);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 w-[20rem] flex flex-col flex-wrap"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[20rem]">
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input placeholder="Interior Design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-[20rem]"
          disabled={newProgramMutation.isLoading}
        >
          {newProgramMutation.isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            "Add Program"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddProgramForm;
