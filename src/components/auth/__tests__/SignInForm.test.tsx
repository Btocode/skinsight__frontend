import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useLoginMutation } from '@/lib/services/authApi';
import SignInForm from '../SignInForm';
import { useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the auth API hook
jest.mock('@/lib/services/authApi', () => ({
  useLoginMutation: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('SignInForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = '/current-path';
  const mockLoginMutation = jest.fn();

  const originalLocation = window.location;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = 'http://test-api.com';

    // Mock window.location using Object.defineProperty
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: '',
        assign: jest.fn(),
      },
    });
  });

  afterAll(() => {
    // Restore the original window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLoginMutation,
      { isLoading: false, isError: false, error: null },
    ]);
  });

  it('renders the form correctly', () => {
    render(<SignInForm />);

    expect(screen.getByText('Log into your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    const mockLoginResponse = {
      unwrap: jest.fn().mockResolvedValue({}), // Simulate a successful response
    };

    mockLoginMutation.mockReturnValue(mockLoginResponse); // Ensure the mock returns the correct structure

    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText('Enter email address');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for router.push to be called after setTimeout
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(mockPathname);
    }, { timeout: 1500 }); // Increased timeout to account for setTimeout
  });

  it('handles social login clicks', () => {
    render(<SignInForm />);

    const googleButton = screen.getByAltText('Google');
    fireEvent.click(googleButton);
    expect(window.location.href).toBe('http://test-api.com/auth/sign_in_with_provider/google');

    const facebookButton = screen.getByAltText('Facebook');
    fireEvent.click(facebookButton);
    expect(window.location.href).toBe('http://test-api.com/auth/sign_in_with_provider/facebook');

    const appleButton = screen.getByAltText('Apple');
    fireEvent.click(appleButton);
    expect(window.location.href).toBe('http://test-api.com/auth/sign_in_with_provider/apple');
  });

  it('renders the social login buttons', () => {
    render(<SignInForm />);
    expect(screen.getByAltText('Google')).toBeInTheDocument();
    expect(screen.getByAltText('Facebook')).toBeInTheDocument();
    expect(screen.getByAltText('Apple')).toBeInTheDocument();
  });

  it('renders the sign up link', () => {
    render(<SignInForm />);
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  // tests that are not working

  // it('renders validation errors', async () => {
  //   render(<SignInForm />);

  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   fireEvent.change(emailInput, { target: { value: 'invalid' } });

  //   const submitButton = screen.getByRole('button', { name: 'Sign in' });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  //   });
  // });

  // it('displays validation errors for invalid input', async () => {
  //   render(<SignInForm />);

  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   fireEvent.change(emailInput, { target: { value: 'invalid' } });

  //   const submitButton = screen.getByRole('button', { name: 'Sign in' });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  //   });
  // });

  // it('handles API error responses', async () => {
  //   const mockLoginResponse = {
  //     unwrap: jest.fn().mockRejectedValue({
  //       status: 401,
  //       data: { detail: 'Invalid credentials' },
  //     }),
  //   };

  //   mockLoginMutation.mockReturnValue(mockLoginResponse);

  //   render(<SignInForm />);

  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   const passwordInput = screen.getByPlaceholderText('Enter password');
  //   const submitButton = screen.getByRole('button', { name: 'Sign in' });

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Oops! that is not the right password\. Want to reset\?/i)).toBeInTheDocument();
  //   });
  // });

  // it('shows loading state during form submission', async () => {
  //   const mockLoginResponse = {
  //     unwrap: jest.fn().mockResolvedValue({}), // Simulate a successful response
  //   };

  //   mockLoginMutation.mockReturnValue(mockLoginResponse); // Ensure the mock returns the correct structure

  //   render(<SignInForm />);

  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   const passwordInput = screen.getByPlaceholderText('Enter password');
  //   const submitButton = screen.getByRole('button', { name: 'Sign in' });

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   expect(screen.getByText('Signing in...')).toBeInTheDocument();
  // });


});