"use client";

import AttendeesRow from "@/components/attendees-row";
import { TableSkeleton } from "@/components/skeletons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAttendees } from "@/lib/queries";
import { PersonWithProgram } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const [query, setQuery] = useState("");
  const { isLoading, isError, data, error } = useQuery<PersonWithProgram[]>({
    queryKey: ["attendees"],
    queryFn: getAllAttendees,
  });

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
    return (
      <TableCaption className="mb-8">
        {isLoading
          ? "Loading..."
          : isError
          ? (error as Error).message
          : filterData().length === 0
          ? "No results found."
          : "A list of all faculty and graduates."}
      </TableCaption>
    );
  }

  function renderTableBody() {
    if (isLoading) {
      return <TableSkeleton />;
    }

    if (isError) {
      return null;
    }

    return (
      <TableBody>
        {filterData()
          .sort((a, b) => a.lastname.localeCompare(b.lastname))
          .map((person) => {
            return <AttendeesRow key={person.id} person={person} />;
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
