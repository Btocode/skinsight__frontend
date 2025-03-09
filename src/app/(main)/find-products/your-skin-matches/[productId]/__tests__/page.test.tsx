import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '../page';
import '@testing-library/jest-dom';

// Mock all the imported components
jest.mock('../_components/ProductImageCarousel', () => ({
  __esModule: true,
  default: () => <div data-testid="product-image-carousel">Product Image Carousel</div>,
}));

jest.mock('../_components/ProductAccordion', () => ({
  __esModule: true,
  default: () => <div data-testid="product-accordion">Product Accordion</div>,
}));

jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
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

jest.mock('../_components/ProductGallary', () => ({
  __esModule: true,
  default: () => <div data-testid="product-gallery">Product Gallery</div>,
}));

jest.mock('@/components/common/Accordion', () => ({
  __esModule: true,
  Accordion: ({ title, content, isActive, onToggle }: { title: string, content: string, isActive: boolean, onToggle: () => void }) => (
    <div
      data-testid="accordion"
      data-active={isActive}
      onClick={onToggle}
    >
      <h3>{title}</h3>
      {isActive && <div>{content}</div>}
    </div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill }: { src: string, alt: string, fill?: boolean }) => (
    <img data-testid="image" src={src} alt={alt} style={fill ? { objectFit: 'cover' } : {}} />
  ),
}));

jest.mock('../_components/ProductTabs', () => ({
  __esModule: true,
  default: () => <div data-testid="product-tabs">Product Tabs</div>,
}));

jest.mock('@/components/common/Advertisement', () => ({
  __esModule: true,
  default: () => <div data-testid="advertisement">Advertisement</div>,
}));

describe('ProductDetails', () => {
  it('renders the product details page with all components', () => {
    render(<ProductDetails />);

    // Check that all components are rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('product-image-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('product-accordion')).toBeInTheDocument();
    expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
    expect(screen.getByTestId('product-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('advertisement')).toBeInTheDocument();

    // Check the product title and brand
    expect(screen.getByText('Glow Recipe')).toBeInTheDocument();
    expect(screen.getByText('Watermelon Glow PHA+BHA')).toBeInTheDocument();

    // Check the price
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('$$$')).toBeInTheDocument();

    // Check the buttons
    expect(screen.getByText('Save for later')).toBeInTheDocument();
    expect(screen.getByText('Buy now')).toBeInTheDocument();
  });

  it('toggles the accordion when clicked', () => {
    render(<ProductDetails />);

    // Get the accordion
    const accordion = screen.getByTestId('accordion');

    // Initially the accordion should be active
    expect(accordion).toHaveAttribute('data-active', 'true');
    expect(screen.getByText(/Toners balance your skin's pH levels/)).toBeInTheDocument();

    // Click the accordion to close it
    fireEvent.click(accordion);

    // The accordion should now be inactive
    expect(accordion).toHaveAttribute('data-active', 'false');

    // The content should not be visible
    expect(screen.queryByText(/Toners balance your skin's pH levels/)).not.toBeInTheDocument();

    // Click the accordion again to open it
    fireEvent.click(accordion);

    // The accordion should be active again
    expect(accordion).toHaveAttribute('data-active', 'true');
    expect(screen.getByText(/Toners balance your skin's pH levels/)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt', () => {
    render(<ProductDetails />);

    // Check the image
    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', '/brand.png');
    expect(image).toHaveAttribute('alt', 'brand');
  });

  it('renders the save for later button with correct styling', () => {
    render(<ProductDetails />);

    // Get the save for later button
    const saveButton = screen.getByText('Save for later').closest('button');
    expect(saveButton).toHaveClass('w-[141px] h-[48px] rounded-xl bg-[#8F80E833]');
    expect(saveButton).toHaveClass('flex items-center justify-center');
  });

  it('renders the buy now button with correct styling', () => {
    render(<ProductDetails />);

    // Get the buy now button
    const buyButton = screen.getByTestId('button');
    expect(buyButton).toHaveClass('p-0 w-[141px] h-[48px] rounded-xl flex items-center justify-center');
  });

});