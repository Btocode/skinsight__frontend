import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CleansersProducts from '../CleansersProducts';
import { Product } from '@/types/products';

// Mock the MatchesProductCard component
jest.mock('../MatchesProductCard', () => ({
  MatchesProductCard: ({ item }: { item: Product }) => (
    <div data-testid="product-card" data-product-id={item.id}>
      {item.name}
    </div>
  ),
}));

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>,
}));

describe('CleansersProducts Component', () => {
  // Sample product data for testing
  const mockProducts: Product[] = [
    { id: '1', name: 'Cleanser 1', price: 19.99, rating: 4.5, image: '/image1.jpg' },
    { id: '2', name: 'Cleanser 2', price: 24.99, rating: 4.2, image: '/image2.jpg' },
    { id: '3', name: 'Cleanser 3', price: 15.99, rating: 4.8, image: '/image3.jpg' },
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock Element.scrollBy, Element.scrollWidth, and Element.scrollLeft
    Element.prototype.scrollBy = jest.fn();
    Object.defineProperty(Element.prototype, 'scrollWidth', {
      configurable: true,
      get: jest.fn().mockReturnValue(1200),
    });
    Object.defineProperty(Element.prototype, 'scrollLeft', {
      configurable: true,
      get: jest.fn().mockReturnValue(400),
      set: jest.fn(),
    });
    Object.defineProperty(Element.prototype, 'clientWidth', {
      configurable: true,
      get: jest.fn().mockReturnValue(300),
    });
    Object.defineProperty(Element.prototype, 'firstElementChild', {
      configurable: true,
      get: jest.fn().mockReturnValue({
        clientWidth: 300,
      }),
    });
  });

  it('renders the component with the correct title', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Check if the title is rendered
    const title = screen.getByText('Cleansers');
    expect(title).toBeInTheDocument();
  });

  it('renders the correct number of product cards (3x duplicated)', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Check if the products are rendered (3 products x 3 duplications)
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(9);
  });

  it('renders navigation buttons', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Check if navigation buttons are rendered
    const leftButton = screen.getByTestId('chevron-left');
    const rightButton = screen.getByTestId('chevron-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('slides left when left button is clicked', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Find the left button and click it
    const leftButton = screen.getByTestId('chevron-left').closest('button');
    fireEvent.click(leftButton!);

    // Check if scrollBy was called with the correct parameters
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: -320, // 300 (card width) + 20 (gap)
      behavior: 'smooth',
    });
  });

  it('slides right when right button is clicked', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Find the right button and click it
    const rightButton = screen.getByTestId('chevron-right').closest('button');
    fireEvent.click(rightButton!);

    // Check if scrollBy was called with the correct parameters
    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: 320, // 300 (card width) + 20 (gap)
      behavior: 'smooth',
    });
  });


  it('duplicates products correctly', () => {
    render(<CleansersProducts products={mockProducts} />);

    // Get all product cards
    const productCards = screen.getAllByTestId('product-card');

    // Check if the products are duplicated correctly
    // First set of 3 products
    expect(productCards[0]).toHaveAttribute('data-product-id', '1');
    expect(productCards[1]).toHaveAttribute('data-product-id', '2');
    expect(productCards[2]).toHaveAttribute('data-product-id', '3');

    // Second set of 3 products
    expect(productCards[3]).toHaveAttribute('data-product-id', '1');
    expect(productCards[4]).toHaveAttribute('data-product-id', '2');
    expect(productCards[5]).toHaveAttribute('data-product-id', '3');

    // Third set of 3 products
    expect(productCards[6]).toHaveAttribute('data-product-id', '1');
    expect(productCards[7]).toHaveAttribute('data-product-id', '2');
    expect(productCards[8]).toHaveAttribute('data-product-id', '3');
  });
});