import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../page';

// Mock HeadingPrimary component
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h1 data-testid="heading-primary" className={className}>{children}</h1>
  ),
}));

describe('AboutUs Component', () => {
  /**
   * Test 1: Verify that the component renders the main heading
   *
   * This test ensures that:
   * - The "More about" text is rendered
   * - The HeadingPrimary component is rendered with the correct text
   */
  it('renders the main heading', () => {
    render(<AboutUs />);

    // Check if the "More about" text is rendered
    expect(screen.getByText('More about')).toBeInTheDocument();

    // Check if the HeadingPrimary component is rendered with the correct text
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Skinsight & our journey');
  });

  /**
   * Test 2: Verify that the component renders the section headings
   *
   * This test ensures that:
   * - The section headings are rendered with the correct text
   */
  it('renders the section headings', () => {
    render(<AboutUs />);

    // Check if the section headings are rendered
    expect(screen.getByText('Your personalized AI tool for recommending skincare products and more')).toBeInTheDocument();
    expect(screen.getByText('What sets us apart')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the Lorem Ipsum paragraphs
   *
   * This test ensures that:
   * - The Lorem Ipsum paragraphs are rendered
   */
  it('renders the Lorem Ipsum paragraphs', () => {
    render(<AboutUs />);

    // Check if the Lorem Ipsum paragraphs are rendered
    // We can check for the start of the Lorem Ipsum text which is common in all paragraphs
    const loremIpsumTexts = screen.getAllByText(/Lorem Ipsum is simply dummy text/i);
    expect(loremIpsumTexts.length).toBeGreaterThan(0);
  });

  /**
   * Test 4: Verify that the component has the correct structure
   *
   * This test ensures that:
   * - The component has a container section
   * - The component has an article element
   */
  it('has the correct structure', () => {
    const { container } = render(<AboutUs />);

    // Check if the component has a section with the container class
    const sectionElement = container.querySelector('section.container');
    expect(sectionElement).toBeInTheDocument();

    // Check if the component has an article element
    const articleElement = container.querySelector('article');
    expect(articleElement).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component applies the correct styles
   *
   * This test ensures that:
   * - The heading and body text have the correct style classes
   */
  it('applies the correct styles', () => {
    render(<AboutUs />);

    // Check if the main heading elements have the correct style class
    const mainHeadings = [
      screen.getByText('Your personalized AI tool for recommending skincare products and more'),
      screen.getByText('What sets us apart')
    ];

    mainHeadings.forEach(element => {
      expect(element).toHaveClass('text-2xl');
      expect(element).toHaveClass('font-medium');
      expect(element).toHaveClass('text-accent');
    });

    // Check if the body paragraphs have the correct style class
    const bodyElements = screen.getAllByText(/Lorem Ipsum is simply dummy text/i);
    bodyElements.forEach(element => {
      if (element.tagName === 'P') {
        expect(element).toHaveClass('text-[#15143966]');
        expect(element).toHaveClass('text-base');
      }
    });
  });
});