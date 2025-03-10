import React from 'react';
import { render, screen } from '@testing-library/react';
import YourSkinMatchesPage from '../page';
import { notFound } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock all the imported components
jest.mock('../_components/MatchesProductFilter', () => ({
  __esModule: true,
  default: () => <div data-testid="matches-product-filter">Matches Product Filter</div>,
}));

jest.mock('../_components/MatchesProductHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="matches-product-header">Matches Product Header</div>,
}));

jest.mock('../_components/TonersProducts', () => ({
  __esModule: true,
  default: ({ products }: { products: any }) => (
    <div data-testid="toners-products">
      Toners Products: {JSON.stringify(products)}
    </div>
  ),
}));

jest.mock('../_components/CleansersProducts', () => ({
  __esModule: true,
  default: ({ products }: { products: any }) => (
    <div data-testid="cleansers-products">
      Cleansers Products: {JSON.stringify(products)}
    </div>
  ),
}));

jest.mock('../_components/MoisturisersProducts', () => ({
  __esModule: true,
  default: ({ products }: { products: any }) => (
    <div data-testid="moisturisers-products">
      Moisturisers Products: {JSON.stringify(products)}
    </div>
  ),
}));

jest.mock('@/components/common/Advertisement', () => ({
  __esModule: true,
  default: () => <div data-testid="advertisement">Advertisement</div>,
}));

jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: ({ secondImage }: { secondImage?: any }) => (
    <div data-testid="gradient-image">
      Gradient Image: {secondImage ? JSON.stringify(secondImage) : 'No second image'}
    </div>
  ),
}));

jest.mock('../_components/AddFavorite', () => ({
  __esModule: true,
  default: () => <div data-testid="add-favorite">Add Favorite</div>,
}));

jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, icon, className }: { children: React.ReactNode, icon?: React.ReactNode, className?: string }) => (
    <button data-testid="button" className={className}>
      {icon && <span data-testid="button-icon">{icon}</span>}
      {children}
    </button>
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}));

// Mock the fetch function
global.fetch = jest.fn();

// Mock the notFound function
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock TextEncoder for ReactDOMServer
global.TextEncoder = require('util').TextEncoder;

describe('YourSkinMatchesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: 'Cleanser 1' }, // products[0] - Cleansers
        { id: 2, name: 'Toner 1' },    // products[1] - Toners
        { id: 3, name: 'Moisturiser 1' } // products[2] - Moisturisers
      ])
    });
  });

  it('calls notFound when products array is empty', async () => {
    // Mock empty products array
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });

    try {
      // Render the component
      await YourSkinMatchesPage();
    } catch (error) {
      // This is expected since notFound() throws an error
    }

    // Check that notFound was called
    expect(notFound).toHaveBeenCalled();
  });

  it('renders the page with all components when products exist', async () => {
    // Need to use dynamic import for async component testing
    const { default: ReactDOMServer } = await import('react-dom/server');
    const html = ReactDOMServer.renderToString(await YourSkinMatchesPage());

    // Create a container to parse the HTML
    const container = document.createElement('div');
    container.innerHTML = html;

    // Check that all components are rendered
    expect(container.querySelector('[data-testid="matches-product-header"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="matches-product-filter"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="toners-products"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="cleansers-products"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="moisturisers-products"]')).toBeTruthy();
    expect(container.querySelectorAll('[data-testid="advertisement"]').length).toBe(2);
    expect(container.querySelector('[data-testid="gradient-image"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="add-favorite"]')).toBeTruthy();

    // Check the heading
    const heading = container.querySelector('h4');
    expect(heading?.textContent).toContain('Top products for you');

    // Check the retake button
    const link = container.querySelector('[data-testid="link"]');
    expect(link?.getAttribute('href')).toBe('/find-products/gender');

    const button = container.querySelector('[data-testid="button"]');
    expect(button?.textContent).toContain('Retake');
  });

  it('passes the correct products to each product component', async () => {
    // Need to use dynamic import for async component testing
    const { default: ReactDOMServer } = await import('react-dom/server');
    const html = ReactDOMServer.renderToString(await YourSkinMatchesPage());

    // Create a container to parse the HTML
    const container = document.createElement('div');
    container.innerHTML = html;

    // Check that each product component receives the correct products
    const tonersProducts = container.querySelector('[data-testid="toners-products"]');
    expect(tonersProducts?.textContent).toContain('{"id":2,"name":"Toner 1"}');

    const cleansersProducts = container.querySelector('[data-testid="cleansers-products"]');
    expect(cleansersProducts?.textContent).toContain('{"id":1,"name":"Cleanser 1"}');

    const moisturisersProducts = container.querySelector('[data-testid="moisturisers-products"]');
    expect(moisturisersProducts?.textContent).toContain('{"id":3,"name":"Moisturiser 1"}');
  });

  it('passes the correct props to GradientImage', async () => {
    // Need to use dynamic import for async component testing
    const { default: ReactDOMServer } = await import('react-dom/server');
    const html = ReactDOMServer.renderToString(await YourSkinMatchesPage());

    // Create a container to parse the HTML
    const container = document.createElement('div');
    container.innerHTML = html;

    // Check that GradientImage receives the correct props
    const gradientImage = container.querySelector('[data-testid="gradient-image"]');
    expect(gradientImage?.textContent).toContain('{"className":"lg:-right-52"}');
  });
});