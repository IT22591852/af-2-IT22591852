// src/Tests/CountryCard.test.js
import { render, screen } from '@testing-library/react';
import CountryCard from '../Components/Country/CountryCard';

const mockCountry = {
  name: { common: 'Testland', official: 'Testland Republic' },
  population: 1000000,
  region: 'Test Region',
  capital: ['Test City'],
  flags: { svg: 'test-flag.svg' },
  languages: { en: 'English' }
};

test('renders country card with basic information', () => {
  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText('Testland')).toBeInTheDocument();
  expect(screen.getByText('1,000,000')).toBeInTheDocument();
  expect(screen.getByText('Test Region')).toBeInTheDocument();
  expect(screen.getByText('Test City')).toBeInTheDocument();
});
