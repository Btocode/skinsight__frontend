"use client";

import type React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryModal from "../GalleryModal"; // Adjust the import path as needed
import "@testing-library/jest-dom";

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
    className: string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src || "/placeholder.svg"} alt={alt} className={className} />,
}));

jest.mock("@/components/common/BackButton", () => ({
  __esModule: true,
  default: ({ buttonProps }: { buttonProps?: { className?: string } }) => (
    <button data-testid="back-button" className={buttonProps?.className || ""}>
      Back
    </button>
  ),
}));

jest.mock("@/components/common/Modal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        <button data-testid="close-button" onClick={onClose}>
          Close
        </button>
        <div>{children}</div>
      </div>
    ) : null,
}));

describe("GalleryModal Component", () => {
  // Test data
  const mockProps = {
    open: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  /**
   * Test case: Component renders correctly when modal is open
   *
   * Verifies that the modal is rendered in the DOM when the open prop is true
   */
  it("renders the modal when open is true", () => {
    // Arrange & Act
    render(<GalleryModal {...mockProps} />);

    // Assert
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  /**
   * Test case: Component does not render when modal is closed
   *
   * Verifies that the modal is not present in the DOM when the open prop is false
   */
  it("does not render the modal when open is false", () => {
    // Arrange & Act
    render(<GalleryModal {...{ ...mockProps, open: false }} />);

    // Assert
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  /**
   * Test case: YouTube iframe renders with correct URL
   *
   * Verifies that the iframe element is present and has the expected YouTube embed URL
   */
  it("renders the YouTube iframe with correct URL", () => {
    // Arrange & Act
    render(<GalleryModal {...mockProps} />);

    // Assert
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/kbVhf9q1AZM"
    );
  });

  /**
   * Test case: Gallery items render correctly
   *
   * Verifies that all 7 gallery items are rendered with the correct alt text
   */
  it("renders all gallery items", () => {
    // Arrange & Act
    render(<GalleryModal {...mockProps} />);

    // Assert - Check if all 7 gallery items are rendered
    const galleryItems = screen.getAllByAltText(
      /Review|How to use|Toner hacks|Toners/
    );
    expect(galleryItems).toHaveLength(7);
  });

  /**
   * Test case: onClose callback is triggered when close button is clicked
   *
   * Verifies that the onClose function is called when the user clicks the close button
   */
  it("calls onClose when close button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<GalleryModal {...mockProps} />);

    // Act
    const closeButton = screen.getByTestId("close-button");
    await user.click(closeButton);

    // Assert
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case: Back button renders with correct class
   *
   * Verifies that the back button is present and has the expected CSS classes
   */
  it("renders the back button with correct class", () => {
    // Arrange & Act
    render(<GalleryModal {...mockProps} />);

    // Assert
    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass("hidden lg:flex");
  });

  /**
   * Test case: Title renders with correct text
   *
   * Verifies that the title elements contain the expected product name
   */
  it("renders the title with correct text", () => {
    // Arrange & Act
    render(<GalleryModal {...mockProps} />);

    // Assert
    const titles = screen.getAllByText("Watermelon Glow PHA+BHA");
    expect(titles.length).toBeGreaterThan(0);
  });
});
