import { useMutation, useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllPeopleWithPrograms, setPersonPresent } from "~/utils/query-fns";
import { PersonWithProgram, ProgramWithPeople } from "~/utils/types";
import { PersonRow } from "~/components/search/person-row";
import SearchBar from "~/components/search/search-bar";

type Record = object;

const Record: NextPage<Record> = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number>(-1);

  // Queries and Mutations
  const peopleQuery = useQuery({
    queryKey: ["all-people-with-programs"],
    queryFn: getAllPeopleWithPrograms,
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

  return (
    <Layout>
      <div className="mx-auto mt-12 flex w-full min-w-[20rem] max-w-[50rem] flex-col items-center p-4">
        <Combobox value={selected} onChange={setSelected}>
          <QueryData dataQuery={peopleQuery}>
            {(arr) => (
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
                      {filterPeople(query, arr).map((person) => (
                        <PersonRow key={person.id} person={person} />
                      ))}
                    </tbody>
                  </Combobox.Options>
                </Transition>
              </>
            )}
          </QueryData>
        </Combobox>
      </div>
    </Layout>
  );
};

// Helper Functions
const filterPeople = (searchVal: string, peopleArray: PersonWithProgram[]) => {
  const filteredArray = [];

  const searchValue = searchVal.trim().toLowerCase();
  let fullName = "";
  for (const person of peopleArray) {
    fullName = `${person.firstname} ${person.lastname}`.trim().toLowerCase();
    if (
      fullName.includes(searchValue) ||
      person.lastname.toLowerCase().includes(searchValue) ||
      person.program.toLowerCase().includes(searchValue)
    ) {
      filteredArray.push(person);
    }
  }

  return filteredArray;
};

export default Record;
