import { render, screen, fireEvent } from "@testing-library/react";
import TonersProducts from "../TonersProducts";

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("../MatchesProductCard", () => ({ item }: { item: any }) => (
  <div data-testid="product-card">{item.productTitle}</div>
));

describe("TonersProducts Component", () => {
  const productsMock = [
    {
      productTitle: "Toner 1",
      productImage: "/toner1.jpg",
      brand: "Brand A",
      price: "10.99",
      matched: true,
      best_rated: false,
      most_viewed: false,
    },
    {
      productTitle: "Toner 2",
      productImage: "/toner2.jpg",
      brand: "Brand B",
      price: "15.99",
      matched: false,
      best_rated: true,
      most_viewed: false,
    },
    {
      productTitle: "Toner 3",
      productImage: "/toner3.jpg",
      brand: "Brand C",
      price: "20.99",
      matched: false,
      best_rated: false,
      most_viewed: true,
    },
  ];

  it("renders correctly with product titles", () => {
    render(<TonersProducts products={productsMock} />);

    expect(screen.getByText("Toners")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card").length).toBeGreaterThanOrEqual(
      productsMock.length
    );
  });

  it("handles left and right slide buttons", () => {
    render(<TonersProducts products={productsMock} />);

    const leftButton = screen.getByRole("button", { name: /left/i });
    const rightButton = screen.getByRole("button", { name: /right/i });

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    // No errors should occur when clicking buttons
  });

  it("duplicates products for infinite scroll", () => {
    render(<TonersProducts products={productsMock} />);
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards.length).toBe(productsMock.length * 3); // Duplicated 3 times
  });
});
