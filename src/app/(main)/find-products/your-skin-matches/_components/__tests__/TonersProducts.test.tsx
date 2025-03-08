import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Product } from "@/types/products";
import TonersProducts from "../TonersProducts";

// Sample product data for Toners
const mockProducts: Product[] = [
  {
    id: "1",
    productImage: "/tonner1.png",
    productTitle: "Tonner 1",
    brand: "Brand A",
    price: "20",
    matched: true,
    most_viewed: false,
    best_rated: true,
  },
  {
    id: "2",
    productImage: "/tonner2.png",
    productTitle: "Tonner 2",
    brand: "Brand B",
    price: "25",
    matched: false,
    most_viewed: true,
    best_rated: false,
  },
  {
    id: "3",
    productImage: "/tonner3.png",
    productTitle: "Tonner 3",
    brand: "Brand C",
    price: "30",
    matched: true,
    most_viewed: true,
    best_rated: true,
  },
];

// Step 1: Mock the MatchesProductCard component
jest.mock("../MatchesProductCard", () => ({
  MatchesProductCard: ({ item }: { item: Product }) => (
    <div data-testid="product-card" data-product-id={item.productTitle}>
      {item.productTitle}
    </div>
  ),
}));

// Step 2: Mock the Lucide icons
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <div data-testid="chevron-left-toners">ChevronLeft</div>,
  ChevronRight: () => (
    <div data-testid="chevron-right-toners">ChevronRight</div>
  ),
}));

describe("TonersProducts Component", () => {
  // Step 3: Set up the test environment
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock Element.scrollBy, Element.scrollWidth, and Element.scrollLeft
    Element.prototype.scrollBy = jest.fn();
    Object.defineProperty(Element.prototype, "scrollWidth", {
      configurable: true,
      get: jest.fn().mockReturnValue(1200),
    });
    Object.defineProperty(Element.prototype, "scrollLeft", {
      configurable: true,
      get: jest.fn().mockReturnValue(400),
      set: jest.fn(),
    });
    Object.defineProperty(Element.prototype, "clientWidth", {
      configurable: true,
      get: jest.fn().mockReturnValue(300),
    });
    Object.defineProperty(Element.prototype, "firstElementChild", {
      configurable: true,
      get: jest.fn().mockReturnValue({
        clientWidth: 300,
      }),
    });
  });

  // Step 4: Render the component with mock product data
  it("renders the component with the correct title", () => {
    render(<TonersProducts products={mockProducts} />);

    // Check if the title is rendered
    const title = screen.getByText("Toners");
    expect(title).toBeInTheDocument();
  });

  // Step 5: Ensure that duplicated products are rendered correctly
  it("renders the correct number of product cards (3x duplicated)", () => {
    render(<TonersProducts products={mockProducts} />);

    // Check if the products are rendered (3 products x 3 duplications)
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(9);
  });

  // Step 6: Test navigation buttons
  it("renders navigation buttons", () => {
    render(<TonersProducts products={mockProducts} />);

    // Check if navigation buttons are rendered with correct test IDs
    const leftButton = screen.getByTestId("chevron-left-toners");
    const rightButton = screen.getByTestId("chevron-right-toners");

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  // Step 7: Test the scroll functionality
  it("slides left when left button is clicked", () => {
    render(<TonersProducts products={mockProducts} />);

    // Find the left button and click it
    const leftButton = screen
      .getByTestId("chevron-left-toners")
      .closest("button");
    fireEvent.click(leftButton!);

    // Check if scrollBy was called with the correct parameters
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: -320, // 300 (card width) + 20 (gap)
      behavior: "smooth",
    });
  });

  // Step 8: Test the scroll functionality
  it("slides right when right button is clicked", () => {
    render(<TonersProducts products={mockProducts} />);

    // Find the right button and click it
    const rightButton = screen
      .getByTestId("chevron-right-toners")
      .closest("button");
    fireEvent.click(rightButton!);

    // Check if scrollBy was called with the correct parameters
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: 320, // 300 (card width) + 20 (gap)
      behavior: "smooth",
    });
  });

  // Step 9: Ensure that duplicated products are rendered correctly
  it("duplicates products correctly", () => {
    render(<TonersProducts products={mockProducts} />);

    // Get all product cards
    const productCards = screen.getAllByTestId("product-card");

    // Check if the products are duplicated correctly
    // First set of 3 products
    expect(productCards[0]).toHaveAttribute("data-product-id", "Tonner 1");
    expect(productCards[1]).toHaveAttribute("data-product-id", "Tonner 2");
    expect(productCards[2]).toHaveAttribute("data-product-id", "Tonner 3");

    // Second set of 3 products
    expect(productCards[3]).toHaveAttribute("data-product-id", "Tonner 1");
    expect(productCards[4]).toHaveAttribute("data-product-id", "Tonner 2");
    expect(productCards[5]).toHaveAttribute("data-product-id", "Tonner 3");

    // Third set of 3 products
    expect(productCards[6]).toHaveAttribute("data-product-id", "Tonner 1");
    expect(productCards[7]).toHaveAttribute("data-product-id", "Tonner 2");
    expect(productCards[8]).toHaveAttribute("data-product-id", "Tonner 3");
  });
});
