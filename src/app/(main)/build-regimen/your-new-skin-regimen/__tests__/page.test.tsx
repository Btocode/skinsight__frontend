import React from 'react';
import { render, screen } from '@testing-library/react';
import YourNewSkinRegimenPage from '../page';
import { notFound } from 'next/navigation';
import { ImageProps } from 'next/image';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

// Update the mocks
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      className={className}
      data-testid="product-image"
      data-fill={fill ? 'true' : 'false'}
    />
  ),
}));

jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: HeadingProps) => (
    <h1 data-testid="heading-primary" className={className}>
      {children}
    </h1>
  ),
}));

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

// Mock the Advertisement component
jest.mock('@/components/common/Advertisement', () => ({
  __esModule: true,
  default: () => <div data-testid="advertisement">Advertisement</div>,
}));

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

// Mock the Footer component
jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock the SkinRegimenTabs component
jest.mock('../_components/SkinRegimenTabs', () => ({
  __esModule: true,
  default: () => <div data-testid="skin-regimen-tabs">Skin Regimen Tabs</div>,
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        guide: 'Morning Cleanser',
        productImage: '/products/cleanser.png',
        brand: 'Brand A',
        productTitle: 'Gentle Cleanser',
        desc: 'A gentle cleanser for all skin types'
      },
      {
        guide: 'Morning Moisturizer',
        productImage: '/products/moisturizer.png',
        brand: 'Brand B',
        productTitle: 'Hydrating Moisturizer',
        desc: 'A hydrating moisturizer for dry skin'
      }
    ]),
  })
) as jest.Mock;

describe('YourNewSkinRegimenPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Verify that the component fetches and renders skin regimens
   *
   * This test ensures that:
   * - The component fetches skin regimens from the API
   * - The component renders the skin regimens
   */
  it('fetches and renders skin regimens', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the fetch function was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/build-regimen');

    // Check if the skin regimens are rendered
    expect(screen.getAllByTestId('product-image').length).toBe(2);
    expect(screen.getByText('Morning Cleanser')).toBeInTheDocument();
    expect(screen.getByText('Brand A')).toBeInTheDocument();
    expect(screen.getByText('Gentle Cleanser')).toBeInTheDocument();
    expect(screen.getByText('A gentle cleanser for all skin types')).toBeInTheDocument();
    expect(screen.getByText('Morning Moisturizer')).toBeInTheDocument();
    expect(screen.getByText('Brand B')).toBeInTheDocument();
    expect(screen.getByText('Hydrating Moisturizer')).toBeInTheDocument();
    expect(screen.getByText('A hydrating moisturizer for dry skin')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component calls notFound when no skin regimens are returned
   *
   * This test ensures that:
   * - The component calls notFound when no skin regimens are returned
   */
  it('calls notFound when no skin regimens are returned', async () => {
    // Mock the fetch function to return an empty array
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(await YourNewSkinRegimenPage());

    // Check if the notFound function was called
    expect(notFound).toHaveBeenCalled();
  });

  /**
   * Test 3: Verify that the component renders the BackButton
   *
   * This test ensures that:
   * - The BackButton component is rendered
   */
  it('renders the BackButton', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the BackButton component is rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the HeadingPrimary
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with the correct text
   */
  it('renders the HeadingPrimary', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the HeadingPrimary component is rendered with the correct text
    expect(screen.getByTestId('heading-primary')).toBeInTheDocument();
    expect(screen.getByText('Skin regimen')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the SkinRegimenTabs
   *
   * This test ensures that:
   * - The SkinRegimenTabs component is rendered
   */
  it('renders the SkinRegimenTabs', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the SkinRegimenTabs component is rendered
    expect(screen.getByTestId('skin-regimen-tabs')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the Advertisement
   *
   * This test ensures that:
   * - The Advertisement component is rendered
   */
  it('renders the Advertisement', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the Advertisement component is rendered
    expect(screen.getByTestId('advertisement')).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the component renders the Footer
   *
   * This test ensures that:
   * - The Footer component is rendered
   */
  it('renders the Footer', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  /**
   * Test 8: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 9: Verify that the component renders the Email results button
   *
   * This test ensures that:
   * - The Email results button is rendered with the correct text
   */
  it('renders the Email results button', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the Email results button is rendered with the correct text
    expect(screen.getByText('Email results')).toBeInTheDocument();
  });

  /**
   * Test 10: Verify that the component renders the Regenerate button
   *
   * This test ensures that:
   * - The Regenerate button is rendered with the correct text
   */
  it('renders the Regenerate button', async () => {
    render(await YourNewSkinRegimenPage());

    // Check if the Regenerate button is rendered with the correct text
    expect(screen.getByText('Regenerate')).toBeInTheDocument();
  });
});