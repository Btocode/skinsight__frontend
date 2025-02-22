import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

// Mock Next/Image since it's used in the component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('ProductCard', () => {
  const mockProduct = {
    productImage: '/test-image.jpg',
    productTitle: 'Test Product',
    brandName: 'Test Brand',
    price: '29.99'
  };

  it('renders product information correctly', () => {
    render(<ProductCard item={mockProduct} />);

    // Check if all product information is displayed
    expect(screen.getByText(mockProduct.productTitle)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brandName)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();

    // Check if image is rendered with correct props
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.productImage);
    expect(image).toHaveAttribute('alt', mockProduct.productTitle);
  });

  it('renders save for later and buy now buttons', () => {
    render(<ProductCard item={mockProduct} />);

    // Check for buttons
    expect(screen.getByText('Save for later')).toBeInTheDocument();
    expect(screen.getByText('Buy now')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<ProductCard item={mockProduct} />);

    // Check main container styling
    const container = screen.getByRole('img').closest('div').parentElement;
    expect(container).toHaveClass(
      'w-full',
      'rounded-xl',
      'bg-white',
      'px-4',
      'py-3',
      'shadow-[0px_5.13px_33.34px_0px_#2C2C2C17]',
      'border',
      'border-[#EFEFEF]'
    );

    // Check image container styling
    const imageContainer = screen.getByRole('img').closest('div');
    expect(imageContainer).toHaveClass('h-36', 'w-36', 'lg:h-48', 'lg:w-48', 'relative');

    // Check button styling
    const saveButton = screen.getByText('Save for later').closest('button');
    expect(saveButton).toHaveClass(
      'w-[47.8px]',
      'lg:w-[141px]',
      'h-[45.89px]',
      'lg:h-[48px]',
      'flex',
      'items-center',
      'justify-center',
      'gap-[10px]',
      'rounded-[11.47px]',
      'lg:rounded-[12px]',
      'bg-[#8F80E833]',
      'transition-colors'
    );

    const buyButton = screen.getByText('Buy now').closest('button');
    expect(buyButton).toHaveClass(
      'w-[107.08px]',
      'lg:w-[141px]',
      'h-[45.89px]',
      'lg:h-[48px]',
      'flex',
      'items-center',
      'justify-center',
      'gap-[10px]',
      'rounded-[9.56px]',
      'lg:rounded-[12px]',
      'bg-[#EDAFDF4D]',
      'transition-colors'
    );
  });

  it('renders SVG icons in buttons', () => {
    render(<ProductCard item={mockProduct} />);

    // Check if SVGs are present
    const svgs = screen.getAllByRole('img', { hidden: true });
    expect(svgs).toHaveLength(2); // Should have 2 SVGs, one for each button
  });

  it('has correct button IDs', () => {
    render(<ProductCard item={mockProduct} />);

    const saveButton = screen.getByRole('button', { name: /save for later/i });
    const buyButton = screen.getByRole('button', { name: /buy now/i });

    expect(saveButton).toHaveAttribute('id', 'add-favorite');
    expect(buyButton).toHaveAttribute('id', 'buy-now');
  });

  it('renders responsive text elements', () => {
    render(<ProductCard item={mockProduct} />);

    // Check brand name styling
    const brandName = screen.getByText(mockProduct.brandName);
    expect(brandName).toHaveClass('text-sm', 'text-[#575656]');

    // Check product title styling
    const productTitle = screen.getByText(mockProduct.productTitle);
    expect(productTitle).toHaveClass('text-[16px]', 'font-semibold', 'text-[#575656]');

    // Check price styling
    const price = screen.getByText(`$${mockProduct.price}`);
    expect(price).toHaveClass('text-base', 'text-cyan-500', 'font-medium');
  });
});