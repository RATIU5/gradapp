import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllPeople } from "~/utils/query-fns";

type Record = object;

// people database columns
// i want to unwrap the UseQueryResult datatype instead
// TODO ^^^^
type Person = {
  id: number;
  firstname: string;
  lastname: string;
  programid: number;
  email: string;
  platinum: boolean;
  highschool: boolean;
  persontype: number;
  present: boolean;
};

const Record: NextPage<Record> = (props) => {
  const [nameQuery, setNameQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(undefined);
  const peopleQuery = useQuery({
    queryKey: ["all-people"],
    queryFn: getAllPeople,
  });

  const onChange = (value: string) => {
    setNameQuery(value);
    // searchGuests(query);
  };

  const filteredPeople = (people: Person[]) =>
    nameQuery === ""
      ? []
      : people
          .filter((person) => {
            return (
              person.firstname
                .toLowerCase()
                .includes(nameQuery.toLowerCase()) ||
              person.lastname
                .toLowerCase()
                .includes(nameQuery.toLocaleLowerCase())
            );
          })
          .slice(0, 10);

  return (
    <Layout>
      <div>
        <QueryData dataQuery={peopleQuery}>
          {(arr) => (
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
              <Combobox.Input
                onChange={(event) => setNameQuery(event.target.value)}
              />
              <Combobox.Options>
                {filteredPeople(arr).map((person) => (
                  <Combobox.Option key={person.id} value={person.id}>
                    {person.firstname + " " + person.lastname}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          )}
        </QueryData>
      </div>
    </Layout>
  );
};

export default Record;
