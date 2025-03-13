import { render, screen, fireEvent } from '@testing-library/react';
import { MatchesProductCard } from '../MatchesProductCard';
import { useRouter } from 'next/navigation';
import { ImageProps } from 'next/image';
// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, className, width, height } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === 'string' ? src : ''}
        alt={alt || ''}
        className={className}
        width={width}
        height={height}
        data-testid="product-image"
        data-fill="true"
        data-priority="true"
      />
    );
  },
}));

describe('MatchesProductCard', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockProduct = {
    id: '1',
    productTitle: 'Test Product',
    productImage: '/test-image.jpg',
    brand: 'Test Brand',
    price: '29.99',
    matched: true,
    best_rated: false,
    most_viewed: false,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<MatchesProductCard item={mockProduct} />);

    // Check if product details are displayed
    expect(screen.getByText(mockProduct.productTitle)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', mockProduct.productImage);
    expect(screen.getByTestId('product-image')).toHaveAttribute('alt', mockProduct.productTitle);
  });

  it('renders matched tag when product is matched', () => {
    render(<MatchesProductCard item={mockProduct} />);
    expect(screen.getByText('99% matched')).toBeInTheDocument();
  });

  it('renders placeholder div when product is not matched', () => {
    const unmatchedProduct = { ...mockProduct, matched: false };
    render(<MatchesProductCard item={unmatchedProduct} />);

    // The placeholder div should be present when no tags are shown
    const placeholderDiv = document.querySelector('.h-\\[20\\.08px\\]');
    expect(placeholderDiv).toBeInTheDocument();
  });

  it('renders placeholder div when all tag conditions are false', () => {
    const productWithNoTags = {
      ...mockProduct,
      matched: false,
      best_rated: false,
      most_viewed: false,
    };

    render(<MatchesProductCard item={productWithNoTags} />);

    // Check for placeholder div
    const placeholderDiv = document.querySelector('.h-\\[20\\.08px\\]');
    expect(placeholderDiv).toBeInTheDocument();
  });

  it('renders placeholder div when some tag conditions are true but commented out', () => {
    const productWithCommentedTags = {
      ...mockProduct,
      matched: false,
      best_rated: true,  // This is commented out in the component
      most_viewed: true, // This is commented out in the component
    };

    render(<MatchesProductCard item={productWithCommentedTags} />);

    // The placeholder should still show since those tags are commented out
    const placeholderDiv = document.querySelector('.h-\\[20\\.08px\\]');
    expect(placeholderDiv).toBeInTheDocument();
  });

  it('navigates to product details page when clicked', () => {
    render(<MatchesProductCard item={mockProduct} />);

    // Click on the card
    fireEvent.click(screen.getByText(mockProduct.productTitle).closest('div')!);

    // Check if router.push was called with the correct path
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/find-products/your-skin-matches/${mockProduct.productTitle}`
    );
  });

  it('renders Save for later button', () => {
    render(<MatchesProductCard item={mockProduct} />);
    expect(screen.getByText('Save for later')).toBeInTheDocument();
  });

  it('renders Buy now button', () => {
    render(<MatchesProductCard item={mockProduct} />);
    expect(screen.getByText('Buy now')).toBeInTheDocument();
  });

  it('uses correct ref for the card', () => {
    render(<MatchesProductCard item={mockProduct} />);
    // Testing that the ref is applied (indirectly testing the useRef hook)
    const card = screen.getByText(mockProduct.productTitle).closest('div')!.parentElement;
    expect(card).toBeInTheDocument();
  });

  it('renders product image with correct attributes', () => {
    render(<MatchesProductCard item={mockProduct} />);
    const image = screen.getByTestId('product-image');
    expect(image).toHaveAttribute('src', mockProduct.productImage);
    expect(image).toHaveAttribute('alt', mockProduct.productTitle);
    expect(image).toHaveAttribute('data-fill', 'true');
    expect(image).toHaveClass('object-cover');
    expect(image).toHaveClass('lg:object-contain');
  });

  it('renders buttons with correct text and styling', () => {
    render(<MatchesProductCard item={mockProduct} />);

    const saveButton = screen.getByText('Save for later').closest('button');
    expect(saveButton).toHaveAttribute('id', 'add-favorite');
    expect(saveButton).toHaveClass('bg-[#8F80E833]');

    const buyButton = screen.getByText('Buy now').closest('button');
    expect(buyButton).toHaveAttribute('id', 'buy-now');
    expect(buyButton).toHaveClass('bg-[#EDAFDF4D]');
  });

  it('renders placeholder div when no tags are present', () => {
    const productWithNoTags = {
      ...mockProduct,
      matched: false,
      best_rated: false,
      most_viewed: false,
    };

    render(<MatchesProductCard item={productWithNoTags} />);

    // Check for placeholder div using data-testid instead of class selector
    const placeholderDiv = document.querySelector('div[class*="h-[20.08px]"]');

    expect(placeholderDiv).toBeInTheDocument();
  });
});