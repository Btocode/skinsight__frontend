/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTabs from "../ProductTabs"; // Adjust the import path as needed
import "@testing-library/jest-dom";

// Improved mock for the cn utility that handles objects properly
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => {
    return args
      .filter(Boolean)
      .map((arg) => {
        if (typeof arg === "string") return arg;
        if (typeof arg === "object") {
          return (
            Object.entries(arg)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => Boolean(value))
              .map(([key]) => key)
              .join(" ")
          );
        }
        return "";
      })
      .join(" ");
  },
}));

// Mock the MatchesProductCard component - simplified since it's tested elsewhere
jest.mock("../../../_components/MatchesProductCard", () => ({
  MatchesProductCard: ({ item }: any) => (
    <div data-testid="product-card" className="product-card-mock">
      {item.brand}
    </div>
  ),
}));

describe("ProductTabs Component", () => {
  /**
   * Test case: Initial render
   *
   * Verifies that the component renders correctly with:
   * - Both tabs present
   * - First tab ("Top alternatives") selected by default
   * - Correct number of product cards
   */
  it("renders correctly with default tab selected", () => {
    render(<ProductTabs />);

    // Check if both tabs are rendered
    const topAlternativesTab = screen.getByText("Top alternatives");
    const buildRegimenTab = screen.getByText("Build your regimen");
    expect(topAlternativesTab).toBeInTheDocument();
    expect(buildRegimenTab).toBeInTheDocument();

    // Instead of checking specific classes, check for the active indicator
    // which is a more reliable way to determine if a tab is active
    const activeIndicator = screen
      .getByText("Top alternatives")
      .closest("button")
      ?.querySelector("span");
    expect(activeIndicator).toBeInTheDocument();

    // The second tab should not have an active indicator
    const secondTabIndicator = screen
      .getByText("Build your regimen")
      .closest("button")
      ?.querySelector("span");
    expect(secondTabIndicator).toBeNull();

    // Check if the correct number of product cards are rendered
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(3);
  });

  /**
   * Test case: Tab switching
   *
   * Verifies that clicking on a tab:
   * - Updates the active tab indicator
   */
  it("switches tabs when clicked", () => {
    render(<ProductTabs />);

    const topAlternativesTab = screen.getByText("Top alternatives");
    const buildRegimenTab = screen.getByText("Build your regimen");

    // Initially, the first tab should have the indicator
    expect(
      topAlternativesTab.closest("button")?.querySelector("span")
    ).toBeInTheDocument();
    expect(buildRegimenTab.closest("button")?.querySelector("span")).toBeNull();

    // Click on the second tab
    fireEvent.click(buildRegimenTab);

    // Now the second tab should have the indicator
    expect(
      topAlternativesTab.closest("button")?.querySelector("span")
    ).toBeNull();
    expect(
      buildRegimenTab.closest("button")?.querySelector("span")
    ).toBeInTheDocument();

    // Click back on the first tab
    fireEvent.click(topAlternativesTab);

    // Now the first tab should have the indicator again
    expect(
      topAlternativesTab.closest("button")?.querySelector("span")
    ).toBeInTheDocument();
    expect(buildRegimenTab.closest("button")?.querySelector("span")).toBeNull();
  });

  /**
   * Test case: Grid layout
   *
   * Verifies that the product grid has the correct layout classes
   */
  it("has the correct grid layout classes", () => {
    render(<ProductTabs />);

    // Find the grid container (parent of the product cards)
    const productGrid = screen.getAllByTestId("product-card")[0].parentElement;

    // Check for the presence of grid classes without relying on exact class strings
    expect(productGrid?.className).toContain("grid");
    expect(productGrid?.className).toContain("grid-cols-2");
    expect(productGrid?.className).toContain("lg:grid-cols-3");
  });

  /**
   * Test case: Product data passing
   *
   * Verifies that the correct number of products are rendered
   * without testing the internal functionality of MatchesProductCard
   */
  it("renders the correct number of products", () => {
    render(<ProductTabs />);

    // Check that we have 3 products rendered
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(3);

    // Verify the brands are present (basic check that data is passed correctly)
    expect(screen.getByText("CHANTECAILLE")).toBeInTheDocument();
    expect(screen.getByText("June Jacobs")).toBeInTheDocument();
    expect(screen.getByText("SKINN")).toBeInTheDocument();
  });
});
