import React from 'react';
import { render, screen } from '@testing-library/react';
import FindAlternativesPage from '../page';

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

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

// Mock the SectionOpacity component
jest.mock('@/components/animations/SectionOpacity', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="section-opacity">{children}</div>
  ),
}));

// Mock the SelectYourTargetProduct component
jest.mock('../_components/SelectYourTargetProduct', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="select-your-target-product">
      Select Your Target Product
    </div>
  ),
}));

describe('FindAlternativesPage Component', () => {
  /**
   * Test 1: Verify that the component renders the SectionOpacity wrapper
   *
   * This test ensures that:
   * - The component is wrapped in the SectionOpacity component
   */
  it('renders the SectionOpacity wrapper', () => {
    render(<FindAlternativesPage />);

    // Check if the SectionOpacity component is rendered
    expect(screen.getByTestId('section-opacity')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the heading
   *
   * This test ensures that:
   * - The component renders the main heading with the correct text
   */
  it('renders the heading with the correct text', () => {
    render(<FindAlternativesPage />);

    // Check if the heading is rendered with the correct text
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement).toBeInTheDocument();
    // Use a more flexible assertion that might match variations of the text
    expect(headingElement.textContent).toMatch(/Select your target product/i);
  });

  /**
   * Test 3: Verify that the component renders the subheading
   *
   * This test ensures that:
   * - The component renders the subheading with the correct text
   */
  it('renders the subheading text', () => {
    render(<FindAlternativesPage />);

    // Check if the subheading is rendered with the correct text
    const subheadingText = screen.getByText(/Find alternatives/i);
    expect(subheadingText).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the SelectYourTargetProduct component
   *
   * This test ensures that:
   * - The component renders the SelectYourTargetProduct component
   */
  it('renders the SelectYourTargetProduct component', () => {
    render(<FindAlternativesPage />);

    // Check if the SelectYourTargetProduct component is rendered
    expect(screen.getByTestId('select-your-target-product')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the GradientImage component
   *
   * This test ensures that:
   * - The component renders the GradientImage component
   */
  it('renders the GradientImage component', () => {
    render(<FindAlternativesPage />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the container with the correct classes
   *
   * This test ensures that:
   * - The container section has the correct classes
   */
  it('renders a container section', () => {
    const { container } = render(<FindAlternativesPage />);

    // Check if the container section has the correct classes
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    // Check for common container classes
    expect(section).toHaveClass('container');
  });

  /**
   * Test 7: Verify that the component renders responsive images
   *
   * This test ensures that:
   * - The component renders both mobile and desktop images
   */
  it('renders responsive images', () => {
    render(<FindAlternativesPage />);

    // Use getAllByTestId to get all images
    const images = screen.getAllByTestId('next-image');
    expect(images.length).toBeGreaterThan(0);

    // Check that there's a mobile image
    const mobileImage = images.find(img => img.className.includes('lg:hidden'));
    expect(mobileImage).toBeInTheDocument();
    expect(mobileImage).toHaveAttribute('alt', 'Find Products');

    // Check that there's a desktop image
    const desktopImage = images.find(img => img.className.includes('hidden lg:block'));
    expect(desktopImage).toBeInTheDocument();
    expect(desktopImage).toHaveAttribute('alt', 'Find Products');
  });

  /**
   * Test 8: Verify that the component renders the content in the correct layout
   *
   * This test ensures that:
   * - The component renders the content in a responsive layout
   */
  it('renders content with responsive layout classes', () => {
    const { container } = render(<FindAlternativesPage />);

    // Check if the content is rendered in a responsive layout
    const responsiveElement = container.querySelector('[class*="lg:"]');
    expect(responsiveElement).toBeInTheDocument();
  });
});