import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../Accordion';

describe('Accordion', () => {
  const defaultProps = {
    title: 'Test Accordion',
    content: 'This is test content',
  };

  it('renders with title and content', () => {
    render(<Accordion {...defaultProps} />);

    // Title should be visible
    expect(screen.getByText('Test Accordion')).toBeInTheDocument();

    // Content should exist but be hidden initially (max-height: 0)
    const contentElement = screen.getByText('This is test content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement.parentElement).toHaveClass('max-h-0');
  });

  it('toggles internal state when clicked (without isActive prop)', () => {
    render(<Accordion {...defaultProps} />);

    // Initially the chevron should not be rotated
    const chevronContainer = screen.getByText('Test Accordion')
      .parentElement?.querySelector('div:last-child');
    expect(chevronContainer).not.toHaveClass('rotate-180');

    // Click to toggle
    fireEvent.click(screen.getByText('Test Accordion'));

    // Chevron should now be rotated
    expect(chevronContainer).toHaveClass('rotate-180');
  });

  it('uses isActive prop to control content visibility', () => {
    // Create a container to hold our component for consistent querying
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Render with isActive=true
    const { rerender } = render(<Accordion {...defaultProps} isActive={true} />, { container });

    // Get the content container
    const contentContainer = screen.getByText('This is test content').closest('div[class*="overflow-hidden"]');
    expect(contentContainer).toHaveClass('max-h-[1000px]');

    // Re-render with isActive=false
    rerender(<Accordion {...defaultProps} isActive={false} />);

    // Same element should now have max-h-0
    expect(contentContainer).toHaveClass('max-h-0');

    // Clean up
    document.body.removeChild(container);
  });

  it('calls onToggle when provided', () => {
    const onToggleMock = jest.fn();
    render(<Accordion {...defaultProps} onToggle={onToggleMock} />);

    // Click the accordion
    fireEvent.click(screen.getByText('Test Accordion'));

    // onToggle should have been called
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom class names', () => {
    render(
      <Accordion
        {...defaultProps}
        titleClassName="custom-title-class"
        contentClassName="custom-content-class"
      />
    );

    // Title should have custom class
    const titleElement = screen.getByText('Test Accordion');
    expect(titleElement).toHaveClass('custom-title-class');
  });

  it('rotates chevron icon when open', () => {
    render(<Accordion {...defaultProps} />);

    // Find the chevron container
    const chevronContainer = screen.getByText('Test Accordion')
      .parentElement?.querySelector('div:last-child');

    // Initially not rotated
    expect(chevronContainer).not.toHaveClass('rotate-180');

    // Click to open
    fireEvent.click(screen.getByText('Test Accordion'));

    // Should now be rotated
    expect(chevronContainer).toHaveClass('rotate-180');
  });


});