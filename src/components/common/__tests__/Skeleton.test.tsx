import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from '../Skeleton';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage(props: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    className?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img
      src={props.src}
      alt={props.alt}
      data-testid="skeleton-image"
      className={props.className}
      style={props.fill ? { position: 'absolute', width: '100%', height: '100%' } : undefined}
      sizes={props.sizes}
    />;
  };
});

describe('Skeleton', () => {
  it('renders the skeleton container with default classes', () => {
    const { container } = render(<Skeleton />);

    const skeletonContainer = container.firstChild;
    expect(skeletonContainer).toBeInTheDocument();
    expect(skeletonContainer).toHaveClass('relative');
    expect(skeletonContainer).toHaveClass('rounded-lg');
    expect(skeletonContainer).toHaveClass('opacity-10');
    expect(skeletonContainer).toHaveClass('overflow-hidden');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Skeleton className="custom-class h-40 w-40" />);

    const skeletonContainer = container.firstChild;
    expect(skeletonContainer).toHaveClass('custom-class');
    expect(skeletonContainer).toHaveClass('h-40');
    expect(skeletonContainer).toHaveClass('w-40');

    // Default classes should still be applied
    expect(skeletonContainer).toHaveClass('relative');
    expect(skeletonContainer).toHaveClass('rounded-lg');
  });

  it('renders the skeleton image with correct props', () => {
    const { getByTestId } = render(<Skeleton />);

    const image = getByTestId('skeleton-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/skeleton.gif');
    expect(image).toHaveAttribute('alt', 'skeleton gif');
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');

    // Check if fill prop is applied via style
    expect(image.style.position).toBe('absolute');
    expect(image.style.width).toBe('100%');
    expect(image.style.height).toBe('100%');
  });

  it('has the correct structure with Image component inside div', () => {
    const { container, getByTestId } = render(<Skeleton />);

    const outerDiv = container.firstChild;
    expect(outerDiv).toBeInstanceOf(HTMLDivElement);

    const image = getByTestId('skeleton-image');
    expect(outerDiv?.firstChild).toBe(image);
  });
});