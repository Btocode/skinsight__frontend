import React from 'react';
import { render, screen } from '@testing-library/react';
import BuilderRegimen, { generateStaticParams } from '../page';
import { notFound } from 'next/navigation';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock the use function from React
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    use: jest.fn((promise) => {
      // For our tests, we'll just return the resolved value directly
      if (typeof promise === 'object' && promise !== null && 'name' in promise) {
        return promise;
      }
      return promise;
    }),
  };
});

interface DynamicImportOptions {
  loading?: React.ComponentType;
}

interface DynamicImportFunction {
  toString(): string;
}

// Mock the dynamic imports
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFunc: DynamicImportFunction, options: DynamicImportOptions = {}) => {
    const { loading: LoadingComponent } = options;

    const MockComponent = () => {
      const componentName = importFunc.toString().includes('ComfortableProductCount')
        ? 'comfortable-product-count'
        : 'using-products-selection';

      return <div data-testid={componentName}>Mock Dynamic Component</div>;
    };

    if (LoadingComponent) {
      MockComponent.loading = LoadingComponent;
    }

    return MockComponent;
  },
}));

interface SectionTransformProps {
  children: React.ReactNode;
  type: 'up' | 'left';
}

// Mock the SectionTransform component
jest.mock('@/components/animations/SectionTransform', () => ({
  __esModule: true,
  default: ({ children, type }: SectionTransformProps) => (
    <div data-testid="section-transform" data-type={type}>
      {children}
    </div>
  ),
}));

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('BuilderRegimen Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Verify that the component renders ComfortableProductCount for the comfortable-products-count route
   *
   * This test ensures that:
   * - The ComfortableProductCount component is rendered when the route is comfortable-products-count
   */
  it('renders ComfortableProductCount for the comfortable-products-count route', () => {
    render(<BuilderRegimen params={{ name: 'comfortable-products-count' }} />);

    // Check if the ComfortableProductCount component is rendered
    expect(screen.getByTestId('comfortable-product-count')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders UsingProductsSelection for the using-products-selection route
   *
   * This test ensures that:
   * - The UsingProductsSelection component is rendered when the route is using-products-selection
   */
  it('renders UsingProductsSelection for the using-products-selection route', () => {
    render(<BuilderRegimen params={{ name: 'using-products-selection' }} />);

    // Check if the UsingProductsSelection component is rendered
    expect(screen.getByTestId('using-products-selection')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component calls notFound for an invalid route
   *
   * This test ensures that:
   * - The notFound function is called when the route is invalid
   */
  it('calls notFound for an invalid route', () => {
    render(<BuilderRegimen params={{ name: 'invalid-route' }} />);

    // Check if the notFound function was called
    expect(notFound).toHaveBeenCalled();
  });

  /**
   * Test 4: Verify that the component renders SectionTransform with the correct type
   *
   * This test ensures that:
   * - The SectionTransform component is rendered with the correct type based on the route
   */
  it('renders SectionTransform with the correct type for comfortable-products-count', () => {
    render(<BuilderRegimen params={{ name: 'comfortable-products-count' }} />);

    // Check if the SectionTransform component is rendered with the correct type
    expect(screen.getByTestId('section-transform')).toHaveAttribute('data-type', 'up');
  });

  it('renders SectionTransform with the correct type for using-products-selection', () => {
    render(<BuilderRegimen params={{ name: 'using-products-selection' }} />);

    // Check if the SectionTransform component is rendered with the correct type
    expect(screen.getByTestId('section-transform')).toHaveAttribute('data-type', 'left');
  });

  /**
   * Test 5: Verify that the component renders BackButton for the comfortable-products-count route
   *
   * This test ensures that:
   * - The BackButton component is rendered when the route is comfortable-products-count
   */
  it('renders BackButton for the comfortable-products-count route', () => {
    render(<BuilderRegimen params={{ name: 'comfortable-products-count' }} />);

    // Check if the BackButton component is rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component does not render BackButton for the using-products-selection route
   *
   * This test ensures that:
   * - The BackButton component is not rendered when the route is using-products-selection
   */
  it('does not render BackButton for the using-products-selection route', () => {
    render(<BuilderRegimen params={{ name: 'using-products-selection' }} />);

    // Check if the BackButton component is not rendered
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the component applies the correct classes to the section
   *
   * This test ensures that:
   * - The section has the correct classes based on the route
   */
  it('applies justify-center class to section for comfortable-products-count route', () => {
    const { container } = render(<BuilderRegimen params={{ name: 'comfortable-products-count' }} />);

    // Find the section element
    const section = container.querySelector('section');

    // Check if the section has the justify-center class
    expect(section).toHaveClass('justify-center');
  });

  it('does not apply justify-center class to section for using-products-selection route', () => {
    const { container } = render(<BuilderRegimen params={{ name: 'using-products-selection' }} />);

    // Find the section element
    const section = container.querySelector('section');

    // Check if the section does not have the justify-center class
    expect(section).not.toHaveClass('justify-center');
  });

  /**
   * Test 8: Verify that generateStaticParams returns the correct paths
   *
   * This test ensures that:
   * - The generateStaticParams function returns the correct paths
   */
  it('generateStaticParams returns the correct paths', () => {
    const params = generateStaticParams();
    expect(params).toEqual([
      { name: 'comfortable-products-count' },
      { name: 'using-products-selection' },
    ]);
  });
});