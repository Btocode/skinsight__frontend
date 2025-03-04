import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionPreference from '../ActionPreference';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => {
  return function MockButton({ children, onClick, className, variant }: any) {
    return (
      <button
        data-testid="button"
        data-variant={variant}
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
});

// Mock the AddProduct component
jest.mock('../AddProduct', () => {
  return function MockAddProduct({ open, onClose }: any) {
    return (
      <div
        data-testid="add-product"
        data-open={open.toString()}
        onClick={onClose}
      >
        Add Product Modal
      </div>
    );
  };
});

describe('ActionPreference Component', () => {
  // Setup mock router
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it('renders the component with Add and Skip buttons', () => {
    render(<ActionPreference />);

    // Check if the buttons are rendered
    const buttons = screen.getAllByTestId('button');
    expect(buttons.length).toBe(2);

    // Check Add button
    const addButton = buttons[0];
    expect(addButton).toHaveTextContent('Add');

    // Check Skip button
    const skipButton = buttons[1];
    expect(skipButton).toHaveTextContent('Skip');
    expect(skipButton).toHaveAttribute('data-variant', 'outline');
  });

  it('opens AddProduct modal when Add button is clicked', () => {
    render(<ActionPreference />);

    // Initially, the modal should be closed
    const addProductBefore = screen.getByTestId('add-product');
    expect(addProductBefore).toHaveAttribute('data-open', 'false');

    // Click the Add button
    const buttons = screen.getAllByTestId('button');
    const addButton = buttons[0];
    fireEvent.click(addButton);

    // After clicking, the modal should be open
    const addProductAfter = screen.getByTestId('add-product');
    expect(addProductAfter).toHaveAttribute('data-open', 'true');
  });

  it('calls router.back() when Skip button is clicked', () => {
    render(<ActionPreference />);

    // Click the Skip button
    const buttons = screen.getAllByTestId('button');
    const skipButton = buttons[1];
    fireEvent.click(skipButton);

    // Check if router.back() is called
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('closes AddProduct modal when onClose is called', () => {
    render(<ActionPreference />);

    // Open the modal first
    const buttons = screen.getAllByTestId('button');
    const addButton = buttons[0];
    fireEvent.click(addButton);

    // Check if the modal is open
    const addProductOpen = screen.getByTestId('add-product');
    expect(addProductOpen).toHaveAttribute('data-open', 'true');

    // Close the modal
    fireEvent.click(addProductOpen);

    // Check if the modal is closed
    const addProductClosed = screen.getByTestId('add-product');
    expect(addProductClosed).toHaveAttribute('data-open', 'false');
  });

  it('renders the AddProduct component with correct props', () => {
    render(<ActionPreference />);

    // Check if AddProduct is rendered with open=false initially
    const addProduct = screen.getByTestId('add-product');
    expect(addProduct).toBeInTheDocument();
    expect(addProduct).toHaveAttribute('data-open', 'false');
  });
});