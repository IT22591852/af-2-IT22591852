import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function SearchBar({ countries, setFilteredCountries }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(result);
  };

  return (
    <form
      className="w-full max-w-lg mx-auto mb-6"
      onSubmit={handleSearch}
      autoComplete="off"
    >
      <div className="relative">
        {/* Search icon inside input */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="w-4 h-4 text-gray-400 dark:text-gray-300" />
        </span>
        <input
          type="text"
          className="
            block w-full pl-10 pr-32 py-3 rounded-lg
            bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white text-base shadow-sm
            placeholder-gray-400 dark:placeholder-gray-400
            focus:ring-green-400 focus:border-green-400
            transition
          "
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Search button, positioned at the right inside the input */}
        <button
          type="submit"
          className="
            absolute top-1/2 right-2 -translate-y-1/2 px-5 py-2
            rounded-lg bg-gray-800 text-gray-100 font-semibold
            shadow-md transition
            hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-500
          "
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
