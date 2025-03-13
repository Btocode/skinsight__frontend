import { render, screen } from "@testing-library/react";
import SkeletonLoader from "../loading";

// Mock the imported components
jest.mock("@/components/common/Skeleton", () => ({
  __esModule: true,
  default: ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="skeleton" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("@/components/common/GradientImage", () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Mocked Gradient Image</div>,
}));

describe("SkeletonLoader Component", () => {
  /**
   * This test verifies that the SkeletonLoader component renders all expected elements:
   * - The correct number of skeleton elements (11 in total)
   * - The GradientImage component
   */
  it("renders the skeleton loader with all expected elements", () => {
    render(<SkeletonLoader />);

    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements).toHaveLength(11);

    expect(screen.getByTestId("gradient-image")).toBeInTheDocument();
  });

  /**
   * This test focuses on the header section of the SkeletonLoader:
   * - Checks for the presence of five specific skeleton elements
   * - Verifies that each skeleton has the correct CSS classes for sizing and layout
   */
  it("renders the header section with correct skeleton elements", () => {
    render(<SkeletonLoader />);

    const skeletons = screen.getAllByTestId("skeleton");

    expect(skeletons[0]).toHaveClass("w-[100px] h-[30px]");
    expect(skeletons[1]).toHaveClass("w-9/12 lg:w-[500px] h-[50px]");
    expect(skeletons[2]).toHaveClass("w-4/5 lg:w-[450px] h-[40px]");
    expect(skeletons[3]).toHaveClass("w-[100px] h-[40px]");
    expect(skeletons[4]).toHaveClass("w-[100px] h-[40px] ml-4 lg:ml-8");
  });

  /**
   * This test examines the grid of skeleton items:
   * - Verifies that exactly 6 grid items are rendered
   * - Checks that each grid item has the correct CSS classes for sizing
   */
  it("renders a grid with 6 skeleton items", () => {
    render(<SkeletonLoader />);

    const gridItems = screen
      .getAllByTestId("skeleton")
      .filter((item) =>
        item.className.includes("w-full lg:w-[340px] h-[260px] lg:h-[410px]")
      );

    expect(gridItems).toHaveLength(6);
  });

  /**
   * This test checks the overall structure and layout of the SkeletonLoader:
   * - Verifies that the main container has the correct CSS class
   * - Ensures that the GradientImage component is rendered within the component
   */
  it("has the correct overall structure and spacing", () => {
    render(<SkeletonLoader />);

    const mainContainer = screen.getAllByTestId("skeleton")[0].parentElement;

    expect(mainContainer).toHaveClass("space-y-4");

    expect(screen.getByTestId("gradient-image")).toBeInTheDocument();
  });
});
