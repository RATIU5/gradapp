import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllProgramsAndPeople } from "~/utils/query-fns";

type Record = object;

// people database columns
// i want to unwrap this from UseQueryResult datatype instead
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
  programName: string;
};

const Record: NextPage<Record> = (props) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(undefined);
  const peopleQuery = useQuery({
    queryKey: ["all-people"],
    queryFn: getAllProgramsAndPeople,
  });

  const onChange = (value: string) => {
    setQuery(value);
    // searchGuests(query);
  };

  const filteredPeople = (people: Person[]) => {
    return query === ""
      ? []
      : people
          .filter((person) => {
            return (
              person.firstname.toLowerCase().includes(query.toLowerCase()) ||
              person.lastname.toLowerCase().includes(query.toLowerCase()) ||
              person.programName.toLowerCase().includes(query.toLowerCase())
            );
          })
          .slice(0, 10);
  };

  return (
    <Layout>
      <div className="mx-auto mt-12 flex w-full min-w-[20rem] max-w-[40rem] flex-col items-center p-4">
        <QueryData dataQuery={peopleQuery}>
          {(arr) => (
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
              <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-red-400 focus:outline-none sm:text-sm">
                <Combobox.Input
                  placeholder="Name or Program"
                  className="w-full border-none py-3 pl-4 pr-10 text-lg leading-5 text-gray-900 outline-none focus:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options
                  as="table"
                  className="relative mt-4 flex w-full cursor-default justify-between overflow-hidden rounded-xl bg-white p-2 text-left shadow-md"
                >
                  <tbody className="w-full">
                    {filteredPeople(arr).length === 0 && query !== "" ? (
                      <tr>No people found</tr>
                    ) : (
                      filteredPeople(arr).map((person) => (
                        <Combobox.Option
                          as="tr"
                          className="relative m-1 block rounded-lg px-4 py-2 ui-active:bg-slate-100"
                          key={person.id}
                          value={person.id}
                        >
                          <td>
                            <span>
                              {person.firstname + " " + person.lastname}
                            </span>
                          </td>
                          <td>
                            <span>{person.programName}</span>
                          </td>
                          <td>
                            {person.platinum ? <span>P</span> : undefined}
                          </td>
                          <td>
                            {person.highschool ? <span>H</span> : undefined}
                          </td>
                        </Combobox.Option>
                      ))
                    )}
                  </tbody>
                </Combobox.Options>
              </Transition>
            </Combobox>
          )}
        </QueryData>
      </div>
    </Layout>
  );
};

export default Record;
