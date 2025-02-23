import { render, screen } from '@testing-library/react';
import RegimenCard from '../RegimenCard';
import '@testing-library/jest-dom';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean 'fill' to a string
    const { fill, ...rest } = props;
    return <img {...rest} data-testid="next-image" fill={fill ? "true" : undefined} />;
  },
}));

describe('RegimenCard', () => {
  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    render(<RegimenCard />);
  });

  // Test 2: Check for headings and text
  it('renders the main heading and date', () => {
    render(<RegimenCard />);
    expect(screen.getByText('My Skincare')).toBeInTheDocument();
    expect(screen.getByText(/Saved on/)).toBeInTheDocument();
  });

  // Test 3: Check for product images
  it('renders product images', () => {
    render(<RegimenCard />);
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    expect(screen.getByAltText('Product 3')).toBeInTheDocument();
  });

  // Test 4: Check for view regimen button
  it('renders view regimen button', () => {
    render(<RegimenCard />);
    const button = screen.getByRole('button', { name: /view regimen/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-violet-100');
  });

  // Test 5: Check responsive layout classes
  it('has correct responsive classes', () => {
    const { container } = render(<RegimenCard />);

    // Check section classes
    const section = container.querySelector('section');
    expect(section).toHaveClass('w-full', 'lg:min-h-[500px]');

    // Check flex container classes
    const flexContainer = container.querySelector('.flex.flex-col.lg\\:flex-row');
    expect(flexContainer).toHaveClass('justify-between', 'items-center', 'gap-6');
  });

  // Test 6: Check card styling
  it('has correct card styling', () => {
    const { container } = render(<RegimenCard />);
    const card = container.querySelector('.rounded-xl');
    expect(card).toHaveClass(
      'bg-white',
      'p-6',
      'shadow-[0px_5.13px_33.34px_0px_#2C2C2C17]',
      'border',
      'border-[#EFEFEF]'
    );
  });

  // Test 7: Check image container styling
  it('has correct image container styling', () => {
    const { container } = render(<RegimenCard />);
    const imageContainers = container.querySelectorAll('.h-16.w-16.-ml-5.relative');
    expect(imageContainers).toHaveLength(3);
  });

  // Test 8: Check button styling and content
  it('has correct button styling and content', () => {
    render(<RegimenCard />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-xl',
      'bg-violet-100',
      'p-3',
      'text-[#8F80E8]',
      'transition-colors',
      'hover:bg-violet-200'
    );

    // Check if SVG icon exists
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check button text
    expect(button).toHaveTextContent('View regimen');
  });
});