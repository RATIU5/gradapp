"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewStudents$ } from "@/lib/queries";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

const UploadStudents = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [file, setFile] = useState<File | undefined>(undefined);
  const newStudentMutation = useMutation({
    mutationFn: (peopleCSV: string) => addNewStudents$(peopleCSV),
    onError: (error: any) => {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error adding the students",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      setFile(undefined);
      toast({
        title: "Success",
        description: "Students added successfully",
      });
      await queryClient.refetchQueries({ stale: true });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (file.name.endsWith(".csv")) {
            newStudentMutation.mutate(content);
          } else {
            throw new Error("Invalid file type; csv expected");
          }
        };
        reader.readAsText(file);
      } else {
        throw new Error("No file selected");
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-stretch">
      <div
        className="w-full h-64 relative bg-neutral-100 border-2 border-dashed border-neutral-400 rounded-md flex flex-col items-center justify-center cursor-pointer text-neutral-400"
        id="dropzone"
      >
        <input
          className="w-full h-full opacity-0 cursor-pointer absolute bg-red-300"
          type="file"
          id="file"
        />

        <p className="mt-1">
          Drag your file here or{" "}
          <span className="text-neutral-500 underline">Browse</span>
        </p>
      </div>
      <Button
        type="submit"
        className="mt-4"
        disabled={!file || newStudentMutation.isLoading}
      >
        {newStudentMutation.isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          "Import Students"
        )}
      </Button>
    </form>
  );
};

export default UploadStudents;
