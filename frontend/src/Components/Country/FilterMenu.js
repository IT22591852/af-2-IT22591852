import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getCountriesByRegion } from "../../Services/api";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function FilterMenu({ setFilteredCountries }) {
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const menuRef = useRef(null);

  // Load saved filter preference on component mount
  useEffect(() => {
    const savedRegion = localStorage.getItem("lastRegionFilter");
    if (savedRegion) {
      setSelectedRegion(savedRegion);

      // Define and call the filter function inside useEffect to avoid dependency warning
      (async () => {
        const data = await getCountriesByRegion(savedRegion);
        setFilteredCountries(data);
      })();
    }
    // No dependencies needed, since all used values are static or from localStorage
  }, [setFilteredCountries]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle filter selection
  const handleFilter = async (region) => {
    setOpen(false);
    setSelectedRegion(region);

    // Save filter preference to localStorage
    localStorage.setItem("lastRegionFilter", region);

    // Fetch and set filtered countries
    const data = await getCountriesByRegion(region);
    setFilteredCountries(data);
  };

  return (
    <div 
      data-testid="filter-menu-container"
      className="flex gap-4"
    >
      <div className="relative text-right mb-6" ref={menuRef}>
        <button
          type="button"
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-lg
            bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-200 font-semibold shadow-sm
            hover:bg-gray-50 dark:hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition
          "
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {selectedRegion ? `Region: ${selectedRegion}` : "Filter by Region"}
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div
            className="
              absolute right-0 mt-2 w-48 rounded-xl shadow-lg
              bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5
              z-20 animate-fadeIn
            "
            role="menu"
            aria-orientation="vertical"
          >
            <ul className="py-2">
              {REGIONS.map((region) => (
                <li key={region}>
                  <button
                    className={`
                      w-full text-left px-4 py-2 
                      ${selectedRegion === region 
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-600 hover:text-blue-700 dark:hover:text-white"}
                      transition
                    `}
                    onClick={() => handleFilter(region)}
                    role="menuitem"
                  >
                    {region}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterMenu;
