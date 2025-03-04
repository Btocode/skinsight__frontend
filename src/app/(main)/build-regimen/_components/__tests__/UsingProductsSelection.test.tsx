import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsingProductsSelection from '../UsingProductsSelection';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { onClearPersonalRegimen } from '@/redux/slices/regimenSlice';
import { useRouter } from 'next/navigation';

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the redux action
jest.mock('@/redux/slices/regimenSlice', () => ({
  onClearPersonalRegimen: jest.fn(),
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, disabled }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid="generate-button"
    >
      {children}
    </button>
  ),
}));

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
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

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }: any) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="product-image"
      data-fill={fill ? 'true' : 'false'}
    />
  ),
}));

// Mock the SelectProductForSkinRegimen component
jest.mock('../SelectProductForSkinRegimen', () => ({
  __esModule: true,
  default: ({ regimenType, onClose }: any) => (
    <div data-testid="select-product-modal" data-regimen-type={regimenType}>
      <button onClick={onClose} data-testid="close-modal-button">Close</button>
    </div>
  ),
}));

describe('UsingProductsSelection Component', () => {
  // Setup common mocks before each test
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();
  const originalConsoleLog = console.log;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.log to prevent output
    console.log = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({});
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (onClearPersonalRegimen as jest.Mock).mockReturnValue({ type: 'CLEAR_PERSONAL_REGIMEN' });
  });

  afterEach(() => {
    // Restore original console.log
    console.log = originalConsoleLog;
  });

  /**
   * Test 1: Verify that the component renders the heading
   *
   * This test ensures that:
   * - The HeadingPrimary component is rendered with the correct text
   */
  it('renders the heading', () => {
    render(<UsingProductsSelection />);

    // Check if the HeadingPrimary components are rendered with the correct text
    const headings = screen.getAllByTestId('heading-primary');
    expect(headings.some(h => h.textContent?.includes('Skin regimen'))).toBeTruthy();

    // The mobile heading includes a line break, so we need to check for partial text
    expect(headings.some(h => h.textContent?.includes('Build your'))).toBeTruthy();
    expect(headings.some(h => h.textContent?.includes('personal skin regimen'))).toBeTruthy();
  });

  /**
   * Test 2: Verify that the component renders the product items
   *
   * This test ensures that:
   * - All product items are rendered
   */
  it('renders the product items', () => {
    render(<UsingProductsSelection />);

    // Check if all product items are rendered
    expect(screen.getByText('Add a cleanser')).toBeInTheDocument();
    expect(screen.getByText('Add a SPF')).toBeInTheDocument();
    expect(screen.getByText('Add a moisturiser')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders the "Missing something?" option
   *
   * This test ensures that:
   * - The "Missing something?" option is rendered when there are 3 or more selected regimens
   */
  it('renders the "Missing something?" option when there are 3 or more selected regimens', () => {
    // Mock the useAppSelector to return 3 selected regimens
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
      spf: { productId: '2', productImage: '/products/product2.png' },
      moisturiser: { productId: '3', productImage: '/products/product3.png' },
    });

    render(<UsingProductsSelection />);

    // Check if the "Missing something?" option is rendered
    expect(screen.getByText('Missing something?')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component does not render the "Missing something?" option
   *
   * This test ensures that:
   * - The "Missing something?" option is not rendered when there are fewer than 3 selected regimens
   */
  it('does not render the "Missing something?" option when there are fewer than 3 selected regimens', () => {
    // Mock the useAppSelector to return 2 selected regimens
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
      spf: { productId: '2', productImage: '/products/product2.png' },
    });

    render(<UsingProductsSelection />);

    // Check if the "Missing something?" option is not rendered
    expect(screen.queryByText('Missing something?')).not.toBeInTheDocument();
  });

  /**
   * Test 5: Verify that clicking a product item opens the SelectProductForSkinRegimen modal
   *
   * This test ensures that:
   * - Clicking a product item opens the SelectProductForSkinRegimen modal with the correct regimenType
   */
  it('opens the SelectProductForSkinRegimen modal when a product item is clicked', () => {
    render(<UsingProductsSelection />);

    // Click the "Add a cleanser" button
    fireEvent.click(screen.getByText('Add a cleanser'));

    // Check if the SelectProductForSkinRegimen modal is rendered with the correct regimenType
    expect(screen.getByTestId('select-product-modal')).toBeInTheDocument();
    expect(screen.getByTestId('select-product-modal')).toHaveAttribute('data-regimen-type', 'cleanser');
  });

  /**
   * Test 6: Verify that clicking the close button on the modal closes it
   *
   * This test ensures that:
   * - Clicking the close button on the modal closes it
   */
  it('closes the SelectProductForSkinRegimen modal when the close button is clicked', () => {
    render(<UsingProductsSelection />);

    // Click the "Add a cleanser" button to open the modal
    fireEvent.click(screen.getByText('Add a cleanser'));

    // Check if the modal is rendered
    expect(screen.getByTestId('select-product-modal')).toBeInTheDocument();

    // Click the close button on the modal
    fireEvent.click(screen.getByTestId('close-modal-button'));

    // Check if the modal is closed
    expect(screen.queryByTestId('select-product-modal')).not.toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the Generate button is disabled when no products are selected
   *
   * This test ensures that:
   * - The Generate button is disabled when no products are selected
   */
  it('disables the Generate button when no products are selected', () => {
    // Mock the useAppSelector to return an empty object (no selected regimens)
    (useAppSelector as jest.Mock).mockReturnValue({});

    render(<UsingProductsSelection />);

    // Check if the Generate button is disabled
    expect(screen.getByTestId('generate-button')).toBeDisabled();
  });

  /**
   * Test 8: Verify that the Generate button is enabled when at least one product is selected
   *
   * This test ensures that:
   * - The Generate button is enabled when at least one product is selected
   */
  it('enables the Generate button when at least one product is selected', () => {
    // Mock the useAppSelector to return one selected regimen
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
    });

    render(<UsingProductsSelection />);

    // Check if the Generate button is enabled
    expect(screen.getByTestId('generate-button')).not.toBeDisabled();
  });

  /**
   * Test 9: Verify that clicking the Generate button navigates to the next page
   *
   * This test ensures that:
   * - Clicking the Generate button navigates to the next page
   */
  it('navigates to the next page when the Generate button is clicked', () => {
    // Mock the useAppSelector to return one selected regimen
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
    });

    render(<UsingProductsSelection />);

    // Click the Generate button
    fireEvent.click(screen.getByTestId('generate-button'));

    // Check if the router.push method was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/build-regimen/your-new-skin-regimen');
  });

  /**
   * Test 10: Verify that clicking the remove button on a selected product removes it
   *
   * This test ensures that:
   * - Clicking the remove button on a selected product dispatches the onClearPersonalRegimen action
   */
  it('removes a selected product when the remove button is clicked', () => {
    // Mock the useAppSelector to return one selected regimen
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
    });

    render(<UsingProductsSelection />);

    // Find the remove button (the SVG inside the button)
    const removeButton = screen.getByRole('button', { name: '' });

    // Click the remove button
    fireEvent.click(removeButton);

    // Check if the onClearPersonalRegimen action was dispatched with the correct payload
    expect(onClearPersonalRegimen).toHaveBeenCalledWith('cleanser');
    expect(mockDispatch).toHaveBeenCalled();
  });

  /**
   * Test 11: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', () => {
    render(<UsingProductsSelection />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 12: Verify that the component renders the BackButton
   *
   * This test ensures that:
   * - The BackButton component is rendered
   */
  it('renders the BackButton', () => {
    render(<UsingProductsSelection />);

    // Check if the BackButton component is rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 13: Verify that the console.log statement is called
   *
   * This test ensures that:
   * - The console.log statement is called with the correct value
   */
  it('logs the correct value to the console', () => {
    // Mock the useAppSelector to return 3 selected regimens
    (useAppSelector as jest.Mock).mockReturnValue({
      cleanser: { productId: '1', productImage: '/products/product1.png' },
      spf: { productId: '2', productImage: '/products/product2.png' },
      moisturiser: { productId: '3', productImage: '/products/product3.png' },
    });

    render(<UsingProductsSelection />);

    // Check if console.log was called with the correct value
    expect(console.log).toHaveBeenCalledWith(true);
  });
});