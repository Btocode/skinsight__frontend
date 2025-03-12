"use client";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductAccordion from "../ProductAccordion";

// Mock the Accordion component
jest.mock("@/components/common/Accordion", () => ({
  Accordion: ({
    title,
    content,
    isActive,
    onToggle,
  }: {
    title: string;
    content: string;
    isActive: boolean;
    onToggle: () => void;
  }) => (
    <div data-testid={`accordion-${title}`}>
      <button onClick={onToggle}>{title}</button>
      {isActive && <div data-testid={`content-${title}`}>{content}</div>}
    </div>
  ),
}));

describe("ProductAccordion Component", () => {
  /**
   * Test case: Component renders all accordions
   *
   * Verifies that all four accordions are rendered with correct titles
   */
  it("renders all accordions", () => {
    render(<ProductAccordion />);

    expect(
      screen.getByText("Formulation and Key Ingredients")
    ).toBeInTheDocument();
    expect(screen.getByText("Benefits")).toBeInTheDocument();
    expect(screen.getByText("Targets")).toBeInTheDocument();
    expect(screen.getByText("Suitable for")).toBeInTheDocument();
  });

  /**
   * Test case: First accordion is initially open
   *
   * Checks if the content of the first accordion is visible on initial render
   */
  it("has the first accordion open initially", () => {
    render(<ProductAccordion />);

    expect(
      screen.getByTestId("content-Formulation and Key Ingredients")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("content-Benefits")).not.toBeInTheDocument();
    expect(screen.queryByTestId("content-Targets")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("content-Suitable for")
    ).not.toBeInTheDocument();
  });

  /**
   * Test case: Toggling behavior of accordions
   *
   * Verifies that clicking on a closed accordion opens it and closes the previously open one
   */
  it("toggles accordions correctly", () => {
    render(<ProductAccordion />);

    // Initially, first accordion should be open
    expect(
      screen.getByTestId("content-Formulation and Key Ingredients")
    ).toBeInTheDocument();

    // Click on the second accordion
    fireEvent.click(screen.getByText("Benefits"));

    // Now, second accordion should be open and first should be closed
    expect(
      screen.queryByTestId("content-Formulation and Key Ingredients")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("content-Benefits")).toBeInTheDocument();
  });

  /**
   * Test case: Only one accordion is open at a time
   *
   * Ensures that opening one accordion closes all others
   */
  it("keeps only one accordion open at a time", () => {
    render(<ProductAccordion />);

    // Open the second accordion
    fireEvent.click(screen.getByText("Benefits"));

    // Open the third accordion
    fireEvent.click(screen.getByText("Targets"));

    // Now, only the third accordion should be open
    expect(
      screen.queryByTestId("content-Formulation and Key Ingredients")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("content-Benefits")).not.toBeInTheDocument();
    expect(screen.getByTestId("content-Targets")).toBeInTheDocument();
    expect(
      screen.queryByTestId("content-Suitable for")
    ).not.toBeInTheDocument();
  });

  /**
   * Test case: Clicking an open accordion closes it
   *
   * Verifies that clicking on an open accordion closes it
   */
  it("closes the accordion when clicking on an open one", () => {
    render(<ProductAccordion />);

    // First accordion is initially open
    expect(
      screen.getByTestId("content-Formulation and Key Ingredients")
    ).toBeInTheDocument();

    // Click on the first accordion to close it
    fireEvent.click(screen.getByText("Formulation and Key Ingredients"));

    // Now, no accordion should be open
    expect(
      screen.queryByTestId("content-Formulation and Key Ingredients")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("content-Benefits")).not.toBeInTheDocument();
    expect(screen.queryByTestId("content-Targets")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("content-Suitable for")
    ).not.toBeInTheDocument();
  });
});
