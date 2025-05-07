import React, { useEffect, useState } from 'react';
import { getAllCountries,getCountryByCode } from '../../Services/api';
import CountryCard from '../../Components/Country/CountryCard';
import SearchBar from '../../Components/Country/SearchBar';
import FilterMenu from '../../Components/Country/FilterMenu';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    fetchCountries();
  }, []);

    // Handle country click
    const handleCountryClick = async (country) => {
      try {
        // Fetch additional details using country code
        const fullDetails = await getCountryByCode(country.cca3);
        setSelectedCountry(fullDetails);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

     // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };
  // Toggle dark mode and save to localStorage
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300
      bg-gradient-to-br from-blue-50 via-white to-blue-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      py-8 px-2 sm:px-6 lg:px-12`}>
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
          🌍 Where in the world?
        </h1>
        
        {/* Theme Toggle Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100
            font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleThemeToggle}
        >
          {isDarkMode ? (
            <>
              🌙 Dark Mode
            </>
          ) : (
            <>
              ☀️ Light Mode
            </>
          )}
        </button>
      </header>

      {/* Search and Filter Section */}
      <section className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar countries={countries} setFilteredCountries={setFilteredCountries} />
        </div>
        <div className="flex-1 flex md:justify-end">
          <FilterMenu setFilteredCountries={setFilteredCountries} />
        </div>
      </section>

      {/* Country Cards Grid */}
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} onClick={()=>handleCountryClick(country)} />
          ))}
        </div>
      </main>

{/* Details Modal */}
{isModalOpen && selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
            <button 
              onClick={closeModal}
              className="float-right text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-2xl"
            >
              &times;
            </button>
            
            <div className="clear-both">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                {selectedCountry.name.official}
              </h2>
              
              <img 
                src={selectedCountry.flags.svg} 
                alt={`${selectedCountry.name.common} flag`} 
                className="w-full h-48 object-cover rounded mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-gray-200">
                <div>
                  <p><span className="font-semibold">Native Name:</span> {
                    Object.values(selectedCountry.name.nativeName)[0].official
                  }</p>
                  <p><span className="font-semibold">Population:</span> {
                    selectedCountry.population.toLocaleString()
                  }</p>
                  <p><span className="font-semibold">Region:</span> {selectedCountry.region}</p>
                  <p><span className="font-semibold">Subregion:</span> {selectedCountry.subregion}</p>
                </div>

                <div>
                  <p><span className="font-semibold">Capital:</span> {
                    selectedCountry.capital?.join(', ') || 'N/A'
                  }</p>
                  <p><span className="font-semibold">Languages:</span> {
                    Object.values(selectedCountry.languages).join(', ')
                  }</p>
                  <p><span className="font-semibold">Currency:</span> {
                    Object.values(selectedCountry.currencies).map(c => c.name).join(', ')
                  }</p>
                  <p><span className="font-semibold">Timezone:</span> {
                    selectedCountry.timezones[0]
                  }</p>
                </div>
              </div>

              {selectedCountry.borders && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Border Countries:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.borders.map((borderCode) => (
                      <span 
                        key={borderCode}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {borderCode}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
      
  );
}

export default Home;