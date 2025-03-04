import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlternativesProductCard } from '../AlternativesProductCard';
import { FindAlternativesProduct } from '@/types/alternatives';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: any) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="next-image"
    />
  ),
}));

// Mock the Tag component
jest.mock('@/components/common/Tag', () => ({
  __esModule: true,
  default: ({ children, variant }: any) => (
    <div data-testid={`tag-${variant}`}>{children}</div>
  ),
}));

describe('AlternativesProductCard Component', () => {
  // Setup mock product data
  const mockProduct: FindAlternativesProduct = {
    id: '123',
    productTitle: 'Test Product',
    brand: 'Test Brand',
    productImage: '/test-image.jpg',
    price: '29.99',
    matched: true,
    best_rated: true,
    popular: false
  };

  /**
   * Test 1: Verify that the component renders the product image
   */
  it('renders the product image', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the product image is rendered
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.productImage);
    expect(image).toHaveAttribute('alt', mockProduct.productTitle);
  });

  /**
   * Test 2: Verify that the component renders the product title
   */
  it('renders the product title', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the product title is rendered
    expect(screen.getByText(mockProduct.productTitle)).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the product brand
   */
  it('renders the product brand', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the product brand is rendered
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the product price
   */
  it('renders the product price', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the product price is rendered
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the matched tag when product is matched
   */
  it('renders the matched tag when product is matched', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the matched tag is rendered
    const matchedTag = screen.getByTestId('tag-matched');
    expect(matchedTag).toBeInTheDocument();
    expect(matchedTag).toHaveTextContent('99% matched');
  });

  /**
   * Test 6: Verify that the component renders the best rated tag when product is best rated
   */
  it('renders the best rated tag when product is best rated', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the best rated tag is rendered
    const bestRatedTag = screen.getByTestId('tag-best_rated');
    expect(bestRatedTag).toBeInTheDocument();
    expect(bestRatedTag).toHaveTextContent('Best rated');
  });

  /**
   * Test 7: Verify that the component doesn't render the popular tag when product is not popular
   */
  it('does not render the popular tag when product is not popular', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check that the popular tag is not rendered
    const popularTag = screen.queryByTestId('tag-popular');
    expect(popularTag).not.toBeInTheDocument();
  });

  /**
   * Test 8: Verify that the component renders the "Save for later" button
   */
  it('renders the "Save for later" button', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the "Save for later" button is rendered
    const saveButton = screen.getByText('Save for later');
    expect(saveButton).toBeInTheDocument();
  });

  /**
   * Test 9: Verify that the component renders the "Buy now" button
   */
  it('renders the "Buy now" button', () => {
    render(<AlternativesProductCard item={mockProduct} />);

    // Check if the "Buy now" button is rendered
    const buyButton = screen.getByText('Buy now');
    expect(buyButton).toBeInTheDocument();
  });

  /**
   * Test 10: Verify that the component renders a card with the correct classes
   */
  it('renders a card with the correct classes', () => {
    const { container } = render(<AlternativesProductCard item={mockProduct} />);

    // Check if the card has the correct classes
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('shadow-[0px_5.13px_33.34px_0px_#2C2C2C17]');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-[#EFEFEF]');
  });

  /**
   * Test 11: Verify that the component handles the popular flag correctly
   */
  it('does not render the spacer div when all tag conditions are true', () => {
    const allTagsProduct = {
      ...mockProduct,
      matched: true,
      best_rated: true,
      popular: true
    };

    const { container } = render(<AlternativesProductCard item={allTagsProduct} />);

    // When all tag conditions are true, the spacer div should not be rendered
    const spacerDiv = container.querySelector('.h-\\[20\\.08px\\]');
    expect(spacerDiv).not.toBeInTheDocument();
  });

  /**
   * Test 12: Verify that the component renders the spacer div when any tag condition is false
   */
  it('renders the spacer div when any tag condition is false', () => {
    const oneTagFalseProduct = {
      ...mockProduct,
      matched: true,
      best_rated: true,
      popular: false  // Only popular is false
    };

    const { container } = render(<AlternativesProductCard item={oneTagFalseProduct} />);

    // When any tag condition is false, the spacer div should be rendered
    const spacerDiv = container.querySelector('.h-\\[20\\.08px\\]');
    expect(spacerDiv).toBeInTheDocument();
    expect(spacerDiv).toHaveClass('lg:h-[30px]');
  });
});