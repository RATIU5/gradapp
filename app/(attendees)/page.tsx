"use client";

import { Icons } from "@/components/icons";
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
import { getAllAttendees } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["attendees"],
    queryFn: getAllAttendees,
  });

  if (isLoading) {
    return (
      <Table className="max-w-4xl mx-auto mt-5">
        <TableCaption>Loading data...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Plat.</TableHead>
            <TableHead>HS</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
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
      </Table>
    );
  }

  if (isError) {
    return (
      <Table className="max-w-4xl mx-auto mt-5">
        <TableCaption>{(error as Error).message}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Plat.</TableHead>
            <TableHead>HS</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
  }

  return (
    <Table className="max-w-4xl mx-auto mt-5">
      <TableCaption>A list of all faculty and graduates.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Plat.</TableHead>
          <TableHead className="w-[50px]">HS</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Program</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((person) => {
          return (
            <TableRow key={person.id}>
              <TableCell className="font-medium">
                {person.platinum ? <Icons.medal /> : null}
              </TableCell>
              <TableCell>
                {person.highschool ? <Icons.award /> : null}
              </TableCell>
              <TableCell>{person.firstname + " " + person.lastname}</TableCell>
              <TableCell>Programming</TableCell>
              <TableCell className="text-right">
                <button>Check-in</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Page;
