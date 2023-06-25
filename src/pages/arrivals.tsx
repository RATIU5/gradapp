import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Layout from "~/components/layout";
import { getAllPresentPeopleWithPrograms } from "~/utils/query-fns";
import QueryData from "~/components/layout/query-data";
import { ProgramWithPeople } from "~/utils/types";

type Arrivals = object;

const Arrivals: NextPage<Arrivals> = (props) => {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAllPresentPeopleWithPrograms,
  });

  const renderProgramWithPeople = (program: ProgramWithPeople) => {
    if (program.people.length === 0) return null;
    return (
      <div className="flex flex-col items-start">
        <div className="my-2 text-2xl text-red-500">{program.name}</div>
        <div className="ml-2 text-xl font-bold">
          {program.people
            .sort((a, b) => a.lastname.localeCompare(b.lastname))
            .map((c) => (
              <div>
                <div className="my-2">
                  {c.firstname} {c.lastname}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <QueryData dataQuery={attendeesQuery}>
        {(attendeesArray) => (
          <div className="mx-auto my-8 max-w-[40rem] rounded-xl bg-white p-4">
            {attendeesArray
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p) => renderProgramWithPeople(p))}
          </div>
        )}
      </QueryData>
    </Layout>
  );
};

export default Arrivals;
