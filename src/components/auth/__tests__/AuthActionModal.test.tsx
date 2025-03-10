import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthActionModal from '@/components/auth/AuthActionModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the child components
jest.mock('@/components/auth/SignInForm', () => ({
  __esModule: true,
  default: () => <div data-testid="sign-in-form">Sign In Form</div>,
}));

jest.mock('@/components/auth/SignUpForm', () => ({
  __esModule: true,
  default: () => <div data-testid="sign-up-form">Sign Up Form</div>,
}));

jest.mock('@/components/auth/ForgotPasswordForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: any) => void }) => (
    <div data-testid="forgot-password-form">
      <button onClick={() => onSubmit({ email: 'test@example.com' })}>
        Submit Forgot Password
      </button>
    </div>
  ),
}));

jest.mock('@/components/auth/CodeValidationForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: any) => void }) => (
    <div data-testid="code-validation-form">
      <button onClick={() => onSubmit({ code: '123456' })}>
        Submit Code
      </button>
    </div>
  ),
}));

jest.mock('@/components/auth/SetNewPasswordForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: any) => void }) => (
    <div data-testid="set-new-password-form">
      <button onClick={() => onSubmit({ password: 'newpassword', repeatPassword: 'newpassword' })}>
        Submit New Password
      </button>
    </div>
  ),
}));

jest.mock('@/components/common/Modal', () => ({
  __esModule: true,
  default: ({ children, isOpen, onClose }: { children: React.ReactNode, isOpen: boolean, onClose: () => void }) => (
    isOpen ? (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
  ),
}));

jest.mock('@/components/common/Drawer', () => ({
  __esModule: true,
  default: ({ children, isOpen, onClose }: { children: React.ReactNode, isOpen: boolean, onClose: () => void }) => (
    isOpen ? (
      <div data-testid="drawer">
        <button data-testid="drawer-close" onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
  ),
}));

describe('AuthActionModal', () => {
  // Setup common mocks
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = '/test-path';
  let mockSearchParams: any;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    // Setup a mock for useSearchParams
    mockSearchParams = {
      get: jest.fn(),
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders nothing when no auth param is present', () => {
    mockSearchParams.get.mockReturnValue(null);

    render(<AuthActionModal />);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
  });

  it('renders sign-in form when auth=sign-in', () => {
    mockSearchParams.get.mockReturnValue('sign-in');

    render(<AuthActionModal />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getAllByTestId('sign-in-form').length).toBe(2); // One in modal, one in drawer
  });

  it('renders sign-up form when auth=sign-up', () => {
    mockSearchParams.get.mockReturnValue('sign-up');

    render(<AuthActionModal />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getAllByTestId('sign-up-form').length).toBe(2); // One in modal, one in drawer
  });

  it('renders forgot-password form when auth=forgot-password', () => {
    mockSearchParams.get.mockReturnValue('forgot-password');

    render(<AuthActionModal />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getAllByTestId('forgot-password-form').length).toBe(2); // One in modal, one in drawer
  });

  it('renders code-validation form when auth=code-validation', () => {
    mockSearchParams.get.mockReturnValue('code-validation');

    render(<AuthActionModal />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getAllByTestId('code-validation-form').length).toBe(2); // One in modal, one in drawer
  });

  it('renders set-new-password form when auth=set-new-password', () => {
    mockSearchParams.get.mockReturnValue('set-new-password');

    render(<AuthActionModal />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getAllByTestId('set-new-password-form').length).toBe(2); // One in modal, one in drawer
  });

  it('closes the modal when close button is clicked', () => {
    mockSearchParams.get.mockReturnValue('sign-in');

    render(<AuthActionModal />);

    fireEvent.click(screen.getByTestId('modal-close'));

    expect(mockRouter.push).toHaveBeenCalledWith(mockPathname);
  });

  it('closes the drawer when close button is clicked', () => {
    mockSearchParams.get.mockReturnValue('sign-in');

    render(<AuthActionModal />);

    fireEvent.click(screen.getByTestId('drawer-close'));

    expect(mockRouter.push).toHaveBeenCalledWith(mockPathname);
  });

  it('handles forgot password form submission', () => {
    // Mock console.log to verify it's called
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockSearchParams.get.mockReturnValue('forgot-password');

    render(<AuthActionModal />);

    // Find and click the submit button in the forgot password form
    const submitButton = screen.getAllByText('Submit Forgot Password')[0];
    fireEvent.click(submitButton);

    // Verify that the handler was called with the correct data
    expect(consoleSpy).toHaveBeenCalledWith('Forgot password data:', { email: 'test@example.com' });

    consoleSpy.mockRestore();
  });

  it('handles code validation form submission', () => {
    // Mock console.log to verify it's called
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockSearchParams.get.mockReturnValue('code-validation');

    render(<AuthActionModal />);

    // Find and click the submit button in the code validation form
    const submitButton = screen.getAllByText('Submit Code')[0];
    fireEvent.click(submitButton);

    // Verify that the handler was called with the correct data
    expect(consoleSpy).toHaveBeenCalledWith('Code validation data:', { code: '123456' });

    consoleSpy.mockRestore();
  });

  it('handles set new password form submission', () => {
    // Mock console.log to verify it's called
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockSearchParams.get.mockReturnValue('set-new-password');

    render(<AuthActionModal />);

    // Find and click the submit button in the set new password form
    const submitButton = screen.getAllByText('Submit New Password')[0];
    fireEvent.click(submitButton);

    // Verify that the handler was called with the correct data
    expect(consoleSpy).toHaveBeenCalledWith('Set new password data:', {
      password: 'newpassword',
      repeatPassword: 'newpassword'
    });

    consoleSpy.mockRestore();
  });

  it('does not render when auth param is invalid', () => {
    mockSearchParams.get.mockReturnValue('invalid-auth-action');

    render(<AuthActionModal />);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
  });
});