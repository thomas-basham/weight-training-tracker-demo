import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("loads andd displays the title Weight Training Tracker", () => {
  render(<App />);

  expect(screen.getByText("Weight Training Tracker", { exact: false }));
});
