import React from 'react';
import { render, screen } from '@testing-library/react';
import SavedItemsPage from '../page';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

interface ProductCardProps {
  item: {
    productImage: string;
    brandName: string;
    productTitle: string;
    price: string;
  };
}

// Mock the ProductCard component
jest.mock('../../_components/ProductCard', () => ({
  ProductCard: ({ item }: ProductCardProps) => (
    <div data-testid="product-card">
      <div>{item.brandName}</div>
      <div>{item.productTitle}</div>
      <div>${item.price}</div>
    </div>
  ),
}));

describe('SavedItemsPage', () => {
  /**
   * Test 1: Verify that the component renders ProductCard components
   * with the correct data from getSavedItems
   *
   * This test ensures that:
   * - The correct number of ProductCard components are rendered
   * - Each ProductCard receives the correct product data
   */
  it('renders product cards with the correct data', async () => {
    // Mock data
    const mockProducts = [
      {
        productImage: '/image1.jpg',
        brandName: 'Brand 1',
        productTitle: 'Product 1',
        price: '10.99'
      },
      {
        productImage: '/image2.jpg',
        brandName: 'Brand 2',
        productTitle: 'Product 2',
        price: '20.99'
      }
    ];

    // Mock the fetch function to return our mock data
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts),
    });

    // Render the component
    const { findAllByTestId } = render(await SavedItemsPage());

    // Check if the correct number of product cards are rendered
    const productCards = await findAllByTestId('product-card');
    expect(productCards).toHaveLength(2);

    // Check if the product information is displayed correctly
    expect(screen.getByText('Brand 1')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('Brand 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$20.99')).toBeInTheDocument();
  });

  it('renders the correct grid layout', async () => {
    // Mock data
    // const mockProducts = [
    //   {
    //     productImage: '/image1.jpg',
    //     brandName: 'Brand 1',
    //     productTitle: 'Product 1',
    //     price: '10.99'
    //   }
    // ];

    // Mock the getSavedItems function
    // jest.spyOn(pageModule, 'getSavedItems').mockResolvedValue(mockProducts);

    // Render the component
    const { container } = render(await SavedItemsPage());

    // Check if the grid has the correct classes
    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-2');
    expect(gridElement).toHaveClass('md:grid-cols-2');
    expect(gridElement).toHaveClass('lg:grid-cols-3');
  });
});