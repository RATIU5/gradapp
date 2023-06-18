import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState } from "react";
import Layout from "~/components/layout";
import { getAllPrograms } from "~/utils/query-fns";

type Record = object;

const Record: NextPage<Record> = (props) => {
  const [nameValue, setNameValue] = useState("");
  const programsQuery = useQuery({
    queryKey: ["all-programs"],
    queryFn: getAllPrograms,
  });

  const onChange = (value: string) => {
    setNameValue(value);
    // searchGuests(query);
  };

  return (
    <Layout>
      <div>
        <form>
          <input
            type="text"
            name="attendee_name"
            id="attendee_name"
            value={nameValue}
            onChange={(e) => onChange(e.target.value as string)}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Record;
