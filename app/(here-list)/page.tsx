"use client";

import { HereListSkeleton } from "@/components/skeletons";
import { getAttendeesPresent } from "@/lib/queries";
import { ProgramWithPeople } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

type PageProps = {
  children: React.ReactNode;
};

const Page = () => {
  const { isLoading, isError, data, error } = useQuery<ProgramWithPeople[]>({
    queryKey: ["attendees"],
    queryFn: getAttendeesPresent,
  });

  if (isLoading) {
    return <HereListSkeleton />;
  }

  if (isError) {
    return <span>{(error as Error).message}</span>;
  }

  function renderPeople(programs: ProgramWithPeople) {
    return (
      <ul className="ml-2">
        {programs.people
          .sort((a, b) => a.lastname.localeCompare(b.lastname)) // sort by last name
          .map((p) => (
            <li className="mb-1">
              {p.firstname + " " + p.lastname}{" "}
              {p.platinum && <span className="text-yellow-500">🌟</span>}
              {p.highschool && <span className="text-blue-500">🎓</span>}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <ul>
        {data
          .sort((a, b) => a.name.localeCompare(b.name)) // sort by program name
          .map(
            (p) =>
              p.people.length > 0 && ( // only show programs with people
                <>
                  <li className="text-xl font-bold mb-1 mt-7 first:mt-0">
                    {p.name}
                  </li>
                  <li>{renderPeople(p)}</li>
                </>
              )
          )}
      </ul>
    </>
  );
};

export default Page;
