import { Combobox } from "@headlessui/react";
import { PersonWithProgram } from "../../utils/types";

interface Props {
  person: PersonWithProgram;
}

export const PersonRow = ({ person }: Props) => {
  return (
    <Combobox.Option
      as="tr"
      className={`${
        person.present ? "bg-green-100 text-green-800" : ""
      }relative m-1 grid grid-cols-12 items-center rounded-lg px-4 py-2 ui-active:bg-gray-100`}
      key={person.id}
      value={person.id}
    >
      <td className="col-span-5">
        <span>{person.firstname + " " + person.lastname}</span>
      </td>
      <td className="col-span-5 text-neutral-500">
        <span>{person.program}</span>
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
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
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 4v3m-4 -3v6m8 -6v6"></path>
              <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z"></path>
            </svg>
          </span>
        ) : undefined}
      </td>
    </Combobox.Option>
  );
};
