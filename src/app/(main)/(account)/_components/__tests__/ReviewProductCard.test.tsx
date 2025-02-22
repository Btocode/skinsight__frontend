import { render, screen } from '@testing-library/react';
import ReviewProductCard from '../ReviewProductCard';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} fill="true" />,
}));

describe('ReviewProductCard', () => {
  const mockItem = {
    productImage: '/test-image.jpg',
    productTitle: 'Test Product',
  };

  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    render(<ReviewProductCard item={mockItem} />);
  });

  // Test 2: Check product image
  it('renders product image correctly', () => {
    render(<ReviewProductCard item={mockItem} />);
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('object-contain');
  });

  // Test 3: Check product title
  it('renders product title', () => {
    render(<ReviewProductCard item={mockItem} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  // Test 4: Check reaction buttons
  it('renders reaction buttons', () => {
    render(<ReviewProductCard item={mockItem} />);
    expect(screen.getByText('🥰')).toBeInTheDocument();
    expect(screen.getByText('😔')).toBeInTheDocument();
  });

  // Test 5: Check card styling
  it('has correct card styling', () => {
    const { container } = render(<ReviewProductCard item={mockItem} />);
    const card = container.firstChild;
    expect(card).toHaveClass(
      'w-[232px]',
      'h-[302px]',
      'p-5',
      'flex',
      'flex-col',
      'gap-2.5',
      'rounded-[13px]',
      'bg-white'
    );
  });

  // Test 6: Check image container styling
  // it('has correct image container styling', () => {
  //   const { container } = render(<ReviewProductCard item={mockItem} />);
  //   const imageContainer = container.querySelector('.h-[140px]');
  //   expect(imageContainer).toHaveClass(
  //     'w-full',
  //     'flex',
  //     'items-center',
  //     'justify-center'
  //   );
  // });

  // Test 7: Check title styling
  it('has correct title styling', () => {
    render(<ReviewProductCard item={mockItem} />);
    const title = screen.getByText('Test Product');
    expect(title).toHaveClass(
      'text-lg',
      'font-medium',
      'text-[#575656]',
      'line-clamp-2'
    );
  });

  // Test 8: Check reaction buttons styling
  it('has correct reaction buttons styling', () => {
    const { container } = render(<ReviewProductCard item={mockItem} />);
    const buttons = container.querySelectorAll('button');

    // Like button
    expect(buttons[0]).toHaveClass(
      'w-12',
      'h-12',
      'flex',
      'items-center',
      'justify-center',
      'rounded-xl',
      'bg-[#E77CCF80]',
      'transition-colors'
    );

    // Dislike button
    expect(buttons[1]).toHaveClass(
      'w-12',
      'h-12',
      'flex',
      'items-center',
      'justify-center',
      'rounded-xl',
      'bg-[#E1E1E1]',
      'transition-colors'
    );
  });
});