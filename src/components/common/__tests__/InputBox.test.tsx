import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputBox } from '../InputBox';

describe('InputBox', () => {
  it('renders a basic input field', () => {
    render(<InputBox placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with a label when provided', () => {
    render(<InputBox label="Username" id="username" />);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'username');
  });

  it('applies custom className to input', () => {
    render(<InputBox className="custom-input-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input-class');
  });

  it('applies custom className to label', () => {
    render(<InputBox label="Username" labelClassName="custom-label-class" />);

    const label = screen.getByText('Username');
    expect(label).toHaveClass('custom-label-class');
  });

  it('applies custom className to container', () => {
    render(<InputBox containerClassName="custom-container-class" />);

    const container = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'div' &&
             element?.classList.contains('custom-container-class');
    });

    expect(container).toHaveClass('custom-container-class');
  });

  it('applies custom className to box', () => {
    render(<InputBox boxClassName="custom-box-class" />);

    const box = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'div' &&
             element?.classList.contains('custom-box-class');
    });

    expect(box).toHaveClass('custom-box-class');
  });

  it('displays error message when provided', () => {
    render(<InputBox error="This field is required" />);

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-[#FF2D55]');
  });

  it('displays helper text when provided', () => {
    render(<InputBox helperText="Enter your full name" />);

    const helperText = screen.getByText('Enter your full name');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-gray-500');
  });

  it('prioritizes error over helper text', () => {
    render(<InputBox error="This field is required" helperText="Enter your full name" />);

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText('Enter your full name')).not.toBeInTheDocument();
  });

  it('applies error styling to input when error is provided', () => {
    render(<InputBox error="This field is required" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-[#FF2D55]');
    expect(input).toHaveClass('placeholder-[#FF2D55]');

    const box = input.parentElement;
    expect(box).toHaveClass('bg-[#FF2D5521]');
  });

  it('applies disabled styling when disabled', () => {
    render(<InputBox disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    const box = input.parentElement;
    expect(box).toHaveClass('opacity-50');
  });

  it('renders password input with toggle button', () => {
    render(<InputBox type="password" placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByLabelText('Show password');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility when button is clicked', () => {
    render(<InputBox type="password" placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByLabelText('Show password');
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Hide password'));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputBox ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('sets aria-invalid attribute based on error prop', () => {
    const { rerender } = render(<InputBox />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    rerender(<InputBox error="This field is required" />);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby attribute when id and error are provided', () => {
    render(<InputBox id="username" error="This field is required" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toHaveAttribute('id', 'username-error');
  });

  it('passes additional props to input element', () => {
    render(
      <InputBox
        placeholder="Enter text"
        maxLength={10}
        autoComplete="off"
        data-testid="custom-input"
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('autoComplete', 'off');
    expect(input).toHaveAttribute('data-testid', 'custom-input');
  });

  it('applies correct styling for password input', () => {
    render(<InputBox type="password" data-testid="password-input" />);

    const input = screen.getByTestId('password-input');
    expect(input).toHaveClass('pr-12');
  });

  it('disables password toggle button when input is disabled', () => {
    render(<InputBox type="password" disabled />);

    const toggleButton = screen.getByLabelText('Show password');
    expect(toggleButton).toBeDisabled();
    expect(toggleButton).toHaveClass('cursor-not-allowed');
  });

  it('applies error styling to password toggle icons', () => {
    render(<InputBox type="password" error="This field is required" />);

    const svg = screen.getByLabelText('Show password').querySelector('svg');
    expect(svg).toHaveAttribute('stroke', '#FF2D55');
  });
});