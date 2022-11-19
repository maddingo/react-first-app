import { render, screen } from '@testing-library/react';
import App from './App';
import {act} from "react-dom/test-utils";

test('renders Next Player', () => {
  render(<App />);
  const statusElement = screen.getByText(/Next Player: X/i);
  expect(statusElement).toBeInTheDocument();
});

test('click first square changes value', () => {
  render(<App />);
  const firstSquare = screen.getByTestId("square-0");
  act(() => {
    firstSquare.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(firstSquare.innerHTML).toEqual('X');
  const resetButton = screen.getByText(/Reset/);
  expect(resetButton).not.toBeVisible();
})

test('winning game shows Rest button', () => {
  render(<App/>);
  const squares = Array(9).fill(null);
  for (let i = 0; i < squares.length; i++) {
    squares[i] = screen.getByTestId('square-' + i);
  }
  act(() => {
    squares[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    squares[4].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    squares[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    squares[5].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    squares[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const resetButton = screen.getByText(/Reset/);
  expect(resetButton).toBeVisible();

  const statusText = screen.getByTestId('status-text');
  expect(statusText.innerHTML).toEqual('The winner is X');
})
