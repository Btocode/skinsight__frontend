import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hook';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/lib/redux/store';
import { ImageProps } from 'next/image';

// Mock dependencies
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Update the mock
jest.mock('@/lib/redux/hook', () => ({
  useAppSelector: jest.fn() as jest.MockedFunction<TypedUseSelectorHook<RootState>>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, className, width, height } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === 'string' ? src : ''}
        alt={alt || ''}
        className={className}
        width={width}
        height={height}
        data-testid="product-image"
        data-fill="true"
      />
    );
  },
}));

jest.mock('../../auth/AuthActionModal', () => ({
  __esModule: true,
  default: () => <div data-testid="auth-modal">Auth Modal</div>,
}));

jest.mock('../../common/UserMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="user-menu">User Menu</div>,
  MENU_ITEMS: [
    { href: '/profile', text: 'My profile', icon: <span>Icon</span> },
    { href: '/regimen', text: 'My regimen', icon: <span>Icon</span> },
  ],
}));

describe('Header', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ isAuthenticated: false });
  });

  it('renders the header with logo', () => {
    render(<Header />);

    // Check that the header is rendered
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Check that the logo is rendered
    const logos = screen.getAllByAltText('Skinsight Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders auth modal', () => {
    render(<Header />);

    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
  });

  it('renders login button when not authenticated', () => {
    render(<Header />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders user menu when authenticated', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ isAuthenticated: true });

    // Need to mock mounted state
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);

    render(<Header />);

    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
  });

  it('opens auth modal when login button is clicked', () => {
    render(<Header />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/?auth=sign-in');
  });

  it('renders menu items', () => {
    render(<Header />);

    // Check for menu items
    const menuItems = [
      'Recommend Products',
      'Find Alternatives',
      'Build Regimen',
      'About',
      'Help',
    ];

    menuItems.forEach(item => {
      const links = screen.getAllByText(item);
      expect(links.length).toBeGreaterThan(0);
    });
  });
});