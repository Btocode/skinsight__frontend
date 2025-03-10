import { render, screen } from "@testing-library/react";
import YourSkinMatchesPage from "../page"; // Adjust the import path as needed
import { notFound } from "next/navigation";
import { Product } from "@/types/products";

// Mock the Next.js navigation functions
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock child components to simplify testing
jest.mock("../_components/MatchesProductHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="matches-product-header">Mocked Header</div>,
}));

jest.mock("../_components/MatchesProductFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="matches-product-filter">Mocked Filter</div>,
}));

jest.mock("../_components/TonersProducts", () => ({
  __esModule: true,
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="toners-products">
      Mocked Toners Products: {products?.length || 0}
    </div>
  ),
}));

jest.mock("../_components/CleansersProducts", () => ({
  __esModule: true,
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="cleansers-products">
      Mocked Cleansers Products: {products?.length || 0}
    </div>
  ),
}));

jest.mock("../_components/MoisturisersProducts", () => ({
  __esModule: true,
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="moisturisers-products">
      Mocked Moisturisers Products: {products?.length || 0}
    </div>
  ),
}));

jest.mock("@/components/common/Advertisement", () => ({
  __esModule: true,
  default: () => <div data-testid="advertisement">Mocked Advertisement</div>,
}));

jest.mock("@/components/common/GradientImage", () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Mocked Gradient Image</div>,
}));

jest.mock("../_components/AddFavorite", () => ({
  __esModule: true,
  default: () => <div data-testid="add-favorite">Mocked Add Favorite</div>,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock the fetch function
global.fetch = jest.fn();

describe("YourSkinMatchesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case: Component renders successfully with products
   *
   * This test verifies that when products are returned from the API,
   * the component renders all expected child components with the correct data.
   */
  it("renders the page with products correctly", async () => {
    // Mock successful API response with sample products
    const mockProducts = [
      [
        { id: 1, name: "Cleanser 1" },
        { id: 2, name: "Cleanser 2" },
      ],
      [
        { id: 3, name: "Toner 1" },
        { id: 4, name: "Toner 2" },
      ],
      [
        { id: 5, name: "Moisturiser 1" },
        { id: 6, name: "Moisturiser 2" },
      ],
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });

    // Render the component
    const { findByTestId } = render(await YourSkinMatchesPage());

    // Verify API was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/your-skin-matches"
    );

    // Verify all components are rendered
    expect(await findByTestId("matches-product-header")).toBeInTheDocument();
    expect(await findByTestId("matches-product-filter")).toBeInTheDocument();
    expect(await findByTestId("toners-products")).toBeInTheDocument();
    expect(await findByTestId("cleansers-products")).toBeInTheDocument();
    expect(await findByTestId("moisturisers-products")).toBeInTheDocument();
    expect(await findByTestId("gradient-image")).toBeInTheDocument();
    expect(await findByTestId("add-favorite")).toBeInTheDocument();

    // Verify the heading text
    expect(screen.getByText("Top products for you")).toBeInTheDocument();

    // Verify the retake button is rendered
    expect(screen.getByText("Retake")).toBeInTheDocument();
  });

  /**
   * Test case: notFound is called when products array is empty
   *
   * This test verifies that the notFound function is called
   * when the API returns an empty products array.
   */
  it("calls notFound when products array is empty", async () => {
    // Mock API response with empty products array
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    // Attempt to render the component
    try {
      await YourSkinMatchesPage();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      // Expected to throw since notFound() is called
    }

    // Verify notFound was called
    expect(notFound).toHaveBeenCalled();
  });

  /**
   * Test case: Handles API error gracefully
   *
   * This test verifies that the component handles API errors appropriately.
   */
  it("handles API errors gracefully", async () => {
    // Mock API failure
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    // Expect the component to throw an error when rendered
    await expect(YourSkinMatchesPage()).rejects.toThrow("API error");
  });

  /**
   * Test case: Passes correct data to child components
   *
   * This test verifies that the correct product data is passed to each
   * product component (Toners, Cleansers, Moisturisers).
   */
  it("passes correct data to child components", async () => {
    // Mock successful API response with sample products
    const mockProducts = [
      [
        { id: 1, name: "Cleanser 1" },
        { id: 2, name: "Cleanser 2" },
      ],
      [
        { id: 3, name: "Toner 1" },
        { id: 4, name: "Toner 2" },
      ],
      [
        { id: 5, name: "Moisturiser 1" },
        { id: 6, name: "Moisturiser 2" },
      ],
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });

    // Render the component
    render(await YourSkinMatchesPage());

    // Check that each product component receives the correct data
    expect(screen.getByTestId("cleansers-products").textContent).toContain("2");
    expect(screen.getByTestId("toners-products").textContent).toContain("2");
    expect(screen.getByTestId("moisturisers-products").textContent).toContain(
      "2"
    );
  });
});
