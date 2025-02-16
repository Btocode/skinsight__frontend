import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRegisterMutation } from '@/lib/services/authApi';
import SignUpForm from '../SignUpForm';
import { useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the auth API hook
jest.mock('@/lib/services/authApi', () => ({
  useRegisterMutation: jest.fn(),
}));

describe('SignUpForm', () => {
  const mockRouter = {
    replace: jest.fn(),
    push: jest.fn(),
  };
  const mockPathname = '/current-path';
  const mockRegisterMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useRegisterMutation as jest.Mock).mockReturnValue([
      mockRegisterMutation,
      { isLoading: false, isError: false, error: null },
    ]);
  });

  it('renders the form correctly', () => {
    render(<SignUpForm />);

    expect(screen.getByText('Sign up to get personalized recommendations')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });


  it('renders the social login buttons', () => {
    render(<SignUpForm />);
    expect(screen.getByAltText('Google')).toBeInTheDocument();
    expect(screen.getByAltText('Facebook')).toBeInTheDocument();
    expect(screen.getByAltText('Apple')).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    const mockRegisterResponse = {
      unwrap: jest.fn().mockResolvedValue({}), // Simulate a successful response
    };

    mockRegisterMutation.mockReturnValue(mockRegisterResponse); // Ensure the mock returns the correct structure

    render(<SignUpForm />);

    const nameInput = screen.getByPlaceholderText('Your name');
    const emailInput = screen.getByPlaceholderText('Enter email address');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for router.push to be called after setTimeout
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(`${mockPathname}?auth=sign-in`);
    }, { timeout: 1500 }); // Increased timeout to account for setTimeout
  });

  // it('displays validation errors for invalid input', async () => {
  //   render(<SignUpForm />);

  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   fireEvent.change(emailInput, { target: { value: 'invalid' } });

  //   const submitButton = screen.getByRole('button', { name: 'Sign up' });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  //   });
  // });

  // it('handles API error responses', async () => {
  //   const mockRegisterResponse = {
  //     unwrap: jest.fn().mockRejectedValue({
  //       status: 400,
  //       data: { detail: 'Registration failed' },
  //     }),
  //   };

  //   mockRegisterMutation.mockReturnValue(mockRegisterResponse);

  //   render(<SignUpForm />);

  //   const nameInput = screen.getByPlaceholderText('Your name');
  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   const passwordInput = screen.getByPlaceholderText('Enter password');
  //   const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
  //   const submitButton = screen.getByRole('button', { name: 'Sign up' });

  //   fireEvent.change(nameInput, { target: { value: 'Test User' } });
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
  //   });
  // });

  // it('shows loading state during form submission', async () => {
  //   const mockRegisterResponse = {
  //     unwrap: jest.fn().mockResolvedValue({}), // Simulate a successful response
  //   };

  //   mockRegisterMutation.mockReturnValue(mockRegisterResponse); // Ensure the mock returns the correct structure

  //   render(<SignUpForm />);

  //   const nameInput = screen.getByPlaceholderText('Your name');
  //   const emailInput = screen.getByPlaceholderText('Enter email address');
  //   const passwordInput = screen.getByPlaceholderText('Enter password');
  //   const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
  //   const submitButton = screen.getByRole('button', { name: 'Sign up' });

  //   fireEvent.change(nameInput, { target: { value: 'Test User' } });
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   expect(screen.getByText('Signing up...')).toBeInTheDocument();
  // });


  // it('renders the sign in link', () => {
  //   render(<SignUpForm />);
  //   expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  //   expect(screen.getByText('Sign in')).toBeInTheDocument();
  // });

});
