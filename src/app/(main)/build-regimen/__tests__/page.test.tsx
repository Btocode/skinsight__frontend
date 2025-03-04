import React from 'react';
import { render, screen } from '@testing-library/react';
import BuildRegimenPage from '../page';

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <button data-testid="button" className={className}>{children}</button>
  ),
}));

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

// Mock the HeadingPrimary component
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h1 data-testid="heading-primary" className={className}>{children}</h1>
  ),
}));

// Mock the SectionOpacity component
jest.mock('@/components/animations/SectionOpacity', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-opacity">{children}</div>
  ),
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className, width, height, priority }: any) => (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      data-priority={priority ? 'true' : 'false'}
      data-testid="next-image"
    />
  ),
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href} data-testid="next-link">{children}</a>
  ),
}));

describe('BuildRegimenPage Component', () => {
  /**
   * Test 1: Verify that the component renders the SectionOpacity wrapper
   *
   * This test ensures that:
   * - The SectionOpacity component is rendered as a wrapper
   */
  it('renders the SectionOpacity wrapper', () => {
    render(<BuildRegimenPage />);

    // Check if the SectionOpacity component is rendered
    expect(screen.getByTestId('section-opacity')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the back button
   *
   * This test ensures that:
   * - The BackButton component is rendered
   */
  it('renders the back button', () => {
    render(<BuildRegimenPage />);

    // Check if the BackButton component is rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the main heading
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with "Build your regimen" text
   */
  it('renders the main heading', () => {
    render(<BuildRegimenPage />);

    // Check if the HeadingPrimary component is rendered with "Build your regimen" text
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Build your regimen');
  });

  /**
   * Test 4: Verify that the component renders the description text
   *
   * This test ensures that:
   * - The description paragraph is rendered with the correct text
   */
  it('renders the description text', () => {
    render(<BuildRegimenPage />);

    // Check if the description paragraph is rendered
    expect(screen.getByText('Answer a few questions and let us build you your perfect skincare regimen')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the "Let's go" button
   *
   * This test ensures that:
   * - The Button component is rendered with "Let's go" text
   */
  it('renders the "Let\'s go" button', () => {
    render(<BuildRegimenPage />);

    // Check if the Button component is rendered with "Let's go" text
    expect(screen.getByText('Let\'s go')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the images
   *
   * This test ensures that:
   * - The mobile image is rendered with the correct alt text
   * - The desktop image is rendered with the correct alt text
   */
  it('renders the images', () => {
    render(<BuildRegimenPage />);

    // Check if the images are rendered
    const images = screen.getAllByTestId('next-image');
    expect(images.length).toBe(2);

    // Check if the images have the correct alt text
    expect(images[0]).toHaveAttribute('alt', 'Find Products');
    expect(images[1]).toHaveAttribute('alt', 'Build Regimen');
  });

  /**
   * Test 7: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', () => {
    render(<BuildRegimenPage />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 8: Verify that the component renders the link to the next page
   *
   * This test ensures that:
   * - The Link component is rendered with the correct href
   */
  it('renders the link to the next page', () => {
    render(<BuildRegimenPage />);

    // Check if the Link component is rendered with the correct href
    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/build-regimen/comfortable-products-count');
  });

  /**
   * Test 9: Verify that the desktop image has the priority attribute
   *
   * This test ensures that:
   * - The desktop image has the priority attribute set to true
   */
  it('sets priority on the desktop image', () => {
    render(<BuildRegimenPage />);

    // Check if the desktop image has the priority attribute
    const images = screen.getAllByTestId('next-image');
    expect(images[1]).toHaveAttribute('data-priority', 'true');
  });

  /**
   * Test 10: Verify that the images have the correct classes for responsive display
   *
   * This test ensures that:
   * - The mobile image has the lg:hidden class
   * - The desktop image has the hidden lg:block class
   */
  it('applies the correct classes to the images for responsive display', () => {
    render(<BuildRegimenPage />);

    // Check if the images have the correct classes
    const images = screen.getAllByTestId('next-image');
    expect(images[0]).toHaveClass('lg:hidden');
    expect(images[1]).toHaveClass('hidden');
    expect(images[1]).toHaveClass('lg:block');
  });
});