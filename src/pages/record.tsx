import { useMutation, useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllProgramsAndPeople, setPersonPresent } from "~/utils/query-fns";
import { ProgramWithPeople } from "~/utils/types";
import { PersonRow } from "~/components/search/person-row";

type Record = object;

const Record: NextPage<Record> = (props) => {
  const [query, setQuery] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState<number>(-1);
  const [selectedPresent, setSelectedPresent] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPersonId > 0) {
      const person = peopleQuery.data
        ?.find((p) => p.people.find((c) => c.id === selectedPersonId))
        ?.people.find((c) => c.id === selectedPersonId);
      if (person) setSelectedPresent(person.present);
    }
  }, [selectedPersonId]);

  const peopleQuery = useQuery({
    queryKey: ["all-people-checkedout"],
    queryFn: getAllProgramsAndPeople,
  });
  const checkInMutation = useMutation({
    mutationFn: () => setPersonPresent(selectedPersonId, true),
    onSuccess: () => {
      peopleQuery.refetch();
      setSelectedPersonId(-1);
    },
  });
  const checkOutMutation = useMutation({
    mutationFn: () => setPersonPresent(selectedPersonId, false),
    onSuccess: () => {
      peopleQuery.refetch();
      setSelectedPersonId(-1);
    },
  });

  const handleCheckIn = () => {
    if (selectedPersonId < 0) return;
    const person = peopleQuery.data
      ?.find((p) => p.people.find((c) => c.id === selectedPersonId))
      ?.people.find((c) => c.id === selectedPersonId);
    if (person?.present) {
      checkOutMutation.mutate();
    } else {
      checkInMutation.mutate();
    }
  };

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

  const displayName = (id: number) => {
    const person = peopleQuery.data
      ?.find((p) => p.people.find((c) => c.id === id))
      ?.people.find((c) => c.id === id);
    if (person) return `${person.firstname} ${person.lastname}`;
    return "";
  };

  return (
    <Layout>
      <div className="mx-auto mt-12 flex w-full min-w-[20rem] max-w-[40rem] flex-col items-center p-4">
        <Combobox
          value={selectedPersonId}
          onChange={(v) => setSelectedPersonId(v)}
        >
          <QueryData dataQuery={peopleQuery}>
            {(arr) => (
              <>
                <div className="flex w-full">
                  <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-red-400 focus:outline-none sm:text-sm">
                    <Combobox.Input
                      placeholder="Name or Program"
                      displayValue={displayName}
                      // value={query}
                      className="w-full border-none py-3 pl-4 pr-10 text-lg leading-5 text-gray-900 outline-none focus:ring-0"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <input
                    type="button"
                    value={!selectedPresent ? "Check In" : "Check Out"}
                    disabled={selectedPersonId < 0}
                    onClick={handleCheckIn}
                    className="text-md ml-4 cursor-pointer rounded-lg bg-red-700 px-4 py-2 font-bold text-white disabled:cursor-default disabled:bg-gray-500"
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
            )}
          </QueryData>
        </Combobox>
      </div>
    </Layout>
  );
};

export default Record;
