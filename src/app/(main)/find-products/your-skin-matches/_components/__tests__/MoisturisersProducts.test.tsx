import { render, screen, fireEvent } from "@testing-library/react";
import MoisturisersProducts from "../MoisturisersProducts";
import { Product } from "@/types/products";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
}));

// Mock the MatchesProductCard component
jest.mock("../MatchesProductCard", () => ({
  MatchesProductCard: ({ item }: { item: Product }) => (
    <div data-testid={`product-card-${item.id}`}>{item.productTitle}</div>
  ),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe("MoisturisersProducts", () => {
  // Sample product data for testing
  const mockProducts: Product[] = [
    {
      id: "1",
      productTitle: "Moisturiser 1",
      productImage: "/image1.jpg",
      brand: "Brand 1",
      price: "19.99",
      matched: true,
      best_rated: false,
      most_viewed: false,
    },
    {
      id: "2",
      productTitle: "Moisturiser 2",
      productImage: "/image2.jpg",
      brand: "Brand 2",
      price: "29.99",
      matched: true,
      best_rated: true,
      most_viewed: false,
    },
    {
      id: "3",
      productTitle: "Moisturiser 3",
      productImage: "/image3.jpg",
      brand: "Brand 3",
      price: "39.99",
      matched: false,
      best_rated: false,
      most_viewed: true,
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock Element.scrollWidth and Element.scrollLeft
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 1200,
    });

    Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
      configurable: true,
      value: 400,
      writable: true,
    });

    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300,
    });

    // Mock scrollBy
    HTMLElement.prototype.scrollBy = jest.fn();
  });

  afterEach(() => {
    // Clean up mocks
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<MoisturisersProducts products={mockProducts} />);
  });

  it("renders the correct heading", () => {
    render(<MoisturisersProducts products={mockProducts} />);
    expect(screen.getByText("Moisturisers")).toBeInTheDocument();
  });

  it("duplicates products for infinite scroll", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    // Should render each product 3 times (3 products × 3 duplications)
    const product1Cards = screen.getAllByText("Moisturiser 1");
    const product2Cards = screen.getAllByText("Moisturiser 2");
    const product3Cards = screen.getAllByText("Moisturiser 3");

    expect(product1Cards).toHaveLength(3);
    expect(product2Cards).toHaveLength(3);
    expect(product3Cards).toHaveLength(3);
  });

  it("renders navigation buttons", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    // Find the left and right navigation buttons
    const leftButton = screen.getByTestId("chevron-left-icon");
    const rightButton = screen.getByTestId("chevron-right-icon");

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it("slides left when left button is clicked", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    // Find the left navigation button and click it
    const leftButton = screen
      .getByTestId("chevron-left-icon")
      .closest("button");
    fireEvent.click(leftButton);

    // Check if scrollBy was called with negative value
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: "smooth",
    });

    // The value should be negative for scrolling left
    const scrollByCall = (HTMLElement.prototype.scrollBy as jest.Mock).mock
      .calls[0][0];
    expect(scrollByCall.left).toBeLessThan(0);
  });

  it("slides right when right button is clicked", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    // Find the right navigation button and click it
    const rightButton = screen
      .getByTestId("chevron-right-icon")
      .closest("button");
    fireEvent.click(rightButton);

    // Check if scrollBy was called with positive value
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: "smooth",
    });

    // The value should be positive for scrolling right
    const scrollByCall = (HTMLElement.prototype.scrollBy as jest.Mock).mock
      .calls[0][0];
    expect(scrollByCall.left).toBeGreaterThan(0);
  });

  it("handles scroll events for infinite scrolling", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    const slider = screen
      .getByTestId("chevron-right-icon")
      .closest("button")?.previousSibling;

    // Mock scrollLeft to be at the beginning
    Object.defineProperty(slider, "scrollLeft", {
      configurable: true,
      value: 0,
      writable: true,
    });

    // Trigger scroll event
    fireEvent.scroll(slider as Element);

    // scrollLeft should be updated to the middle section
    expect(slider).toHaveProperty("scrollLeft", 400);

    // Now mock scrollLeft to be at the end
    Object.defineProperty(slider, "scrollLeft", {
      configurable: true,
      value: 800,
      writable: true,
    });

    // Trigger scroll event again
    fireEvent.scroll(slider as Element);

    // scrollLeft should be reset to the middle section
    expect(slider).toHaveProperty("scrollLeft", 400);
  });

  it("applies correct styling to the container", () => {
    render(<MoisturisersProducts products={mockProducts} />);

    // Check section styling
    const section = screen.getByText("Moisturisers").closest("section");
    expect(section).toHaveClass("mt-[27px]");
    expect(section).toHaveClass("lg:mt-[46px]");
    expect(section).toHaveClass("relative");

    // Check slider container styling
    const sliderContainer = screen
      .getByTestId("chevron-right-icon")
      .closest("button")?.previousSibling;
    expect(sliderContainer).toHaveClass("flex");
    expect(sliderContainer).toHaveClass("overflow-x-scroll");
    expect(sliderContainer).toHaveClass("snap-x");
    expect(sliderContainer).toHaveClass("snap-mandatory");
    expect(sliderContainer).toHaveClass("no-scrollbar");
  });
});
