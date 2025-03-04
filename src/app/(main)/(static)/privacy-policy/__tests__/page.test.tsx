import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from '../page';

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

// Mock the HeadingPrimary component
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h1 data-testid="heading-primary" className={className}>{children}</h1>
  ),
}));

describe('PrivacyPolicyPage Component', () => {
  /**
   * Test 1: Verify that the component renders the back button
   *
   * This test ensures that:
   * - The BackButton component is rendered
   */
  it('renders the back button', () => {
    render(<PrivacyPolicyPage />);

    // Check if the BackButton component is rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the main heading
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with "Privacy Policy" text
   */
  it('renders the main heading', () => {
    render(<PrivacyPolicyPage />);

    // Check if the HeadingPrimary component is rendered with "Privacy Policy" text
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Privacy Policy');
  });

  /**
   * Test 3: Verify that the component renders the section headings
   *
   * This test ensures that:
   * - The section headings are rendered with the correct text
   */
  it('renders the section headings', () => {
    render(<PrivacyPolicyPage />);

    // Check if the section headings are rendered
    expect(screen.getByText('Privacy Policy', { selector: 'h4' })).toBeInTheDocument();
    expect(screen.getByText('Terms and conditions')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the Lorem Ipsum paragraphs
   *
   * This test ensures that:
   * - The Lorem Ipsum paragraphs are rendered
   */
  it('renders the Lorem Ipsum paragraphs', () => {
    render(<PrivacyPolicyPage />);

    // Check if the Lorem Ipsum paragraphs are rendered
    // We can check for the start of the Lorem Ipsum text which is common in all paragraphs
    const loremIpsumTexts = screen.getAllByText(/Lorem Ipsum is simply dummy text/i);
    expect(loremIpsumTexts.length).toBeGreaterThan(0);
  });

  /**
   * Test 5: Verify that the component has the correct structure
   *
   * This test ensures that:
   * - The component has a section with the container class
   * - The component has an article element
   * - The component has a horizontal rule
   */
  it('has the correct structure', () => {
    const { container } = render(<PrivacyPolicyPage />);

    // Check if the component has a section with the container class
    const sectionElement = container.querySelector('section.container');
    expect(sectionElement).toBeInTheDocument();

    // Check if the component has an article element
    const articleElement = container.querySelector('article');
    expect(articleElement).toBeInTheDocument();

    // Check if the component has a horizontal rule
    const hrElement = container.querySelector('hr');
    expect(hrElement).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component applies the correct styles
   *
   * This test ensures that:
   * - The heading and body text have the correct style classes
   */
  it('applies the correct styles', () => {
    render(<PrivacyPolicyPage />);

    // Check if the heading elements have the correct style class
    const headingElements = screen.getAllByRole('heading');
    headingElements.forEach(element => {
      if (element.tagName === 'H4') {
        expect(element).toHaveClass('text-2xl');
        expect(element).toHaveClass('font-medium');
        expect(element).toHaveClass('text-accent');
      }
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

  /**
   * Test 7: Verify that the horizontal rule has the correct classes
   *
   * This test ensures that:
   * - The horizontal rule has the correct classes for styling
   */
  it('applies the correct classes to the horizontal rule', () => {
    const { container } = render(<PrivacyPolicyPage />);

    // Check if the horizontal rule has the correct classes
    const hrElement = container.querySelector('hr');
    expect(hrElement).toHaveClass('hidden');
    expect(hrElement).toHaveClass('lg:block');
    expect(hrElement).toHaveClass('w-full');
    expect(hrElement).toHaveClass('h-px');
    expect(hrElement).toHaveClass('my-4');
    expect(hrElement).toHaveClass('lg:my-8');
    expect(hrElement).toHaveClass('bg-[#EFEFEF]');
  });

  /**
   * Test 8: Verify that the article has the correct classes
   *
   * This test ensures that:
   * - The article element has the correct classes for layout
   */
  it('applies the correct classes to the article', () => {
    const { container } = render(<PrivacyPolicyPage />);

    // Check if the article element has the correct classes
    const articleElement = container.querySelector('article');
    expect(articleElement).toHaveClass('max-w-[1350px]');
    expect(articleElement).toHaveClass('mx-auto');
    expect(articleElement).toHaveClass('mt-10');
    expect(articleElement).toHaveClass('flex');
    expect(articleElement).toHaveClass('flex-col');
    expect(articleElement).toHaveClass('gap-8');
  });
});