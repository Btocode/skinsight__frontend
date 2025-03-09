import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../Switch';

describe('Switch', () => {
  it('renders with enabled state', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={true} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    expect(switchButton).toBeInTheDocument();
    expect(switchButton).toHaveClass('bg-[#8F80E8]');

    const switchKnob = switchButton.firstChild;
    expect(switchKnob).toHaveClass('translate-x-4');
  });

  it('renders with disabled state', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={false} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    expect(switchButton).toBeInTheDocument();
    expect(switchButton).toHaveClass('bg-gray-300');

    const switchKnob = switchButton.firstChild;
    expect(switchKnob).toHaveClass('translate-x-1');
  });

  it('calls onToggle with opposite value when clicked (enabled -> disabled)', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={true} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    fireEvent.click(switchButton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(false);
  });

  it('calls onToggle with opposite value when clicked (disabled -> enabled)', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={false} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    fireEvent.click(switchButton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(true);
  });

  it('has the correct base styling regardless of state', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={true} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    expect(switchButton).toHaveClass('relative');
    expect(switchButton).toHaveClass('inline-flex');
    expect(switchButton).toHaveClass('h-7');
    expect(switchButton).toHaveClass('w-10');
    expect(switchButton).toHaveClass('items-center');
    expect(switchButton).toHaveClass('rounded-full');
    expect(switchButton).toHaveClass('transition-colors');
    expect(switchButton).toHaveClass('duration-300');
  });

  it('has the correct knob styling regardless of state', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={true} onToggle={mockToggle} />);

    const switchKnob = screen.getByRole('button').firstChild;
    expect(switchKnob).toHaveClass('inline-block');
    expect(switchKnob).toHaveClass('h-5');
    expect(switchKnob).toHaveClass('w-5');
    expect(switchKnob).toHaveClass('transform');
    expect(switchKnob).toHaveClass('rounded-full');
    expect(switchKnob).toHaveClass('bg-white');
    expect(switchKnob).toHaveClass('transition-transform');
    expect(switchKnob).toHaveClass('duration-300');
  });

  it('applies transition classes for smooth animation', () => {
    const mockToggle = jest.fn();
    render(<Switch enabled={true} onToggle={mockToggle} />);

    const switchButton = screen.getByRole('button');
    expect(switchButton).toHaveClass('transition-colors');
    expect(switchButton).toHaveClass('duration-300');

    const switchKnob = switchButton.firstChild;
    expect(switchKnob).toHaveClass('transition-transform');
    expect(switchKnob).toHaveClass('duration-300');
  });
});