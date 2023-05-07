import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Layout from "~/components/layout";

type Arrivals = object;

const Arrivals: NextPage<Arrivals> = (props) => {
  const attendeesQuery = useQuery({
    queryKey: ["getAttendees"],
    queryFn: getAttendees,
  });
  const graduatesQuery = useQuery({
    queryKey: ["getGraduates"],
    queryFn: getGraduates,
  });
  const departmentQuery = useQuery({
    queryKey: ["getDepartments"],
    queryFn: getDepartments,
  });

  return <Layout></Layout>;
};

export default Arrivals;
