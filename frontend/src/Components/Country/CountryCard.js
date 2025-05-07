import React, { useState } from 'react';
import { GlobeAltIcon, UsersIcon, MapPinIcon, LanguageIcon } from '@heroicons/react/24/outline';

const getLanguageList = (languages) =>
  languages ? Object.values(languages).join(', ') : 'N/A';

function CountryCard({ country }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const languageList = getLanguageList(country.languages);

  return (
    <>
      <div
        className="
          relative flex flex-col
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
          border-l-8 border-gray-700
          rounded-xl shadow-xl p-6 mb-6
          transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer
          group h-full
        "
        onClick={handleShow}
        tabIndex={0}
        aria-label={`View details for ${country.name.common}`}
        onKeyPress={(e) => { if (e.key === 'Enter') handleShow(); }}
        style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <div className="flex items-center mb-4">
          {/* Flag as a circle */}
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-16 h-16 object-cover rounded-full border-4 border-gray-700 shadow-md mr-4"
          />
          <div>
            <h3 className="text-xl font-extrabold text-gray-100">
              {country.name.common}
            </h3>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-semibold text-gray-200">
              {country.region}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-gray-400" />
            <span>{country.population.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-400" />
            <span>{country.capital ? country.capital[0] : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageIcon className="w-5 h-5 text-gray-400" />
            <span className="truncate">{languageList}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="
              w-full px-4 py-2 rounded-full
              bg-gray-800 hover:bg-gray-600
              text-gray-100 font-semibold shadow-lg
              transition-all focus:outline-none focus:ring-2 focus:ring-gray-500
              flex items-center justify-center gap-2
            "
            type="button"
            onClick={(e) => { e.stopPropagation(); handleShow(); }}
          >
            <GlobeAltIcon className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>

      {/* Slide-in Modal */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-md p-8 animate-slideInUp md:animate-slideIn border-2 border-gray-700">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 text-2xl"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-24 h-24 object-cover rounded-full border-4 border-gray-700 shadow mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-100 text-center">
                {country.name.official}
              </h2>
              <span className="mb-4 px-3 py-1 bg-gray-700 rounded-full text-xs font-semibold text-gray-200">
                {country.region}
              </span>
              <div className="space-y-4 w-full text-gray-200">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Population:</span>
                  <span>{country.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Region:</span>
                  <span>{country.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Capital:</span>
                  <span>{country.capital ? country.capital[0] : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Languages:</span>
                  <span>{languageList}</span>
                </div>
              </div>
              <button
                className="mt-8 px-6 py-2 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-600 transition"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>
        {`
          @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideInUp {
            animation: slideInUp 0.4s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slideIn {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.4s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </>
  );
}

export default CountryCard;
