import React from 'react';
import { render, screen } from '@testing-library/react';
import TopAlternativesProducts from '../TopAlternativesProducts';
import { FindAlternativesProduct } from '@/types/alternatives';
import { ImageProps } from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Mock the AlternativesProductCard component
jest.mock('../AlternativesProductCard', () => ({
  AlternativesProductCard: ({ item }: { item: FindAlternativesProduct }) => (
    <div data-testid="alternatives-product-card" data-product-id={item.id}>
      {item.productTitle}
    </div>
  ),
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      className={className}
      data-testid="next-image"
    />
  ),
}));

describe('TopAlternativesProducts Component', () => {
  // Setup mock products data
  const mockProducts: FindAlternativesProduct[] = [
    {
      id: '1',
      productTitle: 'Product 1',
      brand: 'Brand 1',
      productImage: '/image1.jpg',
      price: '19.99',
      matched: true,
      best_rated: true,
      popular: false
    },
    {
      id: '2',
      productTitle: 'Product 2',
      brand: 'Brand 2',
      productImage: '/image2.jpg',
      price: '29.99',
      matched: false,
      best_rated: true,
      popular: true
    },
    {
      id: '3',
      productTitle: 'Product 3',
      brand: 'Brand 3',
      productImage: '/image3.jpg',
      price: '39.99',
      matched: true,
      best_rated: false,
      popular: false
    }
  ];

  /**
   * Test 1: Verify that the component renders the correct number of product cards
   *
   * This test ensures that:
   * - The component renders the correct number of AlternativesProductCard components
   */
  it('renders the correct number of product cards', () => {
    render(<TopAlternativesProducts products={mockProducts} />);

    // Check if the correct number of product cards are rendered
    const productCards = screen.getAllByTestId('alternatives-product-card');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  /**
   * Test 2: Verify that the component passes the correct data to each product card
   *
   * This test ensures that:
   * - The component passes the correct product data to each AlternativesProductCard
   */
  it('passes the correct data to each product card', () => {
    render(<TopAlternativesProducts products={mockProducts} />);

    // Check if each product card receives the correct product data
    mockProducts.forEach(product => {
      const productCard = screen.getByText(product.productTitle);
      expect(productCard).toBeInTheDocument();
      expect(productCard.closest('[data-product-id]')).toHaveAttribute('data-product-id', product.id);
    });
  });

  /**
   * Test 3: Verify that the component renders the advertisement image
   *
   * This test ensures that:
   * - The component renders the advertisement image with the correct alt text
   */
  it('renders the advertisement image', () => {
    render(<TopAlternativesProducts products={mockProducts} />);

    // Check if the advertisement image is rendered
    const adImage = screen.getByTestId('next-image');
    expect(adImage).toBeInTheDocument();
    expect(adImage).toHaveAttribute('alt', 'ad');
  });

  /**
   * Test 4: Verify that the component renders the grid with the correct classes
   *
   * This test ensures that:
   * - The component renders the grid with the correct classes for responsive layout
   */
  it('renders the grid with the correct classes', () => {
    const { container } = render(<TopAlternativesProducts products={mockProducts} />);

    // Check if the grid has the correct classes
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-2');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
    expect(grid).toHaveClass('gap-x-[15px]');
    expect(grid).toHaveClass('lg:gap-x-[40px]');
    expect(grid).toHaveClass('gap-y-[16px]');
    expect(grid).toHaveClass('lg:gap-y-[70px]');
  });

  /**
   * Test 5: Verify that the component renders correctly with an empty products array
   *
   * This test ensures that:
   * - The component handles the case when no products are provided
   */
  it('renders correctly with an empty products array', () => {
    render(<TopAlternativesProducts products={[]} />);

    // Check if no product cards are rendered
    const productCards = screen.queryAllByTestId('alternatives-product-card');
    expect(productCards).toHaveLength(0);

    // Check if the advertisement image is still rendered
    const adImage = screen.getByTestId('next-image');
    expect(adImage).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the advertisement image with the correct classes
   *
   * This test ensures that:
   * - The advertisement image has the correct classes for responsive sizing
   */
  it('renders the advertisement image with the correct classes', () => {
    render(<TopAlternativesProducts products={mockProducts} />);

    // Check if the advertisement image has the correct classes
    const adImage = screen.getByTestId('next-image');
    expect(adImage).toHaveClass('w-[331px]');
    expect(adImage).toHaveClass('h-[265px]');
    expect(adImage).toHaveClass('lg:h-[397px]');
    expect(adImage).toHaveClass('rounded-[13px]');
    expect(adImage).toHaveClass('border-[1.08px]');
    expect(adImage).toHaveClass('border-[#EFEFEF]');
  });

  /**
   * Test 7: Verify that the component renders the container with the correct classes
   *
   * This test ensures that:
   * - The outer container has the correct classes
   */
  it('renders the container with the correct classes', () => {
    const { container } = render(<TopAlternativesProducts products={mockProducts} />);

    // Check if the container has the correct classes
    const outerContainer = container.firstChild;
    expect(outerContainer).toHaveClass('lg:px-[43px]');
    expect(outerContainer).toHaveClass('mt-[46px]');
  });
});