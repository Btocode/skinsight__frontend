import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';
import Spinner from '@/components/common/Spinner';

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="spinner">Loading...</div>,
  };
});

describe('Loading Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const { container } = render(<Loading />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the Spinner component
   */
  it('renders the Spinner component', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component doesn't render anything else
   */
  it('doesn\'t render anything else', () => {
    const { container } = render(<Loading />);

    // Check if the container only has one child (the Spinner)
    expect(container.childNodes.length).toBe(1);
  });

  /**
   * Test 4: Verify that the component is exported correctly
   */
  it('is exported correctly', () => {
    // Check if the component is exported correctly
    expect(Loading).toBeDefined();
    expect(typeof Loading).toBe('function');
  });

  /**
   * Test 5: Verify that the component doesn't crash
   */
  it('doesn\'t crash', () => {
    // Check if the component doesn't crash
    expect(() => render(<Loading />)).not.toThrow();
  });

  /**
   * Test 6: Verify that the component returns only the Spinner component
   */
  it('returns only the Spinner component', () => {
    const { container } = render(<Loading />);

    // Check if the container's first child is the Spinner component
    expect(container.firstChild).toHaveAttribute('data-testid', 'spinner');
  });

});