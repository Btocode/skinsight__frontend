import React from "react";
import { render } from "@testing-library/react";
import YourSkinMatchesLayout from "../layout";

// Mock the Footer component
jest.mock("@/components/layout/Footer", () => {
  return {
    __esModule: true,
    default: () => <footer data-testid="mocked-footer">Mocked Footer</footer>,
  };
});

/**
 * Test suite for the YourSkinMatchesLayout component
 */
describe("YourSkinMatchesLayout", () => {
  /**
   * Test case: Renders children and Footer
   *
   * This test verifies that:
   * 1. The layout component renders the provided children
   * 2. The Footer component is rendered within the layout
   */
  it("renders children and Footer", () => {
    const { getByText, getByTestId } = render(
      <YourSkinMatchesLayout>
        <div>Test Child Content</div>
      </YourSkinMatchesLayout>
    );

    // Check if the child content is rendered
    expect(getByText("Test Child Content")).toBeInTheDocument();

    // Check if the Footer is rendered
    expect(getByTestId("mocked-footer")).toBeInTheDocument();
  });

  /**
   * Test case: Maintains correct structure
   *
   * This test ensures that:
   * 1. The layout wraps its content in a div
   * 2. The children are rendered before the Footer
   */
  it("maintains correct structure", () => {
    const { container, getByTestId } = render(
      <YourSkinMatchesLayout>
        <div data-testid="child-content">Test Child Content</div>
      </YourSkinMatchesLayout>
    );

    const rootDiv = container.firstChild;
    const childContent = getByTestId("child-content");
    const footer = getByTestId("mocked-footer");

    // Check if the root element is a div
    expect(rootDiv?.nodeName).toBe("DIV");

    // Check if the child content comes before the footer
    expect(rootDiv?.firstChild).toBe(childContent);
    expect(rootDiv?.lastChild).toBe(footer);
  });
});
