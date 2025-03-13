import React from 'react';
import { render, screen } from '@testing-library/react';
import AddPreferencePage from '../page';

// Mock the components
jest.mock('@/components/common/BackButton', () => {
  return {
    __esModule: true,
    default: ({ buttonProps }: { buttonProps: { className?: string } }) => (
      <button
        data-testid="back-button"
        className={buttonProps?.className}
      >
        Back
      </button>
    ),
  };
});

jest.mock('../_components/ActionPreference', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="action-preference">Action Preference Component</div>,
  };
});

jest.mock('@/components/common/GradientImage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="gradient-image">Gradient Image Component</div>,
  };
});

jest.mock('@/components/common/HeadingPrimary', () => {
  return {
    __esModule: true,
    default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <h1
        data-testid="heading-primary"
        className={className}
      >
        {children}
      </h1>
    ),
  };
});

describe('AddPreferencePage Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const { container } = render(<AddPreferencePage />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('container');
    expect(container.firstChild).toHaveClass('lg:max-w-lg');
    expect(container.firstChild).toHaveClass('mx-auto');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('lg:items-center');
    expect(container.firstChild).toHaveClass('min-h-[85svh]');
    expect(container.firstChild).toHaveClass('py-10');
    expect(container.firstChild).toHaveClass('relative');
  });

  /**
   * Test 2: Verify that the component renders the BackButton component
   */
  it('renders the BackButton component', () => {
    render(<AddPreferencePage />);

    // Check if the BackButton component is rendered
    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('self-start');
  });

  /**
   * Test 3: Verify that the component renders the HeadingPrimary component
   */
  it('renders the HeadingPrimary component', () => {
    render(<AddPreferencePage />);

    // Check if the HeadingPrimary component is rendered
    const headingPrimary = screen.getByTestId('heading-primary');
    expect(headingPrimary).toBeInTheDocument();
    expect(headingPrimary).toHaveClass('text-[28px]');
    expect(headingPrimary).toHaveClass('lg:text-[42px]');
    expect(headingPrimary).toHaveClass('leading-[33.32px]');
    expect(headingPrimary).toHaveClass('lg:leading-[49.98px]');
    expect(headingPrimary).toHaveClass('tracking-[-0.02em]');
    expect(headingPrimary).toHaveClass('font-semibold');
    expect(headingPrimary).toHaveTextContent('Current product preferences');
  });

  /**
   * Test 4: Verify that the component renders the description text
   */
  it('renders the description text', () => {
    render(<AddPreferencePage />);

    // Check if the description text is rendered
    const description = screen.getByText('Get better results by adding at least 5 products you love and hate using and rate them');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-[15px]');
    expect(description).toHaveClass('lg:text-xl');
    expect(description).toHaveClass('font-medium');
    expect(description).toHaveClass('leading-[20.7px]');
    expect(description).toHaveClass('lg:leading-[26px]');
    expect(description).toHaveClass('text-accent');
  });

  /**
   * Test 5: Verify that the component renders the ActionPreference component
   */
  it('renders the ActionPreference component', () => {
    render(<AddPreferencePage />);

    // Check if the ActionPreference component is rendered
    const actionPreference = screen.getByTestId('action-preference');
    expect(actionPreference).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the GradientImage component
   */
  it('renders the GradientImage component', () => {
    render(<AddPreferencePage />);

    // Check if the GradientImage component is rendered
    const gradientImage = screen.getByTestId('gradient-image');
    expect(gradientImage).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the component has the correct structure
   */
  it('has the correct structure', () => {
    const { container } = render(<AddPreferencePage />);

    // Check if the component has the correct structure
    const section = container.firstChild;
    expect(section?.nodeName).toBe('SECTION');

    const flexContainer = section?.firstChild;
    expect(flexContainer?.nodeName).toBe('DIV');
    expect(flexContainer).toHaveClass('flex');
    expect(flexContainer).toHaveClass('flex-col');
    expect(flexContainer).toHaveClass('lg:gap-3');

    // Check if the BackButton is the first child of the flex container
    const backButton = flexContainer?.firstChild;
    expect(backButton).toHaveAttribute('data-testid', 'back-button');

    // Check if the text container is the second child of the flex container
    const textContainer = flexContainer?.childNodes[1];
    expect(textContainer?.nodeName).toBe('DIV');
    expect(textContainer).toHaveClass('space-y-3');
    expect(textContainer).toHaveClass('my-[12px]');
    expect(textContainer).toHaveClass('lg:my-0');

    // Check if the ActionPreference is the third child of the flex container
    const actionPreference = flexContainer?.childNodes[2];
    expect(actionPreference).toHaveAttribute('data-testid', 'action-preference');

    // Check if the GradientImage is the second child of the section
    const gradientImage = section?.childNodes[1];
    expect(gradientImage).toHaveAttribute('data-testid', 'gradient-image');
  });

  /**
   * Test 8: Verify that the component is exported correctly
   */
  it('is exported correctly', () => {
    // Check if the component is exported correctly
    expect(AddPreferencePage).toBeDefined();
    expect(typeof AddPreferencePage).toBe('function');
  });
});