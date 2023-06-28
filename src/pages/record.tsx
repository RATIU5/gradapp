import { useMutation, useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState } from "react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllPeopleWithPrograms, setPersonPresent } from "~/utils/query-fns";
import { PersonWithProgram } from "~/utils/types";
import { PersonRow } from "~/components/record/person-row";
import SearchBar from "~/components/record/search-bar";

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

  // Event Handlers
  const inputChangeHandler = (query: string) => {
    setQuery(query);
  };

  return (
    <Layout>
      <div className="mx-auto mt-12 flex w-full min-w-[20rem] max-w-[50rem] flex-col items-center p-4">
        <QueryData dataQuery={peopleQuery}>
          {(arr) => (
            <>
              <SearchBar onChange={inputChangeHandler} />
              <table className="relative mt-4 w-full cursor-default justify-between overflow-hidden rounded-xl bg-white p-2 text-left shadow-md">
                <thead className="w-full">
                  <tr className="relative m-1 grid grid-cols-12 items-center rounded-lg px-4 py-2 text-sm text-gray-500">
                    <th className="col-span-4">Name</th>
                    <th className="col-span-4">Program</th>
                    <th className="col-span-1">Plat.</th>
                    <th className="col-span-1">HS</th>
                    <th className="col-span-2"></th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {filterPeople(query, arr).map((person) => (
                    <PersonRow key={person.id} person={person} />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </QueryData>
      </div>
    </Layout>
  );
};

// Helper Functions
const filterPeople = (searchVal: string, peopleArray: PersonWithProgram[]) => {
  const filteredArray = peopleArray;

  const searchValue = searchVal.trim().toLowerCase();
  let fullName = "";
  filteredArray.filter(
    (person) =>
      fullName.includes(searchValue) ||
      person.program.toLowerCase().includes(searchValue)
  );

  return filteredArray;
};

export default Record;
