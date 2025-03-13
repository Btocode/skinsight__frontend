import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextAreaBox from '../TextAreaBox';

describe('TextAreaBox', () => {
  it('renders a basic textarea field', () => {
    render(<TextAreaBox placeholder="Enter text" />);

    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders with a label when provided', () => {
    render(<TextAreaBox label="Description" id="description" />);

    const label = screen.getByText('Description');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'description');
  });

  it('applies custom className to textarea', () => {
    render(<TextAreaBox className="custom-textarea-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea-class');
  });

  it('applies custom className to label', () => {
    render(<TextAreaBox label="Description" labelClassName="custom-label-class" />);

    const label = screen.getByText('Description');
    expect(label).toHaveClass('custom-label-class');
  });

  it('applies custom className to container', () => {
    render(<TextAreaBox containerClassName="custom-container-class" />);

    // Find the container div with the custom class
    const container = document.querySelector('.custom-container-class');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-2');
  });

  it('applies custom className to box', () => {
    render(<TextAreaBox boxClassName="custom-box-class" />);

    // Find the box div with the custom class
    const box = document.querySelector('.custom-box-class');
    expect(box).toBeInTheDocument();
    expect(box).toHaveClass('w-full');
    expect(box).toHaveClass('rounded-xl');
    expect(box).toHaveClass('relative');
  });

  it('displays error message when provided', () => {
    render(<TextAreaBox error="This field is required" />);

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-[#FF2D55]');
  });

  it('displays helper text when provided', () => {
    render(<TextAreaBox helperText="Enter your full description" />);

    const helperText = screen.getByText('Enter your full description');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-gray-500');
  });

  it('prioritizes error over helper text', () => {
    render(<TextAreaBox error="This field is required" helperText="Enter your full description" />);

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText('Enter your full description')).not.toBeInTheDocument();
  });

  it('applies error styling to textarea when error is provided', () => {
    render(<TextAreaBox error="This field is required" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-[#FF2D55]');
    expect(textarea).toHaveClass('placeholder-[#FF2D55]');

    const box = textarea.parentElement;
    expect(box).toHaveClass('bg-[#FF2D5521]');
  });

  it('applies disabled styling when disabled', () => {
    render(<TextAreaBox disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();

    const box = textarea.parentElement;
    expect(box).toHaveClass('opacity-50');
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextAreaBox ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('sets aria-invalid attribute based on error prop', () => {
    const { rerender } = render(<TextAreaBox />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');

    rerender(<TextAreaBox error="This field is required" />);
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby attribute when id and error are provided', () => {
    render(<TextAreaBox id="description" error="This field is required" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby', 'description-error');

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toHaveAttribute('id', 'description-error');
  });

  it('passes additional props to textarea element', () => {
    render(
      <TextAreaBox
        placeholder="Enter text"
        maxLength={100}
        autoComplete="off"
        data-testid="custom-textarea"
      />
    );

    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveAttribute('maxLength', '100');
    expect(textarea).toHaveAttribute('autoComplete', 'off');
    expect(textarea).toHaveAttribute('data-testid', 'custom-textarea');
  });

  it('uses default rows value of 4 when not specified', () => {
    render(<TextAreaBox />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('uses custom rows value when specified', () => {
    render(<TextAreaBox rows={8} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '8');
  });

  it('handles user input correctly', () => {
    render(<TextAreaBox />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    expect(textarea).toHaveValue('Test input');
  });

  it('applies normal styling when no error and not disabled', () => {
    render(<TextAreaBox />);

    const box = screen.getByRole('textbox').parentElement;
    expect(box).toHaveClass('bg-[#8599FE26]');
    expect(box).not.toHaveClass('bg-[#FF2D5521]');
    expect(box).not.toHaveClass('opacity-50');
  });
});