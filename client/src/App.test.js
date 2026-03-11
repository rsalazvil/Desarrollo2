// mock the router so App can import without errors
jest.mock('react-router-dom');

import { render } from '@testing-library/react';
import App from './App';

test('App component renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
