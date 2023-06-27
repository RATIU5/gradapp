import { useMutation, useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllProgramsAndPeople, setPersonPresent } from "~/utils/query-fns";
import { ProgramWithPeople } from "~/utils/types";
import { PersonRow } from "~/components/search/person-row";
import SearchBar from "~/components/search/search-bar";

type Record = object;

const Record: NextPage<Record> = (props) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number>(-1);

  // Queries and Mutations
  const peopleQuery = useQuery({
    queryKey: ["all-people-checkedout"],
    queryFn: getAllProgramsAndPeople,
  });
  const checkInMutation = useMutation({
    mutationFn: () => {
      return setPersonPresent(selected, true);
    },
    onSuccess: () => {
      peopleQuery.refetch();
      setSelected(-1);
    },
  });
  const checkOutMutation = useMutation({
    mutationFn: () => setPersonPresent(selected, false),
    onSuccess: () => {
      peopleQuery.refetch();
      setSelected(-1);
    },
  });

  // Function Handlers

  // Helper Functions
  const filteredPeople = (
    searchVal: string,
    peopleArray: ProgramWithPeople[]
  ) => {
    const filteredArray = [];

    for (const program of peopleArray) {
      for (const person of program.people) {
        const fullName = `${person.firstname} ${person.lastname}`.toLowerCase();
        const queryValue = searchVal.trim().toLowerCase();

        if (fullName.includes(queryValue)) {
          filteredArray.push({ ...person, program: program.name });
        } else if (
          program.name.toLowerCase().includes(queryValue) &&
          !person.present
        ) {
          filteredArray.push({ ...person, program: program.name });
        }
      }
    }

    return filteredArray;
  };

  return (
    <Layout>
      <div className="mx-auto mt-12 flex w-full min-w-[20rem] max-w-[40rem] flex-col items-center p-4">
        <Combobox value={selected} onChange={setSelected}>
          <QueryData dataQuery={peopleQuery}>
            {(arr) => {
              console.log(arr);

              return (
                <>
                  <SearchBar
                    query={query}
                    setQuery={setQuery}
                    selectedPerson={arr[selected]}
                    checkIn={() => checkInMutation.mutate()}
                    checkOut={() => checkOutMutation.mutate()}
                  />
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options
                      as="table"
                      className="relative mt-4 w-full cursor-default justify-between overflow-hidden rounded-xl bg-white p-2 text-left shadow-md"
                    >
                      <thead className="w-full">
                        <tr className="relative m-1 grid grid-cols-12 items-center rounded-lg px-4 py-2 text-sm text-gray-500">
                          <th className="col-span-5">Name</th>
                          <th className="col-span-5">Program</th>
                          <th className="col-span-1">Plat.</th>
                          <th className="col-span-1">HS</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {filteredPeople(query, arr).map((person) => (
                          <PersonRow person={person} />
                        ))}
                      </tbody>
                    </Combobox.Options>
                  </Transition>
                </>
              );
            }}
          </QueryData>
        </Combobox>
      </div>
    </Layout>
  );
};

export default Record;
