import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Drawer from '../Drawer';
import type { ImageProps } from 'next/image';
import type { LinkProps } from 'next/link';

// Mock createPortal to render children directly
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof props.src === 'string' ? props.src : ''}
      alt={props.alt?.toString() || ''}
      width={props.width}
      height={props.height}
      className={props.className}
      style={props.style}
      priority={props.priority ? '' : undefined}
      data-testid="drawer-logo"
    />
  ),
}));

jest.mock('next/link', () => {
  const MockedLink = (props: LinkProps) => {
    return (
      <a href={props.href.toString()} className={props.className} data-testid="logo-link">
        {props.children}
      </a>
    );
  };

  MockedLink.displayName = 'MockedLink';
  return { __esModule: true, default: MockedLink };
});

describe('Drawer', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div data-testid="drawer-content">Drawer Content</div>,
  };

  const logo = {
    src: '/logo.png',
    alt: 'Skinsight Logo',
    width: 180,
    height: 80,
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
    render(<Drawer {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    render(<Drawer {...defaultProps} logo={logo} />);

    expect(screen.getByTestId('drawer-logo')).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).toBeInTheDocument();
  });

  it('does not render logo when not provided', () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.queryByTestId('drawer-logo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('logo-link')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Drawer {...defaultProps} />);

    // Find backdrop and click it
    const backdrop = screen.getByRole('dialog').previousSibling;
    fireEvent.click(backdrop as Element);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    render(<Drawer {...defaultProps} />);

    // Find close button and click it
    const closeButton = screen.getByLabelText('Close drawer');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<Drawer {...defaultProps} />);

    // Simulate Escape key press
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose for other key presses', () => {
    render(<Drawer {...defaultProps} />);

    // Simulate other key press
    fireEvent.keyDown(document, { key: 'Enter' });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('disables body scroll when open', () => {
    render(<Drawer {...defaultProps} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('enables body scroll when closed', () => {
    const { rerender } = render(<Drawer {...defaultProps} />);

    // Initially overflow should be hidden
    expect(document.body.style.overflow).toBe('hidden');

    // Re-render with isOpen=false
    rerender(<Drawer {...defaultProps} isOpen={false} />);

    // Overflow should be unset
    expect(document.body.style.overflow).toBe('unset');
  });

  it('updates isModalOpen state when isOpen prop changes', () => {
    const { rerender } = render(<Drawer {...defaultProps} isOpen={false} />);

    // Initially the drawer should not be rendered
    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();

    // Update isOpen prop to true
    rerender(<Drawer {...defaultProps} isOpen={true} />);

    // Now the drawer should be rendered
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  it('removes event listener when isOpen changes to false', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { rerender } = render(<Drawer {...defaultProps} />);

    // Update isOpen prop to false
    rerender(<Drawer {...defaultProps} isOpen={false} />);

    // Event listener should be removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<Drawer {...defaultProps} />);

    // Unmount the component
    unmount();

    // Check if removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('applies correct transition classes when open', () => {
    render(<Drawer {...defaultProps} />);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('translate-y-0');
    expect(drawer).toHaveClass('z-50');
    expect(drawer).not.toHaveClass('translate-y-full');
  });

  it('has the correct styling for mobile view', () => {
    render(<Drawer {...defaultProps} />);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('block');
    expect(drawer).toHaveClass('lg:hidden');
    expect(drawer).toHaveClass('fixed');
    expect(drawer).toHaveClass('inset-x-0');
    expect(drawer).toHaveClass('bottom-0');
    expect(drawer).toHaveClass('w-full');
    expect(drawer).toHaveClass('bg-white');
    expect(drawer).toHaveClass('rounded-t-2xl');
  });

  it('has correct accessibility attributes', () => {
    render(<Drawer {...defaultProps} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'drawer-title');
  });

  it('has correct header and content structure', () => {
    render(<Drawer {...defaultProps} />);

    // Check for header and content sections
    const dialog = screen.getByRole('dialog');
    const headerSection = dialog.querySelector('.flex.justify-between.items-center');
    const contentSection = dialog.querySelector('.flex-grow.overflow-y-auto');

    expect(headerSection).toBeInTheDocument();
    expect(contentSection).toBeInTheDocument();
    expect(contentSection).toContainElement(screen.getByTestId('drawer-content'));
  });
});