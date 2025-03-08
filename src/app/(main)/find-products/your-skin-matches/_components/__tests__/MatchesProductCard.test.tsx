import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { MatchesProductCard } from "../MatchesProductCard";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockProduct = {
  productTitle: "Sample Product",
  productImage: "/sample-product.jpg",
  price: "29.99", // Price as string
  brand: "Sample Brand",
  matched: true,
  best_rated: false,
  most_viewed: false,
};

describe("MatchesProductCard", () => {
  const push = jest.fn();

  beforeEach(() => {
    // Step 1: Mock the useRouter to use a testable push function
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  // Step 2: Test if product details are rendered correctly
  it("renders product details correctly", () => {
    render(<MatchesProductCard item={mockProduct} />);
    const productImage = screen.getByTestId("product-image");
    expect(productImage).toBeInTheDocument();
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("Sample Brand")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("99% matched")).toBeInTheDocument();
  });

  // Step 3: Test if product card click triggers navigation
  it("navigates to the product details page when clicked", () => {
    render(<MatchesProductCard item={mockProduct} />);
    const productCard = screen.getByText("Sample Product");
    fireEvent.click(productCard);
    expect(push).toHaveBeenCalledWith(
      "/find-products/your-skin-matches/Sample Product"
    );
  });

  // Step 4: Test if Save for later button works correctly
  it("triggers the Save for later button", () => {
    render(<MatchesProductCard item={mockProduct} />);
    const saveForLaterButton = screen.getByTestId("add-favorite");
    fireEvent.click(saveForLaterButton);
    expect(saveForLaterButton).toBeEnabled();
  });

  // Step 5: Test if Buy now button works correctly
  it("triggers the Buy now button", () => {
    render(<MatchesProductCard item={mockProduct} />);
    const buyNowButton = screen.getByTestId("buy-now");
    fireEvent.click(buyNowButton);
    expect(buyNowButton).toBeEnabled();
  });
});
