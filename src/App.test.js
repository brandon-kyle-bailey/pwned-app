import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Can I use this domain?', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Can I use this domain?/i);
  expect(linkElement).toBeInTheDocument();
});
