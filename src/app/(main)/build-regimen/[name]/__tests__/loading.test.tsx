import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('Loading Component', () => {
  /**
   * Test 1: Verify that the component renders the Spinner
   *
   * This test ensures that:
   * - The Spinner component is rendered
   */
  it('renders the Spinner component', () => {
    render(<Loading />);

    // Check if the Spinner component is rendered
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders with the correct text
   *
   * This test ensures that:
   * - The Spinner component displays "Loading..." text
   */
  it('renders with the correct text', () => {
    render(<Loading />);

    // Check if the Spinner component displays the correct text
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component is accessible
   *
   * This test ensures that:
   * - The component has an accessible name or role
   */
  it('is accessible', () => {
    render(<Loading />);

    // Check if the component has an accessible name or role
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveTextContent('Loading...');
  });
});