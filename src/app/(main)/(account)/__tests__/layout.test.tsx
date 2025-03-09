import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountLayout from '../layout';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('../_components/AccountTabs', () => ({
  __esModule: true,
  default: () => <div data-testid="account-tabs">Account Tabs</div>,
}));

jest.mock('@/components/common/Advertisement', () => ({
  __esModule: true,
  default: () => <div data-testid="advertisement">Advertisement</div>,
}));

// Mock the Redux hook
jest.mock('@/lib/redux/hook', () => ({
  useAppSelector: jest.fn(),
}));

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Import the mocked hooks
import { useAppSelector } from '@/lib/redux/hook';
import { useRouter } from 'next/navigation';

describe('AccountLayout', () => {
  // Setup default mocks
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default router mock
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    // Default auth state
    mockUseAppSelector.mockReturnValue({
      isAuthenticated: true,
      user: {
        display_name: 'John Doe',
      },
    });
  });

  it('renders the layout with correct structure when authenticated', () => {
    const { container } = render(
      <AccountLayout>
        <div data-testid="child-content">Child Content</div>
      </AccountLayout>
    );

    // Check the root container
    expect(container.firstChild).toHaveClass('min-h-svh bg-white');

    // Check the inner container
    const innerContainer = screen.getByText('Welcome,').closest('div');
    expect(innerContainer).toHaveClass('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:w-[90%]');

    // Check the welcome heading
    expect(screen.getByText('Welcome,')).toBeInTheDocument();
    expect(screen.getByText('John!')).toBeInTheDocument();

    // Check that all components are rendered
    expect(screen.getByTestId('account-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByTestId('advertisement')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('redirects to home page when not authenticated', () => {
    // Mock user as not authenticated
    mockUseAppSelector.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(
      <AccountLayout>
        <div data-testid="child-content">Child Content</div>
      </AccountLayout>
    );

    // Check that router.push was called with "/"
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('displays the first name only from the display name', () => {
    // Mock user with a full name
    mockUseAppSelector.mockReturnValue({
      isAuthenticated: true,
      user: {
        display_name: 'Jane Smith Johnson',
      },
    });

    render(
      <AccountLayout>
        <div>Child Content</div>
      </AccountLayout>
    );

    // Check that only the first name is displayed
    expect(screen.getByText('Jane!')).toBeInTheDocument();
  });

  it('handles undefined user name gracefully', () => {
    // Mock user with undefined display_name
    mockUseAppSelector.mockReturnValue({
      isAuthenticated: true,
      user: {
        display_name: undefined,
      },
    });

    render(
      <AccountLayout>
        <div>Child Content</div>
      </AccountLayout>
    );

    // Check that the welcome message is still displayed without errors
    expect(screen.getByText('Welcome,')).toBeInTheDocument();
    // The span should be empty but still present
    const welcomeHeading = screen.getByText('Welcome,').parentElement;
    expect(welcomeHeading?.querySelector('span')).toBeInTheDocument();
  });

  it('renders children content', () => {
    const childContent = <div data-testid="custom-child">Custom Child Content</div>;

    render(
      <AccountLayout>
        {childContent}
      </AccountLayout>
    );

    // Check that the custom child content is rendered
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.getByText('Custom Child Content')).toBeInTheDocument();
  });
});