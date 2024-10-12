import React, { FC } from "react";

interface SearchProps {
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Search: FC<SearchProps> = ({
  search,
  handleSearchChange,
  placeholder,
}) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="border py-2 pl-1 pr-10 rounded-md text-sm shadow-sm shadow-gray-500 outline-none"
      />
    </div>
  );
};

export default Search;
