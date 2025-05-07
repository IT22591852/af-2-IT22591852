// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Countries App heading', () => {
  render(<App />);
  expect(screen.getByText(/where in the world/i)).toBeInTheDocument();
});
