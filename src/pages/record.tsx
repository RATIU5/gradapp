import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState } from "react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllPeople } from "~/utils/query-fns";

type Record = object;

const Record: NextPage<Record> = (props) => {
  const [nameValue, setNameValue] = useState("");
  const peopleQuery = useQuery({
    queryKey: ["all-people"],
    queryFn: getAllPeople,
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
        <QueryData dataQuery={peopleQuery}>
          {(arr) => (
            <div>
              {arr.map((p) => {
                return <p>{p.firstname}</p>;
              })}
            </div>
          )}
        </QueryData>
      </div>
    </Layout>
  );
};

export default Record;
