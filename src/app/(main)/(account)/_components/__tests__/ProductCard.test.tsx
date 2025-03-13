import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

// Mock Next/Image since it's used in the component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img
      src={props.src as string}
      alt={props.alt as string}
      style={props.style}
      className={props.className}
    />;
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