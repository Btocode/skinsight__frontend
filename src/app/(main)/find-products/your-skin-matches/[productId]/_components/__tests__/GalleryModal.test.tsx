import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryModal from '../GalleryModal';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: ({ buttonProps }: { buttonProps?: { className?: string } }) => (
    <button
      data-testid="back-button"
      className={buttonProps?.className || ''}
    >
      Back
    </button>
  ),
}));

jest.mock('@/components/common/Modal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    onClose,
    children
  }: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
  }) => (
    isOpen ? (
      <div data-testid="modal">
        <button data-testid="close-button" onClick={onClose}>Close</button>
        <div data-testid="modal-content">{children}</div>
      </div>
    ) : null
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-testid={`image-${alt.replace(/\s+/g, '-').toLowerCase()}-${src.split('/').pop()?.split('.')[0]}`}
      className={className}
      style={fill ? { objectFit: 'cover', position: 'absolute' } : {}}
    />
  ),
}));

describe('GalleryModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    render(<GalleryModal open={false} onClose={mockOnClose} />);

    // Modal should not be rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders the modal when open is true', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Modal should be rendered
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Click the close button
    fireEvent.click(screen.getByTestId('close-button'));

    // onClose should be called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders the back button with correct class', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Back button should be rendered with correct class
    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('hidden lg:flex');
  });

  it('renders the YouTube iframe with correct src', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // YouTube iframe should be rendered with correct src
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/kbVhf9q1AZM');
    expect(iframe).toHaveClass('w-full h-full object-cover');
  });

  it('renders the title correctly', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Title should be rendered twice (once hidden on mobile, once visible)
    const titles = screen.getAllByText('Watermelon Glow PHA+BHA');
    expect(titles).toHaveLength(2);

    // First title should be hidden on mobile
    expect(titles[0]).toHaveClass('hidden lg:block');

    // Second title should be visible on all screens
    expect(titles[1]).toHaveClass('text-lg lg:text-[32px]');
  });

  it('renders all gallery items', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // All gallery items should be rendered
    const reviewItems = screen.getAllByText('Review');
    expect(reviewItems).toHaveLength(2);

    const howToUseItems = screen.getAllByText('How to use');
    expect(howToUseItems).toHaveLength(2);

    const tonerHacksItems = screen.getAllByText('Toner hacks');
    expect(tonerHacksItems).toHaveLength(2);

    const tonersItem = screen.getByText('Toners');
    expect(tonersItem).toBeInTheDocument();
  });

  it('renders gallery images with correct attributes', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Use getAllByTestId to get all images with a specific pattern
    const allImages = screen.getAllByTestId(/^image-/);
    expect(allImages.length).toBe(7); // There should be 7 gallery images

    // Check that all images have the object-cover class
    allImages.forEach(image => {
      expect(image).toHaveClass('object-cover');
    });

    // Check specific images by their unique testid (including the filename)
    const firstReviewImage = screen.getByTestId('image-review-img1');
    expect(firstReviewImage).toHaveAttribute('src', '/actions/img1.png');

    const howToUseImage = screen.getByTestId('image-how-to-use-img2');
    expect(howToUseImage).toHaveAttribute('src', '/actions/img2.png');
  });

  it('renders the gallery items with correct structure', () => {
    render(<GalleryModal open={true} onClose={mockOnClose} />);

    // Get the first gallery item
    const galleryItem = screen.getAllByText('Review')[0].closest('div');
    expect(galleryItem).toHaveClass('flex flex-col items-center flex-shrink-0');

    // Check the outer circle
    const outerCircle = galleryItem?.firstChild;
    expect(outerCircle).toHaveClass('w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-full border-2 border-rose-300 flex items-center justify-center overflow-hidden mb-2');

    // Check the inner circle
    const innerCircle = outerCircle?.firstChild;
    expect(innerCircle).toHaveClass('w-[45px] lg:w-[55px] h-[45px] lg:h-[55px] rounded-full border-2 border-gray-50 overflow-hidden relative');

    // Check the label
    const label = galleryItem?.lastChild;
    expect(label).toHaveClass('text-sm text-gray-600');
    expect(label).toHaveTextContent('Review');
  });
});