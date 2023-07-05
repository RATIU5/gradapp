"use client";

import { HereListSkeleton } from "@/components/skeletons";
import { getAttendeesPresent } from "@/lib/queries";
import { PersonWithProgram } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const { isLoading, isError, data, error } = useQuery<PersonWithProgram[]>({
    queryKey: ["attendees"],
    queryFn: getAttendeesPresent,
  });

  if (isLoading) {
    return <HereListSkeleton />;
  }

  if (isError) {
    return <span>{(error as Error).message}</span>;
  }

  return (
    <>
      <ul>
        {data
          .sort((a, b) => a.lastname.localeCompare(b.lastname))
          .map((p) => (
            <li>{p.firstname + " " + p.lastname}</li>
          ))}
      </ul>
    </>
  );
};

export default Page;
