import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SelectProductForSkinRegimen from '../SelectProductForSkinRegimen';
import { useAppDispatch } from '@/lib/redux/hook';
import { updatePersonalRegimen } from '@/redux/slices/regimenSlice';

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppDispatch: jest.fn(),
}));

// Mock the redux action
jest.mock('@/redux/slices/regimenSlice', () => ({
  updatePersonalRegimen: jest.fn(),
}));

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: ({ buttonProps }: any) => (
    <button data-testid="back-button" className={buttonProps?.className}>
      Back
    </button>
  ),
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, className, variant }: any) => (
    <button
      onClick={onClick}
      className={className}
      data-testid={`button-${variant || 'primary'}`}
    >
      {children}
    </button>
  ),
}));

// Mock the Combobox component
jest.mock('@/components/common/Combobox', () => ({
  Combobox: ({ options, value, onChange, placeholder }: any) => (
    <div data-testid={`combobox-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}>
      <select
        value={value?.value || ''}
        onChange={(e) => {
          const selectedOption = options.find((opt: any) => opt.value === e.target.value);
          onChange(selectedOption);
        }}
        data-testid={`select-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
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

// Mock the Modal component
jest.mock('@/components/common/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, children, contentClassName }: any) => (
    isOpen ? (
      <div data-testid="modal" className={contentClassName}>
        {children}
      </div>
    ) : null
  ),
}));

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="product-image"
    />
  ),
}));

describe('SelectProductForSkinRegimen Component', () => {
  // Setup common mocks before each test
  const mockDispatch = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (updatePersonalRegimen as jest.Mock).mockReturnValue({ type: 'UPDATE_PERSONAL_REGIMEN' });
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  /**
   * Test 1: Verify that the component renders the modal when open
   *
   * This test ensures that:
   * - The Modal component is rendered when isOpen is true
   */
  it('renders the modal when open', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Check if the Modal component is rendered
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component does not render the modal when closed
   *
   * This test ensures that:
   * - The Modal component is not rendered when isOpen is false
   */
  it('does not render the modal when closed', () => {
    render(<SelectProductForSkinRegimen regimenType="" onClose={mockOnClose} />);

    // Check if the Modal component is not rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the correct title based on regimenType
   *
   * This test ensures that:
   * - The correct title is rendered based on the regimenType prop
   */
  it('renders the correct title based on regimenType', () => {
    const { unmount } = render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Check if the correct title is rendered
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Add a cleanser');

    // Unmount the first component
    unmount();

    // Render with a different regimenType
    render(<SelectProductForSkinRegimen regimenType="spf" onClose={mockOnClose} />);

    // Check if the correct title is rendered
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Add a SPF');
  });

  /**
   * Test 4: Verify that the component renders the comboboxes
   *
   * This test ensures that:
   * - The brand and product comboboxes are rendered
   */
  it('renders the brand and product comboboxes', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Check if the brand combobox is rendered
    expect(screen.getByTestId('combobox-select-brand')).toBeInTheDocument();

    // Check if the product combobox is rendered
    expect(screen.getByTestId('combobox-select-product')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the category combobox for missing-something
   *
   * This test ensures that:
   * - The category combobox is rendered when regimenType is "missing-something"
   */
  it('renders the category combobox for missing-something', () => {
    render(<SelectProductForSkinRegimen regimenType="missing-something" onClose={mockOnClose} />);

    // Check if the category combobox is rendered
    expect(screen.getByTestId('combobox-select-category')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders the Next and Cancel buttons
   *
   * This test ensures that:
   * - The Next and Cancel buttons are rendered
   */
  it('renders the Next and Cancel buttons', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Check if the Next button is rendered
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Check if the Cancel button is rendered
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that selecting a brand updates the state
   *
   * This test ensures that:
   * - Selecting a brand updates the component state
   */
  it('updates state when a brand is selected', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Select a brand
    fireEvent.change(screen.getByTestId('select-select-brand'), { target: { value: '1' } });

    // Select a product
    fireEvent.change(screen.getByTestId('select-select-product'), { target: { value: '1' } });

    // Click the Next button
    fireEvent.click(screen.getByText('Next'));

    // Check if the updatePersonalRegimen action was dispatched with the correct payload
    expect(updatePersonalRegimen).toHaveBeenCalledWith({
      type: 'cleanser',
      regimen: {
        brandId: '1',
        productId: '1',
        productImage: '/products/product1.png',
      },
    });

    // Check if the onClose callback was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  /**
   * Test 8: Verify that clicking Cancel closes the modal
   *
   * This test ensures that:
   * - Clicking the Cancel button calls the onClose callback
   */
  it('closes the modal when Cancel is clicked', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if the onClose callback was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  /**
   * Test 9: Verify that the product image is displayed when a product is selected
   *
   * This test ensures that:
   * - The product image is displayed when a product is selected
   */
  it('displays the product image when a product is selected', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Initially, no product image should be displayed
    expect(screen.queryAllByTestId('product-image').length).toBe(0);

    // Select a brand
    fireEvent.change(screen.getByTestId('select-select-brand'), { target: { value: '1' } });

    // Select a product
    fireEvent.change(screen.getByTestId('select-select-product'), { target: { value: '1' } });

    // Now, the product images should be displayed (one for mobile, one for desktop)
    const productImages = screen.getAllByTestId('product-image');
    expect(productImages.length).toBe(2);

    // Check that both images have the correct src
    productImages.forEach(image => {
      expect(image).toHaveAttribute('src', '/products/product1.png');
    });
  });

  /**
   * Test 10: Verify that the Next button is disabled when no product is selected
   *
   * This test ensures that:
   * - The Next button is disabled when no product is selected
   */
  it('does not dispatch action when Next is clicked without a product selection', () => {
    render(<SelectProductForSkinRegimen regimenType="cleanser" onClose={mockOnClose} />);

    // Click the Next button without selecting a product
    fireEvent.click(screen.getByText('Next'));

    // Check if the updatePersonalRegimen action was not dispatched
    expect(updatePersonalRegimen).not.toHaveBeenCalled();

    // Check if the onClose callback was not called
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});