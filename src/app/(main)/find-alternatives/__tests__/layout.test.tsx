import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FindAlternativesLayout from "../layout";

describe("FindAlternativesLayout", () => {
  it("renders children correctly", () => {
    render(<FindAlternativesLayout>Test children</FindAlternativesLayout>);
    const childrenElement = screen.getByText("Test children");
    expect(childrenElement).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders the footer correctly", () => {
    render(<FindAlternativesLayout>Test children</FindAlternativesLayout>);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });
});
