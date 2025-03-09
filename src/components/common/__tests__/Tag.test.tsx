import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag', () => {
  it('renders matched variant with correct styling', () => {
    render(<Tag variant="matched">Matched</Tag>);

    // Check container styling
    const container = screen.getByText('Matched').parentElement;
    expect(container).toHaveClass('bg-[#13DE9B1A]');

    // Check circle styling
    const circle = container?.firstChild;
    expect(circle).toHaveClass('bg-[#13DE9B]');

    // Check text styling
    const text = screen.getByText('Matched');
    expect(text).toHaveClass('text-[#13DE9B]');
  });

  it('renders most_viewed variant with correct styling', () => {
    render(<Tag variant="most_viewed">Most Viewed</Tag>);

    // Check container styling
    const container = screen.getByText('Most Viewed').parentElement;
    expect(container).toHaveClass('bg-[#8599FE1A]');

    // Check circle styling
    const circle = container?.firstChild;
    expect(circle).toHaveClass('bg-[#8599FE]');

    // Check text styling
    const text = screen.getByText('Most Viewed');
    expect(text).toHaveClass('text-[#8599FE]');
  });

  it('renders best_rated variant with correct styling', () => {
    render(<Tag variant="best_rated">Best Rated</Tag>);

    // Check container styling
    const container = screen.getByText('Best Rated').parentElement;
    expect(container).toHaveClass('bg-[#EDAFDF33]');

    // Check circle styling
    const circle = container?.firstChild;
    expect(circle).toHaveClass('bg-[#FF9FC1]');

    // Check text styling
    const text = screen.getByText('Best Rated');
    expect(text).toHaveClass('text-[#FF9FC1]');
  });

  it('renders popular variant with default styling', () => {
    render(<Tag variant="popular">Popular</Tag>);

    // Check container styling - should not have specific background class
    const container = screen.getByText('Popular').parentElement;
    expect(container).not.toHaveClass('bg-[#13DE9B1A]');
    expect(container).not.toHaveClass('bg-[#8599FE1A]');
    expect(container).not.toHaveClass('bg-[#EDAFDF33]');

    // Check circle styling - should not have specific background class
    const circle = container?.firstChild;
    expect(circle).not.toHaveClass('bg-[#13DE9B]');
    expect(circle).not.toHaveClass('bg-[#8599FE]');
    expect(circle).not.toHaveClass('bg-[#FF9FC1]');

    // Check text styling - should not have specific text color class
    const text = screen.getByText('Popular');
    expect(text).not.toHaveClass('text-[#13DE9B]');
    expect(text).not.toHaveClass('text-[#8599FE]');
    expect(text).not.toHaveClass('text-[#FF9FC1]');
  });

  it('renders children correctly', () => {
    render(<Tag variant="matched">Custom Text</Tag>);

    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('applies common container styling to all variants', () => {
    render(<Tag variant="matched">Test</Tag>);

    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('h-[20.08px]');
    expect(container).toHaveClass('lg:h-[30px]');
    expect(container).toHaveClass('rounded-[9.56px]');
    expect(container).toHaveClass('lg:rounded-[10px]');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('px-2');
    expect(container).toHaveClass('gap-2');
  });

  it('applies common circle styling to all variants', () => {
    render(<Tag variant="matched">Test</Tag>);

    const circle = screen.getByText('Test').parentElement?.firstChild;
    expect(circle).toHaveClass('w-[7px]');
    expect(circle).toHaveClass('h-[7px]');
    expect(circle).toHaveClass('backdrop-filter');
    expect(circle).toHaveClass('blur-[4px]');
  });

  it('applies common text styling to all variants', () => {
    render(<Tag variant="matched">Test</Tag>);

    const text = screen.getByText('Test');
    expect(text).toHaveClass('text-[11.47px]');
    expect(text).toHaveClass('lg:text-[13px]');
    expect(text).toHaveClass('font-normal');
    expect(text).toHaveClass('leading-[17.21px]');
    expect(text).toHaveClass('lg:leading-[19.5px]');
    expect(text).toHaveClass('tracking-[-0.03em]');
  });
});