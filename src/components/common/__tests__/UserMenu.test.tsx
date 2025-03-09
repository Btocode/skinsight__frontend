import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import UserMenu, { MENU_ITEMS } from '../UserMenu';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hook';
import { useLogoutMutation } from '@/lib/services/authApi';
import { logout } from '@/redux/slices/authSlice';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock Redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

// Mock logout mutation
jest.mock('@/lib/services/authApi', () => ({
  useLogoutMutation: jest.fn(),
}));

// Mock Redux actions
jest.mock('@/redux/slices/authSlice', () => ({
  logout: jest.fn(),
  selectUserDisplayName: jest.fn(),
}));

describe('UserMenu', () => {
  const mockDispatch = jest.fn();
  const mockLogout = jest.fn();
  const mockLogoutMutation = jest.fn().mockResolvedValue({});
  const mockUnwrap = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mocks
    (useAppSelector as jest.Mock).mockReturnValue('John Doe');
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useLogoutMutation as jest.Mock).mockReturnValue([
      () => ({ unwrap: mockUnwrap }),
      { isLoading: false }
    ]);
  });

  it('renders user menu button with user name', () => {
    render(<UserMenu />);

    const button = screen.getByRole('button', { name: /hi, john!/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-controls', 'user-menu');
  });

  it('displays first name only from display name', () => {
    render(<UserMenu />);

    expect(screen.getByText('Hi, John!')).toBeInTheDocument();
  });

  it('displays "User" when no display name is available', () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);
    render(<UserMenu />);

    expect(screen.getByText('Hi, User!')).toBeInTheDocument();
  });

  it('opens menu when button is clicked', () => {
    render(<UserMenu />);

    const button = screen.getByRole('button', { name: /hi, john!/i });
    fireEvent.click(button);

    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('visible');
    expect(menu).toHaveClass('scale-100');
    expect(menu).toHaveClass('opacity-100');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes menu when clicking outside', () => {
    render(
      <div>
        <UserMenu />
        <div data-testid="outside">Outside</div>
      </div>
    );

    // Open menu
    const button = screen.getByRole('button', { name: /hi, john!/i });
    fireEvent.click(button);

    // Menu should be open
    expect(screen.getByRole('menu')).toHaveClass('visible');

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    // Menu should be closed
    expect(screen.getByRole('menu')).toHaveClass('invisible');
  });

  it('renders all menu items', () => {
    render(<UserMenu />);

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /hi, john!/i }));

    // Check all menu items are rendered
    MENU_ITEMS.forEach(item => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });

  it('closes menu when a menu item is clicked', () => {
    render(<UserMenu />);

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /hi, john!/i }));

    // Click a menu item
    fireEvent.click(screen.getByText('My profile'));

    // Menu should be closed
    expect(screen.getByRole('menu')).toHaveClass('invisible');
  });

  it('handles logout correctly', async () => {
    render(<UserMenu />);

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /hi, john!/i }));

    // Click logout button
    const logoutButton = screen.getByText('Log out');
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    // Check if logout was called
    expect(mockUnwrap).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it('handles keyboard navigation with arrow down', () => {
    render(<UserMenu />);

    const button = screen.getByRole('button', { name: /hi, john!/i });

    // Press arrow down to open menu and focus first item
    fireEvent.keyDown(button, { key: 'ArrowDown' });

    // Menu should be open
    expect(screen.getByRole('menu')).toHaveClass('visible');

    // First menu item should be focused
    const firstMenuItem = screen.getByText('My profile').closest('a');
    expect(document.activeElement).toBe(firstMenuItem);
  });

  it('handles keyboard navigation with arrow up', () => {
    render(<UserMenu />);

    const button = screen.getByRole('button', { name: /hi, john!/i });

    // Press arrow up to open menu and focus last item
    fireEvent.keyDown(button, { key: 'ArrowUp' });

    // Menu should be open
    expect(screen.getByRole('menu')).toHaveClass('visible');

    // Last menu item should be focused
    const lastMenuItem = screen.getByText('My regimen').closest('a');
    expect(document.activeElement).toBe(lastMenuItem);
  });

  it('handles keyboard navigation with Enter key', () => {
    render(<UserMenu />);

    const button = screen.getByRole('button', { name: /hi, john!/i });

    // Press Enter to open menu
    fireEvent.keyDown(button, { key: 'Enter' });

    // Menu should be open
    expect(screen.getByRole('menu')).toHaveClass('visible');
  });

  it('handles keyboard navigation with Escape key', () => {
    render(<UserMenu />);

    // Open menu
    const button = screen.getByRole('button', { name: /hi, john!/i });
    fireEvent.click(button);

    // Press Escape to close menu
    fireEvent.keyDown(button, { key: 'Escape' });

    // Menu should be closed
    expect(screen.getByRole('menu')).toHaveClass('invisible');
  });

  it('handles keyboard navigation with Tab key', () => {
    render(<UserMenu />);

    // Open menu
    const button = screen.getByRole('button', { name: /hi, john!/i });
    fireEvent.click(button);

    // Press Tab to close menu
    fireEvent.keyDown(button, { key: 'Tab' });

    // Menu should be closed
    expect(screen.getByRole('menu')).toHaveClass('invisible');
  });

  it('disables logout button when logout is loading', () => {
    (useLogoutMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: true }
    ]);

    render(<UserMenu />);

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /hi, john!/i }));

    // Logout button should be disabled
    const logoutButton = screen.getByText('Log out').closest('button');
    expect(logoutButton).toBeDisabled();
  });

  it('handles logout error gracefully', async () => {
    const mockUnwrapWithError = jest.fn().mockRejectedValue(new Error('Logout failed'));
    (useLogoutMutation as jest.Mock).mockReturnValue([
      () => ({ unwrap: mockUnwrapWithError }),
      { isLoading: false }
    ]);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<UserMenu />);

    // Open menu
    fireEvent.click(screen.getByRole('button', { name: /hi, john!/i }));

    // Click logout button
    const logoutButton = screen.getByText('Log out');
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    // Check if error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error));

    consoleSpy.mockRestore();
  });
});