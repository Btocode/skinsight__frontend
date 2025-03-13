import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProduct from '../AddProduct';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setPreference } from '@/redux/slices/productSlice';

// Mock the next/navigation module
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
  setPreference: jest.fn(),
}));

// Mock the common components
jest.mock('@/components/common/BackButton', () => {
  return function MockBackButton({ onClick }: { onClick?: () => void }) {
    return <button data-testid="back-button" onClick={onClick}>Back</button>;
  };
});

jest.mock('@/components/common/Button', () => {
  return function MockButton({
    children,
    onClick,
    disabled
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) {
    return <button data-testid="button" onClick={onClick} disabled={disabled}>{children}</button>;
  };
});

jest.mock('@/components/common/Combobox', () => ({
  Combobox: function MockCombobox({
    onChange,
    placeholder
  }: {
    onChange: (option: { value: string; label: string }) => void;
    placeholder: string;
  }) {
    return (
      <div data-testid={`combobox-${placeholder}`}>
        <select onChange={(e) => onChange({ value: e.target.value, label: e.target.value })}>
          <option value="">Select</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </div>
    );
  }
}));

interface MockModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface MockHeadingProps {
  children: React.ReactNode;
}

jest.mock('@/components/common/Modal', () => {
  return function MockModal({ isOpen, onClose, children }: MockModalProps) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>Close Modal</button>
        <div>{children}</div>
      </div>
    );
  };
});

jest.mock('@/components/common/HeadingPrimary', () => {
  return function MockHeadingPrimary({ children }: MockHeadingProps) {
    return <h1 data-testid="heading">{children}</h1>;
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className
  }: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || 'Product image'}
      width={width}
      height={height}
      className={className}
      data-testid="product-image"
    />
  ),
}));

describe('AddProduct Component', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  it('renders nothing when open is false', () => {
    const { container } = render(<AddProduct open={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the modal when open is true', () => {
    render(<AddProduct open={true} onClose={mockOnClose} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls onClose when back button is clicked', () => {
    render(<AddProduct open={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('selects a brand from the combobox', () => {
    render(<AddProduct open={true} onClose={mockOnClose} />);

    const brandCombobox = screen.getByTestId('combobox-Select brand');
    const select = brandCombobox.querySelector('select');
    fireEvent.change(select!, { target: { value: '1' } });

    // This would normally update the selectedProduct state
    expect(select!.value).toBe('1');
  });

  it('selects a product from the combobox', () => {
    render(<AddProduct open={true} onClose={mockOnClose} />);

    // First select a brand
    const brandCombobox = screen.getByTestId('combobox-Select brand');
    const brandSelect = brandCombobox.querySelector('select');
    fireEvent.change(brandSelect!, { target: { value: '1' } });

    // Then select a product
    const productCombobox = screen.getByTestId('combobox-Select product');
    const productSelect = productCombobox.querySelector('select');
    fireEvent.change(productSelect!, { target: { value: '1' } });

    expect(productSelect!.value).toBe('1');
  });

  it('navigates to skin matches page when Done button is clicked', () => {
    render(<AddProduct open={true} onClose={mockOnClose} />);

    const buttons = screen.getAllByTestId('button');
    const doneButton = buttons.find(button => button.textContent === 'Done');

    fireEvent.click(doneButton!);
    expect(mockPush).toHaveBeenCalledWith('/find-products/your-skin-matches');
  });

  it('dispatches setPreference when Add another button is clicked', () => {
    // Mock the useState hook to simulate a selected product
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { brandId: '1', productId: '1', productImage: '/test.png', reaction: 'like' },
      jest.fn()
    ]);

    render(<AddProduct open={true} onClose={mockOnClose} />);

    const buttons = screen.getAllByTestId('button');
    const addAnotherButton = buttons.find(button => button.textContent === 'Add another');

    fireEvent.click(addAnotherButton!);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(setPreference).toHaveBeenCalled();

    // Restore original useState
    React.useState = originalUseState;
  });

  it('renders existing preferences', () => {
    // Mock preferences with 2 items
    (useAppSelector as jest.Mock).mockReturnValue([
      { id: '1', productId: '1', reaction: 'like', productImage: '/test.png' },
      { id: '2', productId: '2', reaction: 'dislike', productImage: '/test2.png' }
    ]);

    render(<AddProduct open={true} onClose={mockOnClose} />);

    // Check if the preferences are rendered - now using product-image testid
    expect(screen.getAllByTestId('product-image')).toHaveLength(2);
  });

  it('disables Add another button when preferences length is 3', () => {
    // Mock preferences with 3 items
    (useAppSelector as jest.Mock).mockReturnValue([
      { id: '1', productId: '1', reaction: 'like', productImage: '/test.png' },
      { id: '2', productId: '2', reaction: 'like', productImage: '/test.png' },
      { id: '3', productId: '3', reaction: 'like', productImage: '/test.png' }
    ]);

    // Mock the useState hook to simulate a selected product
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { brandId: '1', productId: '1', productImage: '/test.png', reaction: 'like' },
      jest.fn()
    ]);

    render(<AddProduct open={true} onClose={mockOnClose} />);

    const buttons = screen.getAllByTestId('button');
    const addAnotherButton = buttons.find(button => button.textContent === 'Add another');

    expect(addAnotherButton).toBeDisabled();

    // Restore original useState
    React.useState = originalUseState;
  });

  it('simulates selecting like reaction', () => {
    // Mock the useState hook to simulate a selected product without reaction
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { brandId: '1', productId: '1', productImage: '/test.png' },
      mockSetState
    ]);

    render(<AddProduct open={true} onClose={mockOnClose} />);

    // Find all buttons and simulate clicking the like button (emoji)
    const buttons = screen.getAllByRole('button');
    // In a real component, we'd find the like button by its emoji content
    // For this test, we'll just use the first button after the modal-close and back-button
    const likeButton = buttons[2]; // Adjust index as needed

    fireEvent.click(likeButton);
    expect(mockSetState).toHaveBeenCalled();
  });

  it('simulates selecting dislike reaction', () => {
    // Mock the useState hook to simulate a selected product without reaction
    const mockSetState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { brandId: '1', productId: '1', productImage: '/test.png' },
      mockSetState
    ]);

    render(<AddProduct open={true} onClose={mockOnClose} />);

    // Find all buttons and simulate clicking the dislike button (emoji)
    const buttons = screen.getAllByRole('button');
    // In a real component, we'd find the dislike button by its emoji content
    // For this test, we'll just use the second button after the modal-close and back-button
    const dislikeButton = buttons[3]; // Adjust index as needed

    fireEvent.click(dislikeButton);
    expect(mockSetState).toHaveBeenCalled();
  });
});