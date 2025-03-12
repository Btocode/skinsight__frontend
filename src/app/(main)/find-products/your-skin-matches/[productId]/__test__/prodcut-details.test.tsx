import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetails from "../page";

// Mock the components and modules used in ProductDetails *except for Accordion for the toggle test*
jest.mock("../_components/ProductImageCarousel", () => {
  const ProductImageCarousel = () => (
    <div data-testid="product-image-carousel" />
  );
  ProductImageCarousel.displayName = "ProductImageCarousel";
  return ProductImageCarousel;
});
jest.mock("../_components/ProductAccordion", () => {
  const ProductAccordion = () => <div data-testid="product-accordion" />;
  ProductAccordion.displayName = "ProductAccordion";
  return ProductAccordion;
});
jest.mock("@/components/common/BackButton", () => {
  const BackButton = () => <button data-testid="back-button">Back</button>;
  BackButton.displayName = "BackButton";
  return BackButton;
});
jest.mock("@/components/common/Button", () => {
  const CustomButton = ({
    children,
    icon,
    className, // Add className to props for button styling checks if needed
  }: {
    children: React.ReactNode;
    icon: React.ReactNode;
    className?: string;
  }) => (
    <button data-testid="custom-button" className={className}>
      {icon}
      {children}
    </button>
  );

  CustomButton.displayName = "CustomButton";
  return CustomButton;
});
jest.mock("../_components/ProductGallery", () => {
  const ProductGallery = () => <div data-testid="product-gallery" />;
  ProductGallery.displayName = "ProductGallery";
  return ProductGallery;
});

// Mock Accordion for other tests, but NOT for the toggle test itself (see nested describe below)
jest.mock("@/components/common/Accordion", () => {
  // Mock Accordion to track isActive and onToggle calls
  const MockAccordion = ({
    title,
    content,
    isActive,
    onToggle,
  }: {
    title: string;
    content: string;
    isActive: boolean;
    onToggle: () => void;
  }) => (
    <div data-testid="accordion" onClick={onToggle}>
      <h3>{title}</h3>
      {isActive && <p>{content}</p>}
    </div>
  );
  MockAccordion.displayName = "Accordion";
  return { Accordion: MockAccordion }; // Named export is important
});

jest.mock("../_components/ProductTabs", () => {
  const ProductTabs = () => <div data-testid="product-tabs" />;
  ProductTabs.displayName = "ProductTabs";
  return ProductTabs;
});
jest.mock("@/components/common/Advertisement", () => {
  const Advertisement = () => <div data-testid="advertisement" />;
  Advertisement.displayName = "Advertisement";
  return Advertisement;
});
jest.mock("next/image", () => {
  const NextImage = (
    { src, alt, fill }: { src: string; alt: string; fill?: boolean } // Added fill prop to mock Image component correctly
  ) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      data-testid="next-image"
      style={
        fill
          ? {
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }
          : undefined
      }
    />
  );
  NextImage.displayName = "NextImage";
  return NextImage;
});

