import React from 'react';
import { render, screen } from '@testing-library/react';
import MyReviewsPage from '../page';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

interface ReviewProductCardProps {
  item: {
    productImage: string;
    productTitle: string;
  };
}

// Mock the ReviewProductCard component
jest.mock('../../_components/ReviewProductCard', () => ({
  __esModule: true,
  default: ({ item }: ReviewProductCardProps) => (
    <div data-testid="review-product-card">
      <div>{item.productTitle}</div>
    </div>
  ),
}));

// Mock the WriteReviewModal component
jest.mock('../../_components/WriteReviewModal', () => ({
  __esModule: true,
  default: () => <div data-testid="write-review-modal">Write Review Modal</div>,
}));

describe('MyReviewsPage', () => {
  /**
   * Test 1: Verify that the component displays the "no reviews" message
   * when there are no reviews
   *
   * This test ensures that:
   * - The correct message is displayed when no reviews are available
   * - The "Write a new review" button is rendered
   */
  it('displays the no reviews message when there are no reviews', async () => {
    // Mock the fetch function to return an empty array
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    // Render the component
    render(await MyReviewsPage());

    // Check if the no reviews message is displayed
    expect(screen.getByText(/You don't have any reviews yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Click on the button below to get started/i)).toBeInTheDocument();

    // Check if the "Write a new review" button is rendered
    expect(screen.getByText(/Write a new review/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders ReviewProductCard components
   * with the correct data when there are reviews
   *
   * This test ensures that:
   * - The correct number of ReviewProductCard components are rendered
   * - Each ReviewProductCard receives the correct review data
   * - The "Your Reviews" header is displayed
   * - The WriteReviewModal is rendered
   */
  it('renders review product cards with the correct data', async () => {
    // Mock data
    const mockReviews = [
      {
        productImage: '/image1.jpg',
        productTitle: 'Product 1',
      },
      {
        productImage: '/image2.jpg',
        productTitle: 'Product 2',
      },
      {
        productImage: '/image3.jpg',
        productTitle: 'Product 3',
      }
    ];

    // Mock the fetch function to return our mock data
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockReviews),
    });

    // Render the component
    const { findAllByTestId } = render(await MyReviewsPage());

    // Check if the "Your Reviews" header is displayed
    expect(screen.getByText(/Your Reviews/i)).toBeInTheDocument();

    // Check if the correct number of review product cards are rendered
    const reviewCards = await findAllByTestId('review-product-card');
    expect(reviewCards).toHaveLength(3);

    // Check if the product titles are displayed correctly
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();

    // Check if the WriteReviewModal is rendered
    expect(screen.getByTestId('write-review-modal')).toBeInTheDocument();
  });
});