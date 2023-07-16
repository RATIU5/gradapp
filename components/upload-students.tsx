"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewStudents$ } from "@/lib/queries";

const UploadStudents = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | undefined>(undefined);
  const newStudentMutation = useMutation({
    mutationFn: (peopleCSV: string) => addNewStudents$(peopleCSV),
    onSuccess: async () => {
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
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type="submit" disabled={!file}>
        Import Students
      </Button>
    </form>
  );
};

export default UploadStudents;
