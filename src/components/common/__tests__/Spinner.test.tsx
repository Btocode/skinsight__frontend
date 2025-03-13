import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders the spinner container', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.firstChild;
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('flex');
    expect(spinnerContainer).toHaveClass('items-center');
    expect(spinnerContainer).toHaveClass('justify-center');
    expect(spinnerContainer).toHaveClass('h-svh');
  });

  it('renders the spinner element with correct styling', () => {
    const { container } = render(<Spinner />);

    const spinner = container.firstChild?.firstChild;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-12');
    expect(spinner).toHaveClass('h-12');
    expect(spinner).toHaveClass('border-4');
    expect(spinner).toHaveClass('border-primary');
    expect(spinner).toHaveClass('border-t-transparent');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('animate-spin');
  });

  it('has the correct structure with nested divs', () => {
    const { container } = render(<Spinner />);

    // Check that we have a div containing another div
    const outerDiv = container.firstChild;
    expect(outerDiv).toBeInstanceOf(HTMLDivElement);

    const innerDiv = outerDiv?.firstChild;
    expect(innerDiv).toBeInstanceOf(HTMLDivElement);
  });
});