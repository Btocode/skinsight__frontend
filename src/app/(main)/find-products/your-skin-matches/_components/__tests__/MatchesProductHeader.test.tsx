import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { MatchesProductCard } from "../MatchesProductCard";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
jest.mock("next/image", () => ({ fill, ...props }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img {...props} alt={props.alt} />
));

describe("MatchesProductCard", () => {
  const mockPush = jest.fn();
  const productMock = {
    productTitle: "Test Product",
    productImage: "/test-image.jpg",
    brand: "Test Brand",
    price: "99.99",
    matched: true,
    best_rated: false,
    most_viewed: false,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    render(<MatchesProductCard item={productMock} />);

    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  // Product details buttons on click
  it("navigates to product details on click", () => {
    render(<MatchesProductCard item={productMock} />);

    // Click the "Add Favorite" button
    const addFavoriteBtn = screen.getByTestId("add-favorite");
    expect(addFavoriteBtn).toBeInTheDocument();
    fireEvent.click(addFavoriteBtn);

    // Click the "Buy Now" button
    const buyNowBtn = screen.getByTestId("buy-now");
    expect(buyNowBtn).toBeInTheDocument();
    fireEvent.click(buyNowBtn);

    expect(mockPush).toHaveBeenCalledWith(
      "/find-products/your-skin-matches/Test Product"
    );
  });

  it("displays '99% matched' tag if matched", () => {
    render(<MatchesProductCard item={productMock} />);

    expect(screen.getByText("99% matched")).toBeInTheDocument();
  });
});
