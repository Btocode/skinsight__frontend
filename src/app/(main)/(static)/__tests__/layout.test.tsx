import React from 'react';
import { render, screen } from '@testing-library/react';
import StaticPageLayout from '../layout';

// Mock the Footer component
jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer Component</div>,
}));

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image Component</div>,
}));

describe('StaticPageLayout', () => {
  /**
   * Test 1: Verify that the component renders its children
   *
   * This test ensures that:
   * - The children passed to the layout are rendered
   */
  it('renders its children', () => {
    render(
      <StaticPageLayout>
        <div data-testid="child-content">Child Content</div>
      </StaticPageLayout>
    );

    // Check if the child content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the horizontal rule
   *
   * This test ensures that:
   * - The horizontal rule is rendered with the correct classes
   */
  it('renders a horizontal rule with correct classes', () => {
    const { container } = render(
      <StaticPageLayout>
        <div>Child Content</div>
      </StaticPageLayout>
    );

    // Check if the horizontal rule is rendered
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('w-full');
    expect(hr).toHaveClass('h-px');
    expect(hr).toHaveClass('my-4');
    expect(hr).toHaveClass('lg:my-8');
    expect(hr).toHaveClass('bg-[#EFEFEF]');
  });

  /**
   * Test 3: Verify that the component renders the Footer component
   *
   * This test ensures that:
   * - The Footer component is rendered
   */
  it('renders the Footer component', () => {
    render(
      <StaticPageLayout>
        <div>Child Content</div>
      </StaticPageLayout>
    );

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the GradientImage component
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage component', () => {
    render(
      <StaticPageLayout>
        <div>Child Content</div>
      </StaticPageLayout>
    );

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify the order of rendered elements
   *
   * This test ensures that:
   * - The elements are rendered in the correct order: children, hr, Footer, GradientImage
   */
  it('renders elements in the correct order', () => {
    const { container } = render(
      <StaticPageLayout>
        <div data-testid="child-content">Child Content</div>
      </StaticPageLayout>
    );

    // Get all the elements
    const childContent = screen.getByTestId('child-content');
    const hr = container.querySelector('hr');
    const footer = screen.getByTestId('footer');
    const gradientImage = screen.getByTestId('gradient-image');

    // Check the order of elements in the DOM
    expect(childContent.compareDocumentPosition(hr!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(hr!.compareDocumentPosition(footer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(footer.compareDocumentPosition(gradientImage)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});