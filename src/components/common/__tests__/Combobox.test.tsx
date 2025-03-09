import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Combobox, Option } from '../Combobox';

// Mock scrollIntoView which is not available in jsdom
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Combobox', () => {
  // Sample options for testing
  const options: Option[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
  ];

  // Common props
  const defaultProps = {
    options,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text when no value is selected', () => {
    render(<Combobox {...defaultProps} />);

    // Button should show placeholder text
    expect(screen.getByRole('button')).toHaveTextContent('Select...');
  });

  it('renders with custom placeholder text', () => {
    render(<Combobox {...defaultProps} placeholder="Choose an option..." />);

    // Button should show custom placeholder
    expect(screen.getByRole('button')).toHaveTextContent('Choose an option...');
  });

  it('renders with selected value', () => {
    render(<Combobox {...defaultProps} value={options[1]} />);

    // Button should show selected value label
    expect(screen.getByRole('button')).toHaveTextContent('Banana');
  });

  it('opens dropdown when button is clicked', () => {
    render(<Combobox {...defaultProps} />);

    // Initially dropdown should be closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Click the button
    fireEvent.click(screen.getByRole('button'));

    // Dropdown should be open
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // All options should be visible
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Combobox {...defaultProps} />
      </div>
    );

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    // Dropdown should close
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('selects an option when clicked', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Click an option
    fireEvent.click(screen.getByText('Cherry'));

    // onChange should be called with the selected option
    expect(defaultProps.onChange).toHaveBeenCalledWith(options[2]);

    // Dropdown should close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('highlights option on mouse enter', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Hover over an option
    fireEvent.mouseEnter(screen.getByText('Banana'));

    // Option should have highlight class
    const bananaOption = screen.getByText('Banana').closest('li');
    expect(bananaOption).toHaveClass('bg-[#EDF0FF]');
  });

  it('navigates options with keyboard arrow keys', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown with ArrowDown
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // First option should be highlighted
    const firstOption = screen.getByText('Apple').closest('li');
    expect(firstOption).toHaveClass('bg-[#EDF0FF]');

    // Navigate down
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });

    // Second option should be highlighted
    const secondOption = screen.getByText('Banana').closest('li');
    expect(secondOption).toHaveClass('bg-[#EDF0FF]');

    // Navigate up
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowUp' });

    // First option should be highlighted again
    expect(firstOption).toHaveClass('bg-[#EDF0FF]');
  });

  it('selects highlighted option with Enter key', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });

    // Navigate to third option (Cherry)
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' });

    // Press Enter
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

    // onChange should be called with the selected option (Cherry)
    expect(defaultProps.onChange).toHaveBeenCalledWith(options[2]);

    // Dropdown should close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown with Escape key', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });

    // Dropdown should close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown with Tab key', () => {
    render(<Combobox {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Press Tab
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });

    // Dropdown should close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    render(<Combobox {...defaultProps} className="custom-container-class" />);

    // Container should have custom class
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-container-class');
  });

  it('applies custom buttonClassName to button', () => {
    render(<Combobox {...defaultProps} buttonClassName="custom-button-class" />);

    // Button should have custom class
    expect(screen.getByRole('button')).toHaveClass('custom-button-class');
  });

  it('applies custom valueClassName to value text', () => {
    render(<Combobox {...defaultProps} valueClassName="custom-value-class" />);

    // Value span should have custom class
    const valueSpan = screen.getByRole('button').querySelector('span');
    expect(valueSpan).toHaveClass('custom-value-class');
  });

  it('rotates chevron icon when dropdown is open', () => {
    render(<Combobox {...defaultProps} />);

    // Initially chevron should not be rotated
    const chevronContainer = screen.getByRole('button').querySelector('div');
    expect(chevronContainer).not.toHaveClass('rotate-180');

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Chevron should be rotated
    expect(chevronContainer).toHaveClass('rotate-180');
  });

  it('marks the selected option as aria-selected', () => {
    render(<Combobox {...defaultProps} value={options[2]} />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));

    // Get all options
    const optionElements = screen.getAllByRole('option');

    // Only the selected option should have aria-selected=true
    optionElements.forEach((option, index) => {
      if (index === 2) {
        expect(option).toHaveAttribute('aria-selected', 'true');
      } else {
        expect(option).toHaveAttribute('aria-selected', 'false');
      }
    });
  });

  it('sets correct ARIA attributes on button', () => {
    const { rerender } = render(<Combobox {...defaultProps} />);

    // Button should have correct initial ARIA attributes
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).not.toHaveAttribute('aria-controls');

    // Open dropdown
    fireEvent.click(button);

    // Button should have updated ARIA attributes
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', 'dropdown-list');
  });
});