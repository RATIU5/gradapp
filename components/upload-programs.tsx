"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProgramCSV$ } from "@/lib/queries";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";

const UploadProgram = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [file, setFile] = useState<File | undefined>(undefined);
  const newProgramMutation = useMutation({
    mutationFn: (programCSV: string) => addNewProgramCSV$(programCSV),
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      setFile(undefined);
      toast({
        title: "Success",
        description: "Program added successfully",
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
          try {
            const content = event.target?.result as string;
            if (file.name.endsWith(".csv")) {
              newProgramMutation.mutate(content);
            } else {
              throw new Error("Invalid file type; csv expected");
            }
          } catch (err) {
            toast({
              title: "Error",
              description: (err as Error).message,
              variant: "destructive",
            });
            console.error(err);
          }
        };
        reader.readAsText(file);
      } else {
        throw new Error("No file selected");
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
      console.error("huh");
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
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <p className="mt-1">
          Drag your file here or{" "}
          <span className="text-neutral-500 underline">Browse</span>
        </p>
      </div>
      <Button
        type="submit"
        className="mt-4"
        disabled={!file || newProgramMutation.isLoading}
      >
        {newProgramMutation.isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          "Import Programs"
        )}
      </Button>
    </form>
  );
};

export default UploadProgram;
