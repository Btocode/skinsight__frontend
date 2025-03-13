import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductTabs from '../ProductTabs';
import '@testing-library/jest-dom';

// Fix the import path for MatchesProductCard
jest.mock('../../../_components/MatchesProductCard', () => ({
  MatchesProductCard: ({ item }) => (
    <div data-testid="product-card" data-brand={item.brand}>
      {item.productTitle}
    </div>
  ),
}));

describe('ProductTabs', () => {
  it('renders the tabs with correct initial state', () => {
    render(<ProductTabs />);

    // Check that both tabs are rendered
    const topAlternativesTab = screen.getByText('Top alternatives');
    expect(topAlternativesTab).toBeInTheDocument();
    expect(topAlternativesTab).toHaveClass('text-gray-900 font-semibold');

    const buildRegimenTab = screen.getByText('Build your regimen');
    expect(buildRegimenTab).toBeInTheDocument();
    expect(buildRegimenTab).toHaveClass('text-gray-500');

    // Check that the active indicator is present for the first tab
    const activeIndicator = screen.getByText('Top alternatives').parentElement?.querySelector('span');
    expect(activeIndicator).toBeInTheDocument();
    expect(activeIndicator).toHaveClass('absolute bottom-0 left-0 right-0 h-0.5 bg-primary');
  });

  it('switches tabs when clicked', () => {
    render(<ProductTabs />);

    // Initially, the first tab should be active
    expect(screen.getByText('Top alternatives')).toHaveClass('text-gray-900 font-semibold');
    expect(screen.getByText('Build your regimen')).toHaveClass('text-gray-500');

    // Click the second tab
    fireEvent.click(screen.getByText('Build your regimen'));

    // Now the second tab should be active
    expect(screen.getByText('Top alternatives')).toHaveClass('text-gray-500');
    expect(screen.getByText('Build your regimen')).toHaveClass('text-gray-900 font-semibold');

    // Check that the active indicator moved to the second tab
    const activeIndicator = screen.getByText('Build your regimen').parentElement?.querySelector('span');
    expect(activeIndicator).toBeInTheDocument();
    expect(activeIndicator).toHaveClass('absolute bottom-0 left-0 right-0 h-0.5 bg-primary');
  });

  it('renders all product cards', () => {
    render(<ProductTabs />);

    // Check that all product cards are rendered
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(3);

    // Check the content of the product cards
    expect(productCards[0]).toHaveTextContent('Bio-lifting cream');
    expect(productCards[1]).toHaveTextContent('Intensive Age Defying Hydrating Cream');
    expect(productCards[2]).toHaveTextContent('Collagenesis 24 hr Youth Preservation');

    // Check the brand attributes
    expect(productCards[0]).toHaveAttribute('data-brand', 'CHANTECAILLE');
    expect(productCards[1]).toHaveAttribute('data-brand', 'June Jacobs');
    expect(productCards[2]).toHaveAttribute('data-brand', 'SKINN');
  });

  it('renders the products grid with correct classes', () => {
    render(<ProductTabs />);

    // Get the products grid container
    const productsGrid = screen.getAllByTestId('product-card')[0].parentElement;
    expect(productsGrid).toHaveClass('max-w-[1420px] mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8');
  });

  it('maintains tab state when switching between tabs', () => {
    render(<ProductTabs />);

    // Initially, the first tab should be active
    expect(screen.getByText('Top alternatives')).toHaveClass('text-gray-900 font-semibold');

    // Click the second tab
    fireEvent.click(screen.getByText('Build your regimen'));

    // Now the second tab should be active
    expect(screen.getByText('Build your regimen')).toHaveClass('text-gray-900 font-semibold');

    // Click the first tab again
    fireEvent.click(screen.getByText('Top alternatives'));

    // Now the first tab should be active again
    expect(screen.getByText('Top alternatives')).toHaveClass('text-gray-900 font-semibold');
    expect(screen.getByText('Build your regimen')).toHaveClass('text-gray-500');
  });
});