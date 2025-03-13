import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductImageCarousel from '../ProductImageCarousel';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, variant, className, onClick }: { children: React.ReactNode, variant: string, className: string, onClick: () => void }) => (
    <button
      data-testid={`button-${variant || 'default'}`}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/common/Tag', () => ({
  __esModule: true,
  default: ({ children, variant }: { children: React.ReactNode, variant: string }) => (
    <div
      data-testid={`tag-${variant}`}
    >
      {children}
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string, alt: string, className: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-testid={`image-${alt.replace(/\s+/g, '-')}`}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  ),
}));

describe('ProductImageCarousel', () => {
  it('renders the carousel with correct structure', () => {
    const { container } = render(<ProductImageCarousel />);

    // Check the container using the container from render
    expect(container.firstChild).toHaveClass('w-full lg:mx-0 lg:w-[591px] h-[358px] lg:h-[529px] bg-white border rounded-xl p-4 space-y-4 lg:mt-8');
  });

  it('renders the tags correctly', () => {
    render(<ProductImageCarousel />);

    // Check the tags
    const matchedTag = screen.getByTestId('tag-matched');
    expect(matchedTag).toBeInTheDocument();
    expect(matchedTag).toHaveTextContent('99% matched');

    const bestRatedTag = screen.getByTestId('tag-best_rated');
    expect(bestRatedTag).toBeInTheDocument();
    expect(bestRatedTag).toHaveTextContent('Most loved by your skintwins');
  });

  it('renders all images', () => {
    render(<ProductImageCarousel />);

    // Check all images
    const image1 = screen.getByTestId('image-product-1');
    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute('src', '/products/product1.png');
    expect(image1).toHaveClass('w-full h-full object-contain');

    // Other images are rendered but not visible due to the carousel
    const image2 = screen.getByTestId('image-product-2');
    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute('src', '/products/product2.png');

    const image3 = screen.getByTestId('image-product-3');
    expect(image3).toBeInTheDocument();
    expect(image3).toHaveAttribute('src', '/products/product3.png');
  });

  it('renders navigation buttons', () => {
    render(<ProductImageCarousel />);

    // Check the prev and next buttons
    const prevButton = screen.getAllByTestId('button-icon')[0];
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveClass('absolute left-2 top-1/2 -translate-y-1/2 p-2');

    const nextButton = screen.getAllByTestId('button-icon')[1];
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveClass('absolute right-2 top-1/2 -translate-y-1/2 p-2');
  });

  it('renders indicator buttons', () => {
    render(<ProductImageCarousel />);

    // Check the indicator buttons
    const indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators).toHaveLength(3);

    // First indicator should be active
    expect(indicators[0]).toHaveClass('bg-gray-800');
    expect(indicators[1]).toHaveClass('bg-gray-300');
    expect(indicators[2]).toHaveClass('bg-gray-300');
  });

  it('navigates to the next image when next button is clicked', () => {
    render(<ProductImageCarousel />);

    // Click the next button
    const nextButton = screen.getAllByTestId('button-icon')[1];
    fireEvent.click(nextButton);

    // Check that the second indicator is now active
    const indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[0]).toHaveClass('bg-gray-300');
    expect(indicators[1]).toHaveClass('bg-gray-800');
    expect(indicators[2]).toHaveClass('bg-gray-300');
  });

  it('navigates to the previous image when prev button is clicked', () => {
    render(<ProductImageCarousel />);

    // First, navigate to the second image
    const nextButton = screen.getAllByTestId('button-icon')[1];
    fireEvent.click(nextButton);

    // Check that the second indicator is active
    let indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[1]).toHaveClass('bg-gray-800');

    // Click the prev button
    const prevButton = screen.getAllByTestId('button-icon')[0];
    fireEvent.click(prevButton);

    // Check that the first indicator is active again
    indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[0]).toHaveClass('bg-gray-800');
    expect(indicators[1]).toHaveClass('bg-gray-300');
    expect(indicators[2]).toHaveClass('bg-gray-300');
  });

  it('wraps around to the first image when clicking next on the last image', () => {
    render(<ProductImageCarousel />);

    // Navigate to the last image
    const nextButton = screen.getAllByTestId('button-icon')[1];
    fireEvent.click(nextButton); // to second image
    fireEvent.click(nextButton); // to third image

    // Check that the third indicator is active
    let indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[2]).toHaveClass('bg-gray-800');

    // Click next again to wrap around
    fireEvent.click(nextButton);

    // Check that the first indicator is active
    indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[0]).toHaveClass('bg-gray-800');
    expect(indicators[1]).toHaveClass('bg-gray-300');
    expect(indicators[2]).toHaveClass('bg-gray-300');
  });

  it('wraps around to the last image when clicking prev on the first image', () => {
    render(<ProductImageCarousel />);

    // Check that the first indicator is active by default
    let indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[0]).toHaveClass('bg-gray-800');

    // Click the prev button to wrap around to the last image
    const prevButton = screen.getAllByTestId('button-icon')[0];
    fireEvent.click(prevButton);

    // Check that the last indicator is active
    indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );
    expect(indicators[0]).toHaveClass('bg-gray-300');
    expect(indicators[1]).toHaveClass('bg-gray-300');
    expect(indicators[2]).toHaveClass('bg-gray-800');
  });

  it('navigates directly to an image when clicking an indicator button', () => {
    render(<ProductImageCarousel />);

    // Get the indicator buttons
    const indicators = screen.getAllByRole('button').filter(button =>
      button.className.includes('w-2 h-2 rounded-full')
    );

    // Click the third indicator
    fireEvent.click(indicators[2]);

    // Check that the third indicator is active
    expect(indicators[0]).toHaveClass('bg-gray-300');
    expect(indicators[1]).toHaveClass('bg-gray-300');
    expect(indicators[2]).toHaveClass('bg-gray-800');

    // Click the second indicator
    fireEvent.click(indicators[1]);

    // Check that the second indicator is active
    expect(indicators[0]).toHaveClass('bg-gray-300');
    expect(indicators[1]).toHaveClass('bg-gray-800');
    expect(indicators[2]).toHaveClass('bg-gray-300');
  });
});