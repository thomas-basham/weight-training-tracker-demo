import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("loads andd displays vite + react", () => {
  render(<App />);

  expect(
    screen.getByText("Vite + React", { exact: false })
  );
});
