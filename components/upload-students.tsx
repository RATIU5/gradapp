"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Student } from "@/lib/types";
import { addNewStudents } from "@/lib/queries";

const UploadStudents = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<string>("");
  const newStudentMutation = useMutation({
    mutationFn: (peopleCSV: string) => {
      return addNewStudents(peopleCSV);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true });
    },
  });

  useEffect(() => {
    if (!data || data === "") return;
    newStudentMutation.mutate(data);
  }, [data]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData(e.target?.result as string);
      };
      reader.readAsText(file);
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
      <Button type="submit">Import Students</Button>
    </form>
  );
};

export default UploadStudents;
