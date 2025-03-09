import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

// Mock framer-motion to avoid animation issues in tests
jest.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
      initial?: object;
      animate?: object;
      exit?: object;
      transition?: object;
    }) => <div {...props}>{children}</div>,
  },
}));

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div data-testid="modal-content">Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock document.body methods
    Object.defineProperty(document.body, 'style', {
      value: {
        overflow: '',
      },
      writable: true,
    });
  });

  it('renders nothing when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('applies custom className to modal container', () => {
    render(<Modal {...defaultProps} className="custom-modal-class" />);

    const modalContainer = screen.getByRole('dialog');
    expect(modalContainer).toHaveClass('custom-modal-class');
  });

  it('applies custom className to content container', () => {
    render(<Modal {...defaultProps} contentClassName="custom-content-class" />);

    const contentContainer = screen.getByTestId('modal-content').parentElement;
    expect(contentContainer).toHaveClass('custom-content-class');
  });

  it('applies custom className to close button', () => {
    render(<Modal {...defaultProps} closeBtnClassName="custom-close-btn-class" />);

    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toHaveClass('custom-close-btn-class');
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Modal {...defaultProps} />);

    // Find backdrop and click it
    const backdrop = screen.getByRole('dialog').querySelector('.bg-\\[\\#20293B8C\\]');
    fireEvent.click(backdrop as Element);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);

    // Find close button and click it
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<Modal {...defaultProps} />);

    // Simulate Escape key press
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose for other key presses', () => {
    render(<Modal {...defaultProps} />);

    // Simulate other key press
    fireEvent.keyDown(document, { key: 'Enter' });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('disables body scroll when open', () => {
    render(<Modal {...defaultProps} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('enables body scroll when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);

    // Initially overflow should be hidden
    expect(document.body.style.overflow).toBe('hidden');

    // Re-render with isOpen=false
    rerender(<Modal {...defaultProps} isOpen={false} />);

    // Overflow should be auto
    expect(document.body.style.overflow).toBe('auto');
  });

  it('enables body scroll on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} />);

    // Initially overflow should be hidden
    expect(document.body.style.overflow).toBe('hidden');

    // Unmount the component
    unmount();

    // Overflow should be auto
    expect(document.body.style.overflow).toBe('auto');
  });

  it('removes event listener when modal is closed', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { rerender } = render(<Modal {...defaultProps} />);

    // Update isOpen prop to false
    rerender(<Modal {...defaultProps} isOpen={false} />);

    // Event listener should be removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<Modal {...defaultProps} />);

    // Unmount the component
    unmount();

    // Check if removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('sets id attribute when provided', () => {
    render(<Modal {...defaultProps} id="test-modal" />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('id', 'test-modal');
  });

  it('hides close icon when isCloseIconVisible is false', () => {
    render(<Modal {...defaultProps} isCloseIconVisible={false} />);

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('shows close icon by default', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Modal {...defaultProps} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const backdrop = dialog.querySelector('.bg-\\[\\#20293B8C\\]');
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies correct animation classes to modal content', () => {
    render(<Modal {...defaultProps} />);

    // Find the modal content container (the motion.div with the animation classes)
    const modalContent = screen.getByRole('dialog').querySelector('.relative.w-auto.my-6');

    expect(modalContent).toHaveClass('transition-all');
    expect(modalContent).toHaveClass('duration-300');
    expect(modalContent).toHaveClass('ease-in-out');
    expect(modalContent).toHaveClass('scale-100');
    expect(modalContent).toHaveClass('translate-y-0');
    expect(modalContent).not.toHaveClass('scale-95');
    expect(modalContent).not.toHaveClass('translate-y-4');
  });
});