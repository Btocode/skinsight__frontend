import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SelectYourTargetProduct from '../SelectYourTargetProduct';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setFindAlternatives } from '@/redux/slices/productSlice';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the redux actions
jest.mock('@/redux/slices/productSlice', () => ({
  setFindAlternatives: jest.fn(),
}));

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeholder: string;
  onChange: (option: ComboboxOption) => void;
  options: ComboboxOption[];
}

// Mock the Combobox component
jest.mock('@/components/common/Combobox', () => ({
  Combobox: ({ placeholder, onChange, options }: ComboboxProps) => (
    <div data-testid={`combobox-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}>
      <select
        data-testid={`select-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => option.value === e.target.value
          );
          onChange(selectedOption!);
        }}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('SelectYourTargetProduct Component', () => {
  // Setup common mocks and props before each test
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    // Default state - empty brand and product
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      // Create a mock state that matches the structure expected by the component
      const mockState = {
        product: {
          findAlternatives: {
            brand: '',
            product: ''
          }
        }
      };
      // Call the selector with our mock state to get the expected return value
      return selector(mockState);
    });

    (setFindAlternatives as jest.Mock).mockImplementation((payload) => ({
      type: 'product/setFindAlternatives',
      payload,
    }));
  });

  /**
   * Test 1: Verify that the component renders two Combobox components
   */
  it('renders two Combobox components', () => {
    render(<SelectYourTargetProduct />);

    // Check if both Combobox components are rendered
    expect(screen.getByTestId('combobox-select-brand')).toBeInTheDocument();
    expect(screen.getByTestId('combobox-select-product')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that selecting a brand dispatches the correct action
   */
  it('dispatches setFindAlternatives action when a brand is selected', () => {
    render(<SelectYourTargetProduct />);

    // Select a brand
    const brandSelect = screen.getByTestId('select-select-brand');
    fireEvent.change(brandSelect, { target: { value: 'brand1' } });

    // Check if the correct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'product/setFindAlternatives',
      payload: { key: 'brand', value: 'brand1' },
    });
  });

  /**
   * Test 3: Verify that selecting a product dispatches the correct action
   */
  it('dispatches setFindAlternatives action when a product is selected', () => {
    render(<SelectYourTargetProduct />);

    // Select a product
    const productSelect = screen.getByTestId('select-select-product');
    fireEvent.change(productSelect, { target: { value: 'Product1' } });

    // Check if the correct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'product/setFindAlternatives',
      payload: { key: 'product', value: 'Product1' },
    });
  });

  /**
   * Test 4: Verify that the component navigates to the alternatives page when both brand and product are selected
   */
  it('navigates to the alternatives page when both brand and product are selected', async () => {
    // Mock the state with both brand and product selected
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        product: {
          findAlternatives: {
            brand: 'brand1',
            product: 'Product1'
          }
        }
      };
      return selector(mockState);
    });

    // Use act to ensure the useEffect runs after render
    await act(async () => {
      render(<SelectYourTargetProduct />);
    });

    // Check if the router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/find-alternatives/top-alternatives-for-you');
  });

  /**
   * Test 5: Verify that the component does not navigate when brand is not selected
   */
  it('does not navigate when brand is not selected', () => {
    // Mock the state with only product selected
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        product: {
          findAlternatives: {
            brand: '',
            product: 'Product1'
          }
        }
      };
      return selector(mockState);
    });

    render(<SelectYourTargetProduct />);

    // Check if the router.push was not called
    expect(mockPush).not.toHaveBeenCalled();
  });

  /**
   * Test 6: Verify that the component does not navigate when product is not selected
   */
  it('does not navigate when product is not selected', () => {
    // Mock the state with only brand selected
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        product: {
          findAlternatives: {
            brand: 'brand1',
            product: ''
          }
        }
      };
      return selector(mockState);
    });

    render(<SelectYourTargetProduct />);

    // Check if the router.push was not called
    expect(mockPush).not.toHaveBeenCalled();
  });

  /**
   * Test 7: Verify that the component passes the correct options to the brand Combobox
   */
  it('passes the correct options to the brand Combobox', () => {
    render(<SelectYourTargetProduct />);

    // Select the brand Combobox
    const brandSelect = screen.getByTestId('select-select-brand');

    // Check if all brand options are available
    const brandOptions = Array.from(brandSelect.querySelectorAll('option')).slice(1); // Skip the placeholder option
    expect(brandOptions).toHaveLength(3);
    expect(brandOptions[0].textContent).toBe('Brand 1');
    expect(brandOptions[1].textContent).toBe('Brand 2');
    expect(brandOptions[2].textContent).toBe('Brand 3');
  });

  /**
   * Test 8: Verify that the component passes the correct options to the product Combobox
   */
  it('passes the correct options to the product Combobox', () => {
    render(<SelectYourTargetProduct />);

    // Select the product Combobox
    const productSelect = screen.getByTestId('select-select-product');

    // Check if all product options are available
    const productOptions = Array.from(productSelect.querySelectorAll('option')).slice(1); // Skip the placeholder option
    expect(productOptions).toHaveLength(3);
    expect(productOptions[0].textContent).toBe('Product 1');
    expect(productOptions[1].textContent).toBe('Product 2');
    expect(productOptions[2].textContent).toBe('Product 3');
  });
});