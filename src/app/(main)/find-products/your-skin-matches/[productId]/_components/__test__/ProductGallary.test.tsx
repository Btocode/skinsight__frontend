"use client";

import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductGallery, { galleryItems } from "../ProductGallery";

// Mock the dependencies
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src || "/placeholder.svg"} alt={alt} />
  ),
}));

jest.mock("@/components/common/Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("../GalleryModal", () => ({
  __esModule: true,
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? (
      <div data-testid="gallery-modal">
        Gallery Modal <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("ProductGallery Component", () => {
  /**
   * Test case: Component renders all gallery items
   *
   * Verifies that all gallery items are rendered with correct images and labels
   */
  it("renders all gallery items", () => {
    render(<ProductGallery />);

    const galleryImages = screen.getAllByRole("img");
    expect(galleryImages).toHaveLength(galleryItems.length);

    // Count occurrences of each label in galleryItems
    const labelCounts = galleryItems.reduce((acc, item) => {
      acc[item.label] = (acc[item.label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Check if the correct number of each label is rendered
    Object.entries(labelCounts).forEach(([label, count]) => {
      const renderedLabels = screen.getAllByText(label);
      expect(renderedLabels).toHaveLength(count);
    });
  });

  /**
   * Test case: Clicking on a gallery item calls setGalleryItem
   *
   * Verifies that clicking on a gallery item calls setGalleryItem
   */
  it("calls setGalleryItem when clicking on a gallery item", () => {
    render(<ProductGallery />);

    const firstGalleryItem = screen.getAllByRole("img")[0];
    fireEvent.click(firstGalleryItem);

    // This assumes you've mocked GalleryModal to set a data-testid when it's open
    expect(screen.getByTestId("gallery-modal")).toBeInTheDocument();
  });

  /**
   * Test case: Scroll button is rendered
   *
   * Checks if the scroll button is present in the document
   */
  it("renders scroll button", () => {
    render(<ProductGallery />);

    const scrollButton = screen.getByRole("button", { name: /scroll right/i });
    expect(scrollButton).toBeInTheDocument();
  });

  /**
   * Test case: Clicking on a gallery item opens the modal
   *
   * Verifies that clicking on a gallery item opens the GalleryModal
   */
  it("opens modal when clicking on a gallery item", () => {
    render(<ProductGallery />);

    const firstGalleryItem = screen.getAllByRole("img")[0];
    fireEvent.click(firstGalleryItem);

    expect(screen.getByTestId("gallery-modal")).toBeInTheDocument();
  });

  /**
   * Test case: Closing the modal
   *
   * Checks if the modal can be closed after being opened
   */
  it("closes modal", () => {
    render(<ProductGallery />);

    const firstGalleryItem = screen.getAllByRole("img")[0];
    fireEvent.click(firstGalleryItem);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("gallery-modal")).not.toBeInTheDocument();
  });

  /**
   * Test case: Scroll functionality
   *
   * Verifies that the scroll function is called when the scroll button is clicked
   */
  it("calls scroll function when scroll button is clicked", () => {
    const scrollByMock = jest.fn();
    Element.prototype.scrollBy = scrollByMock;

    render(<ProductGallery />);

    const scrollButton = screen.getByRole("button", { name: /scroll right/i });
    fireEvent.click(scrollButton);

    expect(scrollByMock).toHaveBeenCalledWith({
      left: 200,
      behavior: "smooth",
    });
  });
});
