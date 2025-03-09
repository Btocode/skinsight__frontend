import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductGallery from '../ProductGallary';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({
    children,
    variant,
    size,
    className,
    onClick
  }: {
    children: React.ReactNode,
    variant?: string,
    size?: string,
    className?: string,
    onClick?: () => void
  }) => (
    <button
      data-testid="scroll-button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
    className
  }: {
    src: string,
    alt: string,
    fill?: boolean,
    className?: string
  }) => (
    <img
      src={src}
      alt={alt}
      data-testid={`gallery-image-${alt.toLowerCase().replace(/\s+/g, '-')}-${src.split('/').pop()?.replace(/\./g, '-')}`}
      className={className}
      style={fill ? { objectFit: 'cover' } : {}}
    />
  ),
}));

jest.mock('../GalleryModal', () => ({
  __esModule: true,
  default: ({
    open,
    onClose
  }: {
    open: boolean,
    onClose: () => void
  }) => (
    <div
      data-testid="gallery-modal"
      data-open={open.toString()}
      onClick={onClose}
    >
      Gallery Modal
    </div>
  ),
}));

describe('ProductGallery', () => {
  beforeEach(() => {
    // Mock scrollBy function
    Element.prototype.scrollBy = jest.fn();
  });

  it('renders the gallery with correct heading', () => {
    render(<ProductGallery />);

    // Check the heading
    expect(screen.getByText('See it in action')).toBeInTheDocument();
    expect(screen.getByText('See it in action')).toHaveClass('text-base leading-[24px] tracking-[-0.02em] lg:text-2xl font-semibold mb-4 lg:mb-6 text-accent');
  });

  it('renders all gallery items', () => {
    render(<ProductGallery />);

    // Check that all gallery items are rendered
    const reviewItems = screen.getAllByText('Review');
    expect(reviewItems).toHaveLength(3);

    const howToUseItems = screen.getAllByText('How to use');
    expect(howToUseItems).toHaveLength(3);

    const tonerHacksItems = screen.getAllByText('Toner hacks');
    expect(tonerHacksItems).toHaveLength(3);

    const tonersItems = screen.getAllByText('Toners');
    expect(tonersItems).toHaveLength(3);
  });

  it('renders gallery images with correct attributes', () => {
    render(<ProductGallery />);

    // Use a specific image with a unique test ID
    const reviewImage = screen.getByTestId('gallery-image-review-img1-png');
    expect(reviewImage).toBeInTheDocument();
    expect(reviewImage).toHaveAttribute('src', '/actions/img1.png');
    expect(reviewImage).toHaveClass('object-cover');

    // Check another image
    const howToUseImage = screen.getByTestId('gallery-image-how-to-use-img2-png');
    expect(howToUseImage).toBeInTheDocument();
    expect(howToUseImage).toHaveAttribute('src', '/actions/img2.png');
    expect(howToUseImage).toHaveClass('object-cover');
  });

  it('scrolls right when the scroll button is clicked', () => {
    render(<ProductGallery />);

    // Click the scroll button
    fireEvent.click(screen.getByTestId('scroll-button'));

    // Check that scrollBy was called with the correct arguments
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: 200,
      behavior: 'smooth',
    });
  });

  it('opens the gallery modal when an item is clicked', () => {
    render(<ProductGallery />);

    // Initially the modal should be closed
    const modal = screen.getByTestId('gallery-modal');
    expect(modal).toHaveAttribute('data-open', 'false');

    // Get the first gallery item's image container and click it
    const galleryItemContainer = screen.getByTestId('gallery-image-review-img1-png').closest('div')?.parentElement;
    fireEvent.click(galleryItemContainer!);

    // The modal should now be open
    expect(modal).toHaveAttribute('data-open', 'true');
  });

  it('closes the gallery modal when onClose is called', () => {
    render(<ProductGallery />);

    // Get the first gallery item's image container and click it to open the modal
    const galleryItemContainer = screen.getByTestId('gallery-image-review-img1-png').closest('div')?.parentElement;
    fireEvent.click(galleryItemContainer!);

    // The modal should be open
    const modal = screen.getByTestId('gallery-modal');
    expect(modal).toHaveAttribute('data-open', 'true');

    // Click the modal to close it
    fireEvent.click(modal);

    // The modal should now be closed
    expect(modal).toHaveAttribute('data-open', 'false');
  });

  it('renders the scroll container with correct classes', () => {
    render(<ProductGallery />);

    // Check the scroll container
    const scrollContainer = screen.getByTestId('scroll-button').parentElement?.firstChild;
    expect(scrollContainer).toHaveClass('flex gap-2 lg:gap-4 overflow-x-auto scroll-smooth hide-scrollbar');
  });

  it('renders each gallery item with correct structure', () => {
    render(<ProductGallery />);

    // Get the first gallery item
    const galleryItem = screen.getAllByText('Review')[0].closest('div');
    expect(galleryItem).toHaveClass('flex flex-col items-center flex-shrink-0');

    // Check the outer circle
    const outerCircle = galleryItem?.firstChild;
    expect(outerCircle).toHaveClass('w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full border-2 border-rose-300 flex items-center justify-center overflow-hidden mb-2');

    // Check the inner circle
    const innerCircle = outerCircle?.firstChild;
    expect(innerCircle).toHaveClass('w-[45px] lg:w-[55px] h-[45px] lg:h-[55px] rounded-full border-2 border-gray-50 overflow-hidden relative');

    // Check the label
    const label = galleryItem?.lastChild;
    expect(label).toHaveClass('text-sm text-gray-600');
    expect(label).toHaveTextContent('Review');
  });
});