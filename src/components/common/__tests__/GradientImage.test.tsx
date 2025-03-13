import React from 'react';
import { render, screen } from '@testing-library/react';
import GradientImage from '../GradientImage';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    style,
  }: {
    src: string | object;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      style={style}
      data-testid={`image-${alt}`}
    />
  ),
}));

describe('GradientImage', () => {
  it('renders two gradient images with default props', () => {
    render(<GradientImage />);

    // Check first gradient image
    const firstImage = screen.getByTestId('image-gradient1');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', '/gradient1.png');
    expect(firstImage).toHaveAttribute('width', '1000');
    expect(firstImage).toHaveAttribute('height', '620');
    expect(firstImage).toHaveClass('fixed');
    expect(firstImage).toHaveClass('-z-10');
    expect(firstImage).toHaveStyle({ opacity: '0.8', width: 'auto', height: 'auto' });

    // Check second gradient image
    const secondImage = screen.getByTestId('image-gradient2');
    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveAttribute('src', '/gradient2.png');
    expect(secondImage).toHaveAttribute('width', '1200');
    expect(secondImage).toHaveAttribute('height', '675');
    expect(secondImage).toHaveClass('fixed');
    expect(secondImage).toHaveClass('-z-10');
    expect(secondImage).toHaveStyle({ opacity: '0.8', width: 'auto', height: 'auto' });
  });

  it('renders with custom first image props', () => {
    const firstImage = {
      url: '/custom-gradient1.png',
      width: 800,
      height: 500,
      className: 'custom-class-1',
    };

    render(<GradientImage firstImage={firstImage} />);

    // Check first gradient image with custom props
    const customFirstImage = screen.getByTestId('image-gradient1');
    expect(customFirstImage).toHaveAttribute('src', '/custom-gradient1.png');
    expect(customFirstImage).toHaveAttribute('width', '800');
    expect(customFirstImage).toHaveAttribute('height', '500');
    expect(customFirstImage).toHaveClass('custom-class-1');
  });

  it('renders with custom second image props', () => {
    const secondImage = {
      url: '/custom-gradient2.png',
      width: 900,
      height: 600,
      className: 'custom-class-2',
    };

    render(<GradientImage secondImage={secondImage} />);

    // Check second gradient image with custom props
    const customSecondImage = screen.getByTestId('image-gradient2');
    expect(customSecondImage).toHaveAttribute('src', '/custom-gradient2.png');
    expect(customSecondImage).toHaveAttribute('width', '900');
    expect(customSecondImage).toHaveAttribute('height', '600');
    expect(customSecondImage).toHaveClass('custom-class-2');
  });

  it('renders with both custom image props', () => {
    const firstImage = {
      url: '/custom-gradient1.png',
      width: 800,
      height: 500,
      className: 'custom-class-1',
    };

    const secondImage = {
      url: '/custom-gradient2.png',
      width: 900,
      height: 600,
      className: 'custom-class-2',
    };

    render(<GradientImage firstImage={firstImage} secondImage={secondImage} />);

    // Check first gradient image
    const customFirstImage = screen.getByTestId('image-gradient1');
    expect(customFirstImage).toHaveAttribute('src', '/custom-gradient1.png');
    expect(customFirstImage).toHaveAttribute('width', '800');
    expect(customFirstImage).toHaveAttribute('height', '500');
    expect(customFirstImage).toHaveClass('custom-class-1');

    // Check second gradient image
    const customSecondImage = screen.getByTestId('image-gradient2');
    expect(customSecondImage).toHaveAttribute('src', '/custom-gradient2.png');
    expect(customSecondImage).toHaveAttribute('width', '900');
    expect(customSecondImage).toHaveAttribute('height', '600');
    expect(customSecondImage).toHaveClass('custom-class-2');
  });

  it('preserves default classes when custom className is provided', () => {
    const firstImage = {
      className: 'custom-class-1',
    };

    const secondImage = {
      className: 'custom-class-2',
    };

    render(<GradientImage firstImage={firstImage} secondImage={secondImage} />);

    // Check that default classes are preserved along with custom classes
    const firstImageElement = screen.getByTestId('image-gradient1');
    expect(firstImageElement).toHaveClass('fixed');
    expect(firstImageElement).toHaveClass('-z-10');
    expect(firstImageElement).toHaveClass('custom-class-1');

    const secondImageElement = screen.getByTestId('image-gradient2');
    expect(secondImageElement).toHaveClass('fixed');
    expect(secondImageElement).toHaveClass('-z-10');
    expect(secondImageElement).toHaveClass('custom-class-2');
  });

});