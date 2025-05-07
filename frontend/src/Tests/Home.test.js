// src/Tests/Home.test.js
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Pages/Country/Home';
import { getAllCountries } from '../Services/api';

jest.mock('../Services/api');

test('loads and displays countries', async () => {
  getAllCountries.mockResolvedValue([
    {
      name: { common: 'Testland', official: 'Testland Republic' },
      population: 1000000,
      region: 'Test Region',
      capital: ['Test City'],
      flags: { svg: 'test-flag.svg' },
      cca3: 'TST'
    }
  ]);
  render(<Home />);
  expect(await screen.findByText('Testland')).toBeInTheDocument();
});
