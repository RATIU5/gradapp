import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Layout from "~/components/layout";
import { getAllPresentPeopleWithPrograms } from "~/utils/query-fns";
import QueryData from "~/components/layout/query-data";

type Arrivals = object;

const Arrivals: NextPage<Arrivals> = (props) => {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAllPresentPeopleWithPrograms,
  });

  return (
    <Layout>
      <QueryData dataQuery={attendeesQuery}>
        {(attendeesArray) => {
          return (
            <>
              {attendeesArray.map((r) => (
                <div></div>
              ))}
            </>
          );
        }}
      </QueryData>
    </Layout>
  );
};

export default Arrivals;
