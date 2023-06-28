import { useState } from "react";

export type SearchBarProps = {
  onChange: (query: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState("");
  return (
    <div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-md transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-red-400 focus:outline-none sm:text-sm">
      <input
        placeholder="Name or Program"
        type="text"
        value={query}
        className="w-full border-none py-3 pl-4 pr-10 text-lg leading-5 text-gray-900 outline-none focus:ring-0"
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}
