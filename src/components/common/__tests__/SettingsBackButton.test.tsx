import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsBackButton from '../SettingsBackButton';

describe('SettingsBackButton', () => {
  it('renders the back button with text', () => {
    const mockOnClick = jest.fn();
    render(<SettingsBackButton onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back');
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<SettingsBackButton onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders the back arrow icon', () => {
    const mockOnClick = jest.fn();
    render(<SettingsBackButton onClick={mockOnClick} />);

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '25');
  });

  it('has the correct styling', () => {
    const mockOnClick = jest.fn();
    render(<SettingsBackButton onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('gap-2');
    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('font-medium');
    expect(button).toHaveClass('text-accent');
    expect(button).toHaveClass('justify-start');
  });

});