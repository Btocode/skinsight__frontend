import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComfortableProductCount from '../ComfortableProductCount';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setRegimenState } from '@/redux/slices/regimenSlice';
import { useRouter } from 'next/navigation';

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the redux action
jest.mock('@/redux/slices/regimenSlice', () => ({
  setRegimenState: jest.fn(),
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

describe('ComfortableProductCount Component', () => {
  // Setup common mocks before each test
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(null); // Default to no selection
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (setRegimenState as jest.Mock).mockReturnValue({ type: 'SET_REGIMEN_STATE' });
  });

  /**
   * Test 1: Verify that the component renders the heading
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with the correct text
   */
  it('renders the heading', () => {
    render(<ComfortableProductCount />);

    // Check if the HeadingPrimary component is rendered with the correct text
    expect(screen.getByTestId('heading-primary')).toHaveTextContent(
      'How many products are you comfortable using in a regimen?'
    );
  });

  /**
   * Test 2: Verify that the component renders the product count options
   *
   * This test ensures that:
   * - All three product count options are rendered
   */
  it('renders the product count options', () => {
    render(<ComfortableProductCount />);

    // Check if all three product count options are rendered
    expect(screen.getByText('3-4')).toBeInTheDocument();
    expect(screen.getByText('5-6')).toBeInTheDocument();
    expect(screen.getByText('7+')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', () => {
    render(<ComfortableProductCount />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that clicking an option dispatches the setRegimenState action
   *
   * This test ensures that:
   * - Clicking a product count option dispatches the setRegimenState action with the correct payload
   */
  it('dispatches setRegimenState action when an option is clicked', async () => {
    render(<ComfortableProductCount />);

    // Click the "3-4" option
    fireEvent.click(screen.getByText('3-4'));

    // Check if the setRegimenState action was dispatched with the correct payload
    expect(setRegimenState).toHaveBeenCalledWith({ productCount: '3-4' });
    expect(mockDispatch).toHaveBeenCalled();

    // Wait for the navigation to occur after the timeout
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/build-regimen/using-products-selection');
    }, { timeout: 1100 }); // Slightly longer than the 1000ms timeout in the component
  });

  /**
   * Test 5: Verify that the component shows the selected option as checked
   *
   * This test ensures that:
   * - The selected option is visually marked as checked
   */
  it('shows the selected option as checked', () => {
    // Mock the useAppSelector to return a selected product count
    (useAppSelector as jest.Mock).mockReturnValue('5-6');

    render(<ComfortableProductCount />);

    // Find all the option divs
    const options = screen.getAllByRole('generic', { name: '' }).filter(
      div => div.className.includes('rounded-xl')
    );

    // Find the selected option (should be the "5-6" option)
    const selectedOption = options.find(option =>
      option.textContent?.includes('5-6')
    );

    // Check if the selected option has the "bg-primary" class
    expect(selectedOption).toHaveClass('bg-primary');

    // Check if the checkmark SVG is rendered in the selected option
    const checkmarkSVG = selectedOption?.querySelector('svg');
    expect(checkmarkSVG).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that non-selected options are not marked as checked
   *
   * This test ensures that:
   * - Non-selected options are not visually marked as checked
   */
  it('does not show non-selected options as checked', () => {
    // Mock the useAppSelector to return a selected product count
    (useAppSelector as jest.Mock).mockReturnValue('5-6');

    render(<ComfortableProductCount />);

    // Find all the option divs
    const options = screen.getAllByRole('generic', { name: '' }).filter(
      div => div.className.includes('rounded-xl')
    );

    // Find the non-selected options
    const nonSelectedOptions = options.filter(option =>
      !option.textContent?.includes('5-6')
    );

    // Check if the non-selected options do not have the "bg-primary" class
    nonSelectedOptions.forEach(option => {
      expect(option).not.toHaveClass('bg-primary');

      // Check if the checkmark SVG is not rendered in the non-selected options
      const checkmarkSVG = option.querySelector('svg');
      expect(checkmarkSVG).not.toBeInTheDocument();
    });
  });
});