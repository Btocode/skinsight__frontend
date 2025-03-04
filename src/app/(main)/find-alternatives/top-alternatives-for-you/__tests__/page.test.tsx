import React from 'react';
import { render, screen } from '@testing-library/react';
import TopAlternativesForYouPage from '../page';
import { notFound } from 'next/navigation';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

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

// Mock the HeadingPrimary component
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <h1 data-testid="heading-primary" className={className}>
      {children}
    </h1>
  ),
}));

// Mock the Advertisement component
jest.mock('@/components/common/Advertisement', () => ({
  __esModule: true,
  default: ({ className }: any) => (
    <div data-testid="advertisement" className={className}>
      Advertisement
    </div>
  ),
}));

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: ({ secondImage }: any) => (
    <div data-testid="gradient-image" data-second-image={secondImage?.url}>
      Gradient Image
    </div>
  ),
}));

// Mock the SelectYourTargetProduct component
jest.mock('../../_components/SelectYourTargetProduct', () => ({
  __esModule: true,
  default: () => <div data-testid="select-your-target-product">Select Your Target Product</div>,
}));

// Mock the TopAlternativesProducts component
jest.mock('../_components/TopAlternativesProducts', () => ({
  __esModule: true,
  default: ({ products }: any) => (
    <div data-testid="top-alternatives-products">
      {products.map((product: any, index: number) => (
        <div key={index} data-product-id={product.id}>
          {product.name}
        </div>
      ))}
    </div>
  ),
}));

// Mock the fetch function
global.fetch = jest.fn();

describe('TopAlternativesForYouPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Verify that the component fetches and renders products
   *
   * This test ensures that:
   * - The component fetches products from the API
   * - The component renders the products using TopAlternativesProducts
   */
  it('fetches and renders products', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the fetch function was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/find-alternatives');

    // Check if the TopAlternativesProducts component is rendered
    expect(screen.getByTestId('top-alternatives-products')).toBeInTheDocument();

    // Check if the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component calls notFound when no products are returned
   *
   * This test ensures that:
   * - The component calls notFound when the API returns an empty array
   */
  it('calls notFound when no products are returned', async () => {
    // Mock the fetch function to return an empty array
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    await TopAlternativesForYouPage();

    // Check if the notFound function was called
    expect(notFound).toHaveBeenCalled();
  });

  /**
   * Test 3: Verify that the component renders the HeadingPrimary
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with the correct text
   */
  it('renders the HeadingPrimary', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the HeadingPrimary component is rendered with the correct text
    expect(screen.getByTestId('heading-primary')).toBeInTheDocument();
    expect(screen.getByText('Select your target product')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the SelectYourTargetProduct
   *
   * This test ensures that:
   * - The SelectYourTargetProduct component is rendered
   */
  it('renders the SelectYourTargetProduct', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the SelectYourTargetProduct component is rendered
    expect(screen.getByTestId('select-your-target-product')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the Advertisement
   *
   * This test ensures that:
   * - The Advertisement component is rendered with the correct class
   */
  it('renders the Advertisement', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the Advertisement component is rendered with the correct class
    const advertisement = screen.getByTestId('advertisement');
    expect(advertisement).toBeInTheDocument();
    expect(advertisement).toHaveClass('hidden');
    expect(advertisement).toHaveClass('lg:flex');
  });

  /**
   * Test 6: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered with the correct second image
   */
  it('renders the GradientImage', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the GradientImage component is rendered with the correct second image
    const gradientImage = screen.getByTestId('gradient-image');
    expect(gradientImage).toBeInTheDocument();
    expect(gradientImage).toHaveAttribute('data-second-image', '/gradient3.png');
  });

  /**
   * Test 7: Verify that the component renders the banner image
   *
   * This test ensures that:
   * - The banner image is rendered with the correct attributes
   */
  it('renders the banner image', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the banner image is rendered
    const images = screen.getAllByTestId('next-image');
    expect(images.length).toBeGreaterThan(0);

    // Check if at least one image has the alt text "Find Products"
    const bannerImage = images.find(img => img.getAttribute('alt') === 'Find Products');
    expect(bannerImage).toBeInTheDocument();
  });

  /**
   * Test 8: Verify that the component renders the "Top alternatives for you" text
   *
   * This test ensures that:
   * - The component renders the "Top alternatives for you" text
   */
  it('renders the "Top alternatives for you" text', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the "Top alternatives for you" text is rendered
    expect(screen.getByText('Top alternatives for you')).toBeInTheDocument();
  });

  /**
   * Test 9: Verify that the component renders the "Find alternatives" text
   *
   * This test ensures that:
   * - The component renders the "Find alternatives" text
   */
  it('renders the "Find alternatives" text', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    render(await TopAlternativesForYouPage());

    // Check if the "Find alternatives" text is rendered
    expect(screen.getByText('Find alternatives')).toBeInTheDocument();
  });

  /**
   * Test 10: Verify that the component renders the container section with correct classes
   *
   * This test ensures that:
   * - The component renders the container section with the correct classes
   */
  it('renders the container section with correct classes', async () => {
    // Mock the fetch function to return products
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    });

    const { container } = render(await TopAlternativesForYouPage());

    // Check if the container section is rendered with the correct classes
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('container');
    expect(section).toHaveClass('py-4');
    expect(section).toHaveClass('lg:py-[60px]');
  });
});