import { render, screen, fireEvent } from "@testing-library/react";
import ProductImageCarousel from "../ProductImageCarousel";

// Mock the dependencies
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      data-testid={`image-${alt}`}
    />
  ),
}));

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className: string;
  }) => {
    // Create different test IDs based on button position
    const testId = className.includes("left")
      ? "prev-button"
      : className.includes("right")
      ? "next-button"
      : "button";

    return (
      <button onClick={onClick} className={className} data-testid={testId}>
        {children}
      </button>
    );
  },
}));

jest.mock("@/components/common/Tag", () => ({
  __esModule: true,
  default: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => <div data-testid={`tag-${variant}`}>{children}</div>,
}));

describe("ProductImageCarousel Component", () => {
  /**
   * Test case: Component renders correctly
   *
   * Verifies that all initial elements are rendered:
   * - Tags
   * - Images
   * - Navigation buttons
   * - Dot indicators
   */
  it("renders all carousel elements correctly", () => {
    render(<ProductImageCarousel />);

    // Check tags
    expect(screen.getByText("99% matched")).toBeInTheDocument();
    expect(
      screen.getByText("Most loved by your skintwins")
    ).toBeInTheDocument();

    // Check images (3 product images)
    expect(screen.getByTestId("image-product 1")).toBeInTheDocument();
    expect(screen.getByTestId("image-product 2")).toBeInTheDocument();
    expect(screen.getByTestId("image-product 3")).toBeInTheDocument();

    // Check navigation buttons
    expect(screen.getByTestId("prev-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();

    // Check dot indicators (3 dots for 3 images)
    const dots = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !["prev-button", "next-button"].includes(
            button.getAttribute("data-testid") || ""
          )
      );
    expect(dots).toHaveLength(3);

    // First dot should be active initially
    expect(dots[0]).toHaveClass("bg-gray-800");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-300");
  });

  /**
   * Test case: Next button functionality
   *
   * Verifies that clicking the next button:
   * - Updates the active dot indicator
   * - Cycles through images in the correct order
   */
  it("navigates to the next image when clicking the next button", () => {
    render(<ProductImageCarousel />);

    const nextButton = screen.getByTestId("next-button");
    const dots = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !["prev-button", "next-button"].includes(
            button.getAttribute("data-testid") || ""
          )
      );

    // Initially first dot is active
    expect(dots[0]).toHaveClass("bg-gray-800");

    // Click next button
    fireEvent.click(nextButton);

    // Second dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-800");
    expect(dots[2]).toHaveClass("bg-gray-300");

    // Click next button again
    fireEvent.click(nextButton);

    // Third dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-800");
  });

  /**
   * Test case: Previous button functionality
   *
   * Verifies that clicking the previous button:
   * - Updates the active dot indicator
   * - Cycles through images in reverse order
   */
  it("navigates to the previous image when clicking the previous button", () => {
    render(<ProductImageCarousel />);

    const prevButton = screen.getByTestId("prev-button");
    const dots = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !["prev-button", "next-button"].includes(
            button.getAttribute("data-testid") || ""
          )
      );

    // Initially first dot is active
    expect(dots[0]).toHaveClass("bg-gray-800");

    // Click prev button (should wrap to the last image)
    fireEvent.click(prevButton);

    // Last dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-800");
  });

  /**
   * Test case: Dot navigation functionality
   *
   * Verifies that clicking a dot:
   * - Directly navigates to the corresponding image
   * - Updates the active dot indicator correctly
   */
  it("navigates to the correct image when clicking a dot", () => {
    render(<ProductImageCarousel />);

    const dots = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !["prev-button", "next-button"].includes(
            button.getAttribute("data-testid") || ""
          )
      );

    // Click on the second dot
    fireEvent.click(dots[1]);

    // Second dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-800");
    expect(dots[2]).toHaveClass("bg-gray-300");

    // Click on the third dot
    fireEvent.click(dots[2]);

    // Third dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-800");

    // Click on the first dot
    fireEvent.click(dots[0]);

    // First dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-800");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-300");
  });

  /**
   * Test case: Circular navigation
   *
   * Verifies that the carousel wraps around:
   * - From last to first when clicking next at the end
   * - From first to last when clicking prev at the beginning
   */
  it("wraps around when reaching the end or beginning of the carousel", () => {
    render(<ProductImageCarousel />);

    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");
    const dots = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !["prev-button", "next-button"].includes(
            button.getAttribute("data-testid") || ""
          )
      );

    // Navigate to the last image
    fireEvent.click(nextButton); // to second
    fireEvent.click(nextButton); // to third

    // Verify we're at the last image
    expect(dots[2]).toHaveClass("bg-gray-800");

    // Click next again to wrap to the first image
    fireEvent.click(nextButton);

    // First dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-800");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-300");

    // Click prev to wrap to the last image
    fireEvent.click(prevButton);

    // Last dot should now be active
    expect(dots[0]).toHaveClass("bg-gray-300");
    expect(dots[1]).toHaveClass("bg-gray-300");
    expect(dots[2]).toHaveClass("bg-gray-800");
  });
});
