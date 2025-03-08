import { render, screen, waitFor } from "@testing-library/react";
import YourSkinMatchesPage from "../page"; // Adjust the import according to your project structure
import { notFound } from "next/navigation";
import { Product } from "@/types/products";

// Mocking the API call and other components used in the page
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("../_components/MatchesProductFilter", () => {
  const MatchesProductFilter = () => <div>MatchesProductFilter</div>;
  MatchesProductFilter.displayName = "MatchesProductFilter";
  return MatchesProductFilter;
});

jest.mock("../_components/MatchesProductHeader", () => {
  const MatchesProductHeader = () => <div>MatchesProductHeader</div>;
  MatchesProductHeader.displayName = "MatchesProductHeader";
  return MatchesProductHeader;
});

jest.mock("../_components/TonersProducts", () => {
  const TonersProducts = ({ products }: { products: Product[] }) => (
    <div>{`TonersProducts: ${products.length}`}</div>
  );
  TonersProducts.displayName = "TonersProducts";
  return TonersProducts;
});
jest.mock("../_components/CleansersProducts", () => {
  const CleansersProducts = ({ products }: { products: Product[] }) => (
    <div>{`CleansersProducts: ${products.length}`}</div>
  );
  CleansersProducts.displayName = "CleansersProducts";
  return CleansersProducts;
});
jest.mock("../_components/MoisturisersProducts", () => {
  const MoisturisersProducts = ({ products }: { products: Product[] }) => (
    <div>{`MoisturisersProducts: ${products.length}`}</div>
  );
  MoisturisersProducts.displayName = "MoisturisersProducts";
  return MoisturisersProducts;
});

jest.mock("@/components/common/Advertisement", () => <div>Advertisement</div>);
jest.mock("@/components/common/GradientImage", () => <div>GradientImage</div>);
jest.mock("../_components/AddFavorite", () => <div>AddFavorite</div>);
jest.mock("@/components/common/Button", () => {
  const Button = ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  );
  Button.displayName = "Button";
  return Button;
});
jest.mock("next/link", () => {
  const Link = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Link.displayName = "Link";
  return Link;
});

describe("YourSkinMatchesPage", () => {
  // Step 1: Setup test data for the products
  const mockProducts = [
    [{ id: "1", productTitle: "Cleanser 1" }],
    [{ id: "2", productTitle: "Toner 1" }],
    [{ id: "3", productTitle: "Moisturiser 1" }],
  ];

  // Step 2: Mock the `getProducts` function to return the mock data
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProducts),
    });
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProducts),
    });
  });

  // Step 3: Test case to ensure the page renders correctly when products are available
  it("renders the page with products", async () => {
    render(<YourSkinMatchesPage />);

    // Step 3.1: Verify if the header "Top products for you" is rendered
    const header = screen.getByText("Top products for you");
    expect(header).toBeInTheDocument();

    // Step 3.2: Verify that the child components (like MatchesProductFilter, MatchesProductHeader) are rendered
    expect(screen.getByText("MatchesProductFilter")).toBeInTheDocument();
    expect(screen.getByText("MatchesProductHeader")).toBeInTheDocument();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Step 3.3: Check if the product components are rendered with the correct product count
    await waitFor(() => {
      expect(screen.getByText("TonersProducts: 1")).toBeInTheDocument();
      expect(screen.getByText("CleansersProducts: 1")).toBeInTheDocument();
      expect(screen.getByText("MoisturisersProducts: 1")).toBeInTheDocument();
    });

    // Step 3.4: Verify if Advertisement and GradientImage components are rendered
    expect(screen.getByText("Advertisement")).toBeInTheDocument();
    expect(screen.getByText("GradientImage")).toBeInTheDocument();

    // Step 3.5: Check if AddFavorite component is rendered
    expect(screen.getByText("AddFavorite")).toBeInTheDocument();
  });

  // Step 4: Test case when no products are available (API returns empty array)
  it("calls notFound when no products are found", async () => {
    // Mock the API response to return an empty array
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    // Render the page
    render(<YourSkinMatchesPage />);

    // Step 4.1: Verify if the notFound function is called
    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  // Step 5: Test the "Retake" button in the page
  it("renders and tests the 'Retake' button", async () => {
    render(<YourSkinMatchesPage />);

    // Step 5.1: Check if the "Retake" button is present
    const retakeButton = screen.getByText("Retake");
    expect(retakeButton).toBeInTheDocument();
  });
});
