import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../CheckBox';

describe('Checkbox', () => {
  // Common props
  const defaultProps = {
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders unchecked checkbox without label', () => {
    render(<Checkbox {...defaultProps} />);

    // Input should exist and be unchecked
    const input = screen.getByRole('checkbox', { hidden: true });
    expect(input).not.toBeChecked();

    // Checkbox visual element should have the unchecked styling
    const checkboxDiv = input.parentElement?.querySelector('div');
    expect(checkboxDiv).toHaveClass('bg-white');
    expect(checkboxDiv).toHaveClass('border-gray-300');
    expect(checkboxDiv).not.toHaveClass('bg-primary');

    // Check icon should not be present
    const svg = checkboxDiv?.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('renders checked checkbox', () => {
    render(<Checkbox {...defaultProps} checked={true} />);

    // Input should be checked
    const input = screen.getByRole('checkbox', { hidden: true });
    expect(input).toBeChecked();

    // Checkbox visual element should have the checked styling
    const checkboxDiv = input.parentElement?.querySelector('div');
    expect(checkboxDiv).toHaveClass('bg-primary');
    expect(checkboxDiv).toHaveClass('border-primary');

    // Check icon should be present
    const svg = checkboxDiv?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox {...defaultProps} label="Test Label" />);

    // Label text should be present
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    render(<Checkbox {...defaultProps} />);

    // Click the checkbox
    fireEvent.click(screen.getByRole('checkbox', { hidden: true }));

    // onChange should be called with true
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    render(<Checkbox {...defaultProps} checked={true} />);

    // Click the checkbox
    fireEvent.click(screen.getByRole('checkbox', { hidden: true }));

    // onChange should be called with false
    expect(defaultProps.onChange).toHaveBeenCalledWith(false);
  });

  it('applies custom className to container', () => {
    render(<Checkbox {...defaultProps} className="custom-container-class" />);

    // Label element (container) should have the custom class
    const label = screen.getByRole('checkbox', { hidden: true }).closest('label');
    expect(label).toHaveClass('custom-container-class');
  });

  it('applies custom iconClassName to checkbox element', () => {
    render(<Checkbox {...defaultProps} iconClassName="custom-icon-class" />);

    // Checkbox div should have the custom class
    const checkboxDiv = screen.getByRole('checkbox', { hidden: true })
      .parentElement?.querySelector('div');
    expect(checkboxDiv).toHaveClass('custom-icon-class');
  });

  it('applies custom labelClassName to label text', () => {
    render(
      <Checkbox
        {...defaultProps}
        label="Test Label"
        labelClassName="custom-label-class"
      />
    );

    // Label text element should have the custom class
    const labelText = screen.getByText('Test Label');
    expect(labelText).toHaveClass('custom-label-class');
  });

  it('passes additional props to input element', () => {
    render(
      <Checkbox
        {...defaultProps}
        id="test-id"
        name="test-name"
        disabled
        aria-label="Test checkbox"
      />
    );

    const input = screen.getByRole('checkbox', { hidden: true });

    expect(input).toHaveAttribute('id', 'test-id');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'Test checkbox');
  });

  it('has correct base styling', () => {
    render(<Checkbox {...defaultProps} />);

    // Container should have flex styling
    const label = screen.getByRole('checkbox', { hidden: true }).closest('label');
    expect(label).toHaveClass('flex');
    expect(label).toHaveClass('items-center');
    expect(label).toHaveClass('cursor-pointer');

    // Checkbox div should have correct dimensions and styling
    const checkboxDiv = screen.getByRole('checkbox', { hidden: true })
      .parentElement?.querySelector('div');
    expect(checkboxDiv).toHaveClass('w-6');
    expect(checkboxDiv).toHaveClass('h-6');
    expect(checkboxDiv).toHaveClass('border-2');
    expect(checkboxDiv).toHaveClass('rounded-md');
    expect(checkboxDiv).toHaveClass('transition-all');
  });

  it('renders label with correct styling', () => {
    render(<Checkbox {...defaultProps} label="Test Label" />);

    const labelText = screen.getByText('Test Label');
    expect(labelText).toHaveClass('ml-3');
    expect(labelText).toHaveClass('text-accent');
  });

  it('makes input visually hidden but accessible', () => {
    render(<Checkbox {...defaultProps} />);

    const input = screen.getByRole('checkbox', { hidden: true });
    expect(input).toHaveClass('sr-only');
  });
});