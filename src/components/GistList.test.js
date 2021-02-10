import { render, screen } from '@testing-library/react';
import GistList from './GistList';

test('Component without crashing', () => {
  render(<GistList />);
  const linkElement = screen.getByTestId('gitlist')
  expect(linkElement).toBeInTheDocument();
});