import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa"; // npm install react-icons

function SearchBar({countries,setFilteredCountries}) {

// It accepts two props:
// countries: the full list of countries (fetched from the API)
// setFilteredCountries: a function to update the filtered list shown on screen

    const [searchTerm,setSearchTerm]=useState("");

    const handleSearch=(e)=>{
        e.preventDefault(); // Prevents the default form submission behavior
        const result=countries.filter((country)=>
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
              focus:ring-blue-500 focus:border-blue-500
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
              rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold
              shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          >
            Search
          </button>
        </div>
      </form>
    );
}

export default SearchBar;