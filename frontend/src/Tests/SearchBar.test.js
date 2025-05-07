import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../Components/Country/SearchBar';

const mockCountries = [
  { name: { common: 'Sri Lanka' } },
  { name: { common: 'India' } },
  { name: { common: 'Australia' } },
];

test('renders search input and button', () => {
  render(<SearchBar countries={mockCountries} setFilteredCountries={jest.fn()} />);
  expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});

test('calls setFilteredCountries with correct result when searching', () => {
  const setFilteredCountries = jest.fn();
  render(<SearchBar countries={mockCountries} setFilteredCountries={setFilteredCountries} />);
  
  // Type 'India' in the input
  fireEvent.change(screen.getByPlaceholderText('Search for a country...'), {
    target: { value: 'India' }
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  // setFilteredCountries should be called with only India
  expect(setFilteredCountries).toHaveBeenCalledWith([
    { name: { common: 'India' } }
  ]);
});

test('search is case-insensitive', () => {
  const setFilteredCountries = jest.fn();
  render(<SearchBar countries={mockCountries} setFilteredCountries={setFilteredCountries} />);
  
  fireEvent.change(screen.getByPlaceholderText('Search for a country...'), {
    target: { value: 'sri lanka' }
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(setFilteredCountries).toHaveBeenCalledWith([
    { name: { common: 'Sri Lanka' } }
  ]);
});
