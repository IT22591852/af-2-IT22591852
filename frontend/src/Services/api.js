//services/api.js
// This imports the axios library which is used to make HTTP requests.
// You’re using axios.get(...) to fetch data from the REST Countries API

import axios from "axios";

//Base URL for all endpoints  from the REST Countries API (version 3.1)
const BASE_URL="https://restcountries.com/v3.1";

//get all countries
export const getAllCountries=async()=>{
    const response=await axios.get(`${BASE_URL}/all`);
    // Gets data about all countries Returns the result (an array of country objects)
    return response.data;
};

//search by country name
export const getCountryByName=async(name)=>{
    const response=await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
};

//filter countries by region
export const getCountriesByRegion =async(region)=>{
    const response=await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
};

//get full details usin country code
export const getCountryByCode=async(code)=>{
    const response=await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0]; //returns a single country
};