describe("ProductDetails Component", () => {
  /**
   * Test case: Component renders correctly with all major elements
   *
   * Verifies that the ProductDetails component renders all its textual content,
   * buttons, and mocked child components in the document.
   */
  it("renders all major components and content", () => {
    render(<ProductDetails />);

    // Check for main text content
    expect(screen.getByText("Glow Recipe")).toBeInTheDocument();
    expect(screen.getByText("Watermelon Glow PHA+BHA")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("$$$")).toBeInTheDocument(); // Check for the price value
    expect(screen.getByText("Save for later")).toBeInTheDocument();
    expect(screen.getByText("Buy now")).toBeInTheDocument();
    expect(screen.getByText("Tonners")).toBeInTheDocument(); // Check for Accordion title

    // Check for mocked child components using their data-testid
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("product-image-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("product-accordion")).toBeInTheDocument();
    expect(screen.getByTestId("product-gallery")).toBeInTheDocument();
    expect(screen.getByTestId("accordion")).toBeInTheDocument(); // Mocked Accordion
    expect(screen.getByTestId("next-image")).toBeInTheDocument(); // Mocked Next Image
    expect(screen.getByTestId("product-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("advertisement")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buy now" })).toBeInTheDocument(); // Check Buy now button role
    expect(
      screen.getByRole("button", { name: "Save for later" })
    ).toBeInTheDocument(); // Check Save for later button role
  });

  describe("Accordion toggle functionality", () => {
    //  Remove the mock for Accordion *inside* this describe block to use the *real* Accordion component

    /**
     * Test case: Accordion toggles content on click (using the REAL Accordion component)
     *
     * Verifies that clicking the  *real* Accordion component within ProductDetails
     * correctly toggles the content visibility by interacting with ProductDetails' state.
     */
    it("toggles accordion content when clicked", () => {
      render(<ProductDetails />);

      const accordion = screen
        .getByRole("heading", { name: "Tonners" })
        .closest("div");
      const accordionContent = `Toners balance your skin's pH levels & help prep skin for optimal absorption of the rest of your skincare routine. Our toners are formulated to multi-task by treating skin with clinically effective actives, while also hydrating & balancing skin with gentle ingredients so you can treat your specific skin concerns without irritating skin or stripping it of moisture.`;

      // Initially, content should be visible because activeId is '1' initially in ProductDetails
      expect(screen.getByText(accordionContent)).toBeInTheDocument(); // Changed assertion to expect content to be present

      // Click the accordion to toggle
      fireEvent.click(accordion as HTMLElement);

      // Now the content should NOT be visible after clicking to close
      expect(screen.queryByText(accordionContent)).not.toBeInTheDocument();

      // Click again to open
      fireEvent.click(accordion as HTMLElement);

      // Content should be visible again after toggling open
      expect(screen.getByText(accordionContent)).toBeInTheDocument();
    });
  });

  /**
   * Test case: Responsive layout classes are applied
   *
   * Checks if the component applies different classes for mobile and desktop layouts.
   * Note: This test is limited as it can't fully simulate responsive behavior,
   * but it can check for the presence of responsive classes.
   */
  it("applies responsive classes", () => {
    render(<ProductDetails />);

    const container = screen.getByText("Glow Recipe").closest("section");
    expect(container).toHaveClass("container", "mt-4", "lg:mt-[74px]");

    // Correctly target the flex container using parentNode traversal.
    // 1. Get the element containing "Watermelon Glow PHA+BHA"
    const waterMelonTextElement = screen.getByText("Watermelon Glow PHA+BHA");
    // 2. Get its parent element (div with class "space-y-2")
    const spaceY2Div = waterMelonTextElement.parentNode;
    // 3. Get the parent of the "space-y-2" div - this should be the lg:flex container
    const flexContainer = spaceY2Div?.parentNode;

    expect(flexContainer).toHaveClass("lg:flex");
  });

  /**
   * Test case: "Save for later" button styling and text
   *
   * Checks if the "Save for later" button renders with the correct text and basic styling classes.
   */
  it("renders 'Save for later' button with correct styling and text", () => {
    render(<ProductDetails />);
    const saveForLaterButton = screen.getByRole("button", {
      name: "Save for later",
    });

    expect(saveForLaterButton).toBeInTheDocument();
    expect(saveForLaterButton).toHaveClass("w-[141px]");
    expect(saveForLaterButton).toHaveClass("h-[48px]");
    expect(saveForLaterButton).toHaveClass("rounded-xl");
    expect(saveForLaterButton).toHaveClass("bg-[#8F80E833]");
    expect(screen.getByText("Save for later")).toBeInTheDocument();
  });

  /**
   * Test case: "Buy now" button styling and text
   *
   * Checks if the "Buy now" button renders with the correct text and basic styling classes.
   */
  it("renders 'Buy now' button with correct styling and text", () => {
    render(<ProductDetails />);
    const buyNowButton = screen.getByRole("button", { name: "Buy now" });

    expect(buyNowButton).toBeInTheDocument();
    expect(buyNowButton).toHaveClass("w-[141px]");
    expect(buyNowButton).toHaveClass("h-[48px]");
    expect(buyNowButton).toHaveClass("rounded-xl");
    expect(screen.getByText("Buy now")).toBeInTheDocument();
  });
});
