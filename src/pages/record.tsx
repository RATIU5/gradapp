import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Layout from "~/components/layout";
import QueryData from "~/components/layout/query-data";
import { getAllProgramsAndPeople } from "~/utils/query-fns";
import { PersonWithProgram } from "~/utils/types";

type Record = object;

const Record: NextPage<Record> = (props) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<number>(-1);
  const peopleQuery = useQuery({
    queryKey: ["all-people"],
    queryFn: getAllProgramsAndPeople,
  });

  const handleCheckIn = () => {
    if (selectedPerson < 0) return;
    setSelectedPerson(-1);
  };

  const filteredPeople = (people: PersonWithProgram[]) => {
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
        <Combobox value={selectedPerson} onChange={(v) => setSelectedPerson(v)}>
          <QueryData dataQuery={peopleQuery}>
            {(arr) => (
              <>
                <div className="flex w-full">
                  <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-red-400 focus:outline-none sm:text-sm">
                    <Combobox.Input
                      placeholder="Name or Program"
                      displayValue={(id: number) => {
                        const p = arr.filter((p) => p.id === id)[0];
                        return (
                          ((p?.firstname || p?.lastname) &&
                            `${p?.firstname || ""} ${p?.lastname || ""}`) ||
                          ""
                        );
                      }}
                      // value={query}
                      className="w-full border-none py-3 pl-4 pr-10 text-lg leading-5 text-gray-900 outline-none focus:ring-0"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <input
                    type="button"
                    value="Check In"
                    disabled={selectedPerson < 0}
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
                      {filteredPeople(arr).length === 0 && query !== "" ? (
                        <tr className="relative m-1 block items-center rounded-lg px-4 py-2 ui-active:bg-gray-100">
                          <td>No people found</td>
                        </tr>
                      ) : (
                        filteredPeople(arr).map((person) => (
                          <Combobox.Option
                            as="tr"
                            className="relative m-1 grid grid-cols-12 items-center rounded-lg px-4 py-2 ui-active:bg-gray-100"
                            key={person.id}
                            value={person.id}
                          >
                            <td className="col-span-5">
                              <span>
                                {person.firstname + " " + person.lastname}
                              </span>
                            </td>
                            <td className="col-span-5 text-neutral-500">
                              <span>{person.programName}</span>
                            </td>
                            <td className="col-span-1">
                              {person.platinum ? (
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="rounded-full bg-amber-200 p-[0.15rem] text-amber-500"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    ></path>
                                    <path
                                      d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944z"
                                      strokeWidth="0"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              ) : undefined}
                            </td>
                            <td className="col-span-1">
                              {person.highschool ? (
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="rounded-full bg-red-200 p-[0.15rem] text-red-500"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    ></path>
                                    <path d="M12 4v3m-4 -3v6m8 -6v6"></path>
                                    <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z"></path>
                                  </svg>
                                </span>
                              ) : undefined}
                            </td>
                          </Combobox.Option>
                        ))
                      )}
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
