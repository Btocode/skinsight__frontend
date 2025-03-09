import React from 'react';
import { render, screen } from '@testing-library/react';
import HeadingPrimary from '../HeadingPrimary';

describe('HeadingPrimary', () => {
  it('renders the heading with children', () => {
    render(<HeadingPrimary>Test Heading</HeadingPrimary>);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('applies default styling classes', () => {
    render(<HeadingPrimary>Test Heading</HeadingPrimary>);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('lg:text-6xl');
    expect(heading).toHaveClass('lg:leading-[70px]');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('mb-4');
    expect(heading).toHaveClass('bg-[linear-gradient(90deg,#8F80E8_0%,#80ADE8_100%)]');
    expect(heading).toHaveClass('text-transparent');
    expect(heading).toHaveClass('bg-clip-text');
  });

  it('merges custom className with default classes', () => {
    render(<HeadingPrimary className="custom-class">Test Heading</HeadingPrimary>);

    const heading = screen.getByRole('heading', { level: 2 });

    // Check default classes are still applied
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('lg:text-6xl');

    // Check custom class is applied
    expect(heading).toHaveClass('custom-class');
  });


  it('renders with complex children', () => {
    render(
      <HeadingPrimary>
        Test <span className="highlight">Highlighted</span> Heading
      </HeadingPrimary>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toContainHTML('<span class="highlight">Highlighted</span>');
    expect(heading).toHaveTextContent('Test Highlighted Heading');
  });

  it('renders an empty heading when no children are provided', () => {
    render(<HeadingPrimary />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('');
  });
});