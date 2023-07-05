"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAttendees, setAttendeePresent } from "@/lib/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const [query, setQuery] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["attendees"],
    queryFn: getAllAttendees,
  });
  const presentMutation = useMutation({
    mutationFn: (params: { id: number; present: boolean }) =>
      setAttendeePresent(params.id, params.present),
  });

  function handleCheckIn() {
    console.log("check-in");
  }

  function filterData() {
    if (isLoading || isError) {
      return [];
    }

    if (query === "") {
      return data;
    }

    const queryParts = query.trim().toLowerCase().split(" ");
    return data.filter((person) => {
      const fullname = `${person.firstname} ${person.lastname}`.toLowerCase();
      const program = person.programs.name.toLowerCase();
      const match = queryParts.every((part) => {
        return fullname.includes(part) || program.includes(part);
      });
      return match;
    });
  }

  function renderTableCaption() {
    if (isLoading) {
      return <TableCaption className="mb-8">Loading...</TableCaption>;
    }

    if (isError) {
      return (
        <TableCaption className="mb-8">{(error as Error).message}</TableCaption>
      );
    }

    if (filterData().length === 0) {
      return <TableCaption className="mb-8">No results found.</TableCaption>;
    }

    return (
      <TableCaption className="mb-8">
        A list of all faculty and graduates.
      </TableCaption>
    );
  }

  function renderTableBody() {
    if (isLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (isError) {
      return null;
    }

    return (
      <TableBody>
        {filterData().map((person) => {
          return (
            <TableRow key={person.id}>
              <TableCell className="font-medium">
                {person.platinum ? <Icons.medal /> : null}
              </TableCell>
              <TableCell>
                {person.highschool ? <Icons.award /> : null}
              </TableCell>
              <TableCell>{person.firstname + " " + person.lastname}</TableCell>
              <TableCell>{person.programs.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={person.present ? "outline" : "default"}
                  onClick={() =>
                    presentMutation.mutate({
                      id: person.id,
                      present: !person.present,
                    })
                  }
                >
                  {person.present ? "Check-out" : "Check-in"}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  return (
    <>
      <Label
        htmlFor="filter-input"
        className="max-w-4xl block mx-auto mt-24 mb-2"
      >
        Search
      </Label>
      <Input
        id="filter-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Homer Simpson; Interior Design"
        className="max-w-4xl mx-auto mb-12"
      />
      <Table className="max-w-4xl mx-auto mt-5">
        {renderTableCaption()}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Plat.</TableHead>
            <TableHead className="w-[50px]">HS</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {renderTableBody()}
      </Table>
    </>
  );
};

export default Page;
