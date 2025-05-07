// src/Tests/FilterMenu.test.js
import { render, screen } from '@testing-library/react';
import FilterMenu from '../Components/Country/FilterMenu';

test('renders region filter button', () => {
  render(<FilterMenu setFilteredCountries={jest.fn()} />);
  expect(screen.getByText('Filter by Region')).toBeInTheDocument();
});
