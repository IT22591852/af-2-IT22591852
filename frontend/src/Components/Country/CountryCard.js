import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
import { GlobeAltIcon, UsersIcon, MapPinIcon, LanguageIcon } from '@heroicons/react/24/outline'; // Heroicons for icons

// Utility to format languages
const getLanguageList = (languages) =>
  languages ? Object.values(languages).join(', ') : 'N/A';


function CountryCard({country}) {
  // Extract languages (values from the 'languages' object)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const languageList = getLanguageList(country.languages);

  // Object.values() extracts the values → ["English", "Sinhala"]
  // .join(", ") joins them into a string → "English, Sinhala"
  // If there are no languages, show "N/A"


//   When you call the REST Countries API (e.g., https://restcountries.com/v3.1/all), it returns a list of country objects with a specific structure. Here’s an example of one country object you get from that API:

// 🧾 Example Country Object (Simplified):
// json
// Copy code
// {
//   "name": {
//     "common": "Sri Lanka",
//     "official": "Democratic Socialist Republic of Sri Lanka"
//   },
//   "capital": ["Sri Jayawardenepura Kotte"],
//   "region": "Asia",
//   "population": 21803000,
//   "flags": {
//     "svg": "https://flagcdn.com/lk.svg",
//     "png": "https://flagcdn.com/w320/lk.png"
//   },
//   "languages": {
//     "sin": "Sinhala",
//     "tam": "Tamil"
//   },
//   "cca3": "LKA"
// }

return (
  <>
      <div
        className="
          group relative flex flex-col bg-white/80 dark:bg-gray-800/70
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-xl overflow-hidden
          backdrop-blur-lg transition-all duration-300
          hover:shadow-2xl hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-gray-800/80
          cursor-pointer
        "
        onClick={handleShow}
        tabIndex={0}
        aria-label={`View details for ${country.name.common}`}
        onKeyPress={(e) => { if (e.key === 'Enter') handleShow(); }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="
            absolute top-3 right-3 bg-white/70 dark:bg-gray-900/60 px-3 py-1 rounded-full text-xs font-semibold
            text-gray-700 dark:text-gray-200 shadow
          ">
            {country.region}
          </span>
        </div>
        <div className="flex-1 flex flex-col p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
            {country.name.common}
          </h3>
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="font-medium">Population:</span>
              <span>{country.population.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span className="font-medium">Capital:</span>
              <span>{country.capital ? country.capital[0] : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <LanguageIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Languages:</span>
              <span className="truncate">{languageList}</span>
            </div>
          </div>
          <button
            className="
              mt-5 w-full inline-flex items-center justify-center gap-2
              rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
              text-white font-semibold py-2 px-4 shadow-md transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            "
            type="button"
            onClick={(e) => { e.stopPropagation(); handleShow(); }}
          >
            <GlobeAltIcon className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {country.name.official}
            </h2>
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="space-y-2 text-gray-800 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-medium">Population:</span>
                <span>{country.population.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="font-medium">Region:</span>
                <span>{country.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                <span className="font-medium">Capital:</span>
                <span>{country.capital ? country.capital[0] : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <LanguageIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <span className="font-medium">Languages:</span>
                <span>{languageList}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export default CountryCard;
