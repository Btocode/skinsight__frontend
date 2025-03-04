import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddFavorite from '../AddFavorite';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the common components
jest.mock('@/components/common/Button', () => {
  return function MockButton({ children, onClick, variant }: any) {
    return (
      <button
        data-testid="button"
        data-variant={variant}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
});

jest.mock('@/components/common/Modal', () => {
  return function MockModal({ isOpen, onClose, children }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>Close Modal</button>
        <div>{children}</div>
      </div>
    );
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AddFavorite Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('removes localStorage item on mount', () => {
    render(<AddFavorite />);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('hasShownFavoriteModal');
  });

  it('initially renders with modal closed', () => {
    const { container } = render(<AddFavorite />);
    expect(container.firstChild).toBeNull();
  });

  it('shows modal after 4 seconds if not previously shown', () => {
    render(<AddFavorite />);

    // Modal should be closed initially
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    // Fast-forward time by 4 seconds
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Modal should be open now
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hasShownFavoriteModal', 'true');
  });

  it('does not show modal if previously shown', () => {
    // Set localStorage to indicate modal was previously shown
    localStorageMock.getItem.mockReturnValueOnce('true');

    render(<AddFavorite />);

    // Fast-forward time by 4 seconds
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Modal should still be closed
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('closes modal when "No, thanks" button is clicked', () => {
    render(<AddFavorite />);

    // Open the modal
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Find the "No, thanks" button
    const buttons = screen.getAllByTestId('button');
    const noThanksButton = buttons.find(button => button.textContent === 'No, thanks');

    // Click the button
    fireEvent.click(noThanksButton!);

    // Modal should be closed
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('navigates to add-preference page when "Yes, Let\'s go" button is clicked', () => {
    // Skip testing stopPropagation and focus on the main functionality
    render(<AddFavorite />);

    // Open the modal
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Find the "Yes, Let's go" button
    const buttons = screen.getAllByTestId('button');
    const yesButton = buttons.find(button => button.textContent === "Yes, Let's go");

    // Click the button
    fireEvent.click(yesButton!);

    // Check if router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/find-products/add-preference');

    // Modal should be closed
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('cleans up timeout on unmount', () => {
    // Mock clearTimeout
    const originalClearTimeout = window.clearTimeout;
    window.clearTimeout = jest.fn();

    const { unmount } = render(<AddFavorite />);

    // Unmount the component
    unmount();

    // clearTimeout should have been called
    expect(window.clearTimeout).toHaveBeenCalled();

    // Restore original clearTimeout
    window.clearTimeout = originalClearTimeout;
  });

  it('renders the correct content in the modal', () => {
    render(<AddFavorite />);

    // Open the modal
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Check if the modal content is rendered correctly
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    // Check for heading text
    const headingText = "Would you like to add your favorite products now and match with hundreds of skintwins?";
    expect(modal.textContent).toContain(headingText);

    // Check for description text
    const descriptionText = "Add your product preferences and get more accurate results. You can also see how popular these products are with your skintwins.";
    expect(modal.textContent).toContain(descriptionText);

    // Check for buttons
    const buttons = screen.getAllByTestId('button');
    const yesButton = buttons.find(button => button.textContent === "Yes, Let's go");
    const noButton = buttons.find(button => button.textContent === "No, thanks");

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
    expect(noButton).toHaveAttribute('data-variant', 'outline');
  });

  it('closes modal when clicking the modal close button', () => {
    render(<AddFavorite />);

    // Open the modal
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Find the modal close button
    const closeButton = screen.getByTestId('modal-close');

    // Click the button
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});