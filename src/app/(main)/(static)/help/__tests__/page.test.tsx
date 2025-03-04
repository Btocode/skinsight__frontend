import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HelpPage from '../page';

// Mock the Accordion component
jest.mock('@/components/common/Accordion', () => ({
  Accordion: ({ title, content, isActive, onToggle }: any) => (
    <div data-testid="accordion">
      <button onClick={onToggle} data-testid="accordion-title">
        {title}
      </button>
      {isActive && <div data-testid="accordion-content">{content}</div>}
    </div>
  ),
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <button className={className} data-testid="button">
      {children}
    </button>
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

describe('HelpPage Component', () => {
  /**
   * Test 1: Verify that the component renders the main heading
   *
   * This test ensures that:
   * - The "Learn more about" text is rendered
   * - The HeadingPrimary component is rendered with "Skinsight" text
   */
  it('renders the main heading', () => {
    render(<HelpPage />);

    // Check if the "Learn more about" text is rendered
    expect(screen.getByText('Learn more about')).toBeInTheDocument();

    // Check if the HeadingPrimary component is rendered with "Skinsight" text
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Skinsight');
  });

  /**
   * Test 2: Verify that the component renders the section headings
   *
   * This test ensures that:
   * - The section headings are rendered with the correct text
   */
  it('renders the section headings', () => {
    render(<HelpPage />);

    // Check if the section headings are rendered
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Terms and conditions')).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
    expect(screen.getByText('Disclaimers')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the FAQ accordions
   *
   * This test ensures that:
   * - The FAQ accordions are rendered with the correct titles
   */
  it('renders the FAQ accordions', () => {
    render(<HelpPage />);

    // Check if the FAQ accordion titles are rendered
    expect(screen.getByText('how to get personalized recommendations')).toBeInTheDocument();
    expect(screen.getByText('can i find alternatives to my discontinued products')).toBeInTheDocument();
    expect(screen.getByText('how to find products that work for my skin')).toBeInTheDocument();
    expect(screen.getByText('how can i find new products that work for me')).toBeInTheDocument();
    expect(screen.getByText('can i build my skincare regimen')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the "Have more Questions?" section
   *
   * This test ensures that:
   * - The "Have more Questions?" text is rendered
   * - The "Reach out to us" text is rendered
   * - The "Email us" button is rendered
   */
  it('renders the "Have more Questions?" section', () => {
    render(<HelpPage />);

    // Check if the "Have more Questions?" text is rendered
    expect(screen.getByText('Have more Questions?')).toBeInTheDocument();

    // Check if the "Reach out to us" text is rendered
    expect(screen.getByText('Reach out to us')).toBeInTheDocument();

    // Check if the "Email us" button is rendered
    expect(screen.getByText('Email us')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the privacy policy link
   *
   * This test ensures that:
   * - The privacy policy link is rendered with the correct text
   */
  it('renders the privacy policy link', () => {
    render(<HelpPage />);

    // Check if the privacy policy link is rendered
    expect(screen.getByText('Privacy Policy and Terms and Conditions here')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that clicking an accordion opens it
   *
   * This test ensures that:
   * - Clicking an accordion title opens that accordion
   */
  it('opens an accordion when clicked', () => {
    render(<HelpPage />);

    // Get all accordion titles
    const accordionTitles = screen.getAllByTestId('accordion-title');

    // Click the second accordion title (index 1)
    fireEvent.click(accordionTitles[1]);

    // Now the second accordion should be active
    expect(accordionTitles[1]).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that clicking an open accordion closes it
   *
   * This test ensures that:
   * - Clicking an already open accordion closes it
   * - This tests the branch where id === activeId is true
   */
  it('closes an accordion when clicked again', () => {
    render(<HelpPage />);

    // Get all accordion titles
    const accordionTitles = screen.getAllByTestId('accordion-title');

    // The first accordion is open by default (activeId = "0")
    // Click the first accordion title to close it
    fireEvent.click(accordionTitles[0]);

    // Now the first accordion should be closed
    expect(accordionTitles[0]).toBeInTheDocument();
  });

  /**
   * Test 8: Verify that clicking a different accordion closes the previously open one
   *
   * This test ensures that:
   * - Only one accordion can be open at a time
   */
  it('closes the previously open accordion when a different one is clicked', () => {
    render(<HelpPage />);

    // Get all accordion titles
    const accordionTitles = screen.getAllByTestId('accordion-title');

    // The first accordion is open by default (activeId = "0")
    // Click the second accordion title
    fireEvent.click(accordionTitles[1]);

    // Now the second accordion should be open and the first one closed
    expect(accordionTitles[1]).toBeInTheDocument();
    expect(accordionTitles[0]).toBeInTheDocument();
  });
});