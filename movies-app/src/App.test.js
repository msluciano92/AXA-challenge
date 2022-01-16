import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", function () {
  it("should have Images: tag", function () {
    let { getByText } = render(<App />);
    expect(getByText("Movies:")).toBeDefined();
  });
});
