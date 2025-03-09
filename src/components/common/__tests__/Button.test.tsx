import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });

    // Check default variant and size classes
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('custom-class');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
    expect(screen.getByRole('button')).toHaveClass('text-white');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
    expect(screen.getByRole('button')).toHaveClass('text-gray-800');

    rerender(<Button variant="back">Back</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-md');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');
    expect(screen.getByRole('button')).toHaveClass('border-primary');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-gray-800');

    rerender(<Button variant="icon">Icon</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-10');
    expect(screen.getByRole('button')).toHaveClass('h-10');
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');
    expect(screen.getByRole('button')).toHaveClass('px-4');
    expect(screen.getByRole('button')).toHaveClass('py-2');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
    expect(screen.getByRole('button')).toHaveClass('px-6');
    expect(screen.getByRole('button')).toHaveClass('py-3');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
    expect(screen.getByRole('button')).toHaveClass('px-8');
    expect(screen.getByRole('button')).toHaveClass('py-3');
  });

  it('renders with left icon', () => {
    render(
      <Button icon={<span data-testid="test-icon">🔍</span>}>
        Search
      </Button>
    );

    const icon = screen.getByTestId('test-icon');
    const iconContainer = icon.parentElement;

    expect(icon).toBeInTheDocument();
    expect(iconContainer).toHaveClass('mr-2');

    // Check icon position in DOM (should be before text)
    const button = screen.getByRole('button');
    expect(button.firstChild).toBe(iconContainer);
  });

  it('renders with right icon', () => {
    render(
      <Button
        icon={<span data-testid="test-icon">→</span>}
        iconPosition="right"
      >
        Next
      </Button>
    );

    const icon = screen.getByTestId('test-icon');
    const iconContainer = icon.parentElement;

    expect(icon).toBeInTheDocument();
    expect(iconContainer).toHaveClass('ml-2');

    // Check icon position in DOM (should be after text)
    const button = screen.getByRole('button');
    expect(button.lastChild).toBe(iconContainer);
  });

  it('applies custom icon className', () => {
    render(
      <Button
        icon={<span data-testid="test-icon">🔍</span>}
        iconClassName="custom-icon-class"
      >
        Search
      </Button>
    );

    const icon = screen.getByTestId('test-icon');
    const iconContainer = icon.parentElement;

    expect(iconContainer).toHaveClass('custom-icon-class');
    expect(iconContainer).toHaveClass('mr-2');
  });

  it('renders as disabled', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-80');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  it('passes through HTML button attributes', () => {
    render(
      <Button
        type="submit"
        aria-label="Submit form"
        data-testid="submit-button"
        name="submit-btn"
      >
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
    expect(button).toHaveAttribute('data-testid', 'submit-button');
    expect(button).toHaveAttribute('name', 'submit-btn');
  });

  it('has default type of "button"', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies common button classes', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button');

    // Check common classes
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
    expect(button).toHaveClass('rounded-xl');
    expect(button).toHaveClass('font-medium');
    expect(button).toHaveClass('transition-all');
  });
});