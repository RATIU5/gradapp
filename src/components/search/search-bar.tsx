import { Combobox } from "@headlessui/react";
import { PersonWithProgram } from "~/utils/types";

export type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
  checkOut: () => void;
  checkIn: () => void;
  selectedPerson: PersonWithProgram | undefined;
};

const renderFullName = (
  selectedPerson: SearchBarProps["selectedPerson"],
  query: SearchBarProps["query"]
) => {
  let name = "";
  if (selectedPerson === undefined) {
    name = query;
  } else {
    name = selectedPerson.firstname + " " + selectedPerson.lastname;
  }
  return name;
};

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex w-full">
      <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-red-400 focus:outline-none sm:text-sm">
        <Combobox.Input
          placeholder="Name or Program"
          displayValue={(person: PersonWithProgram) => {
            return renderFullName(person, props.query);
          }}
          className="w-full border-none py-3 pl-4 pr-10 text-lg leading-5 text-gray-900 outline-none focus:ring-0"
          onChange={(event) => props.setQuery(event.target.value)}
        />
      </div>
      <input
        type="button"
        value={props.selectedPerson?.present ? "Check Out" : "Check In"}
        disabled={props.selectedPerson === undefined}
        onClick={props.selectedPerson?.present ? props.checkOut : props.checkIn}
        className="text-md ml-4 cursor-pointer rounded-lg bg-red-700 px-4 py-2 font-bold text-white disabled:cursor-default disabled:bg-gray-500"
      />
    </div>
  );
}
