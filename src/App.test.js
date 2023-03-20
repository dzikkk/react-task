import { render, screen } from '@testing-library/react';
import App from './App';

test('renders point summary header', () => {
  render(<App />);

  const linkElement = screen.getByText(/Points Summary/i);
  expect(linkElement).toBeInTheDocument();
});
