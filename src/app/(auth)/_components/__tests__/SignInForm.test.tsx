import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from '../SignInForm';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('SignInForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    ((useDispatch as unknown) as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form heading', () => {
    render(<SignInForm />);
    expect(screen.getByText('Log into your account')).toBeInTheDocument();
  });

  it('renders form elements', () => {
    render(<SignInForm />);
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    render(<SignInForm />);
    // Test for 3 social buttons (Google, Facebook, Apple)
    const socialButtons = screen.getAllByRole('button');
    expect(socialButtons).toHaveLength(5); // 1 sign in + 3 social + 1 eye button to see password
  });

  it('renders the sign up link', () => {
    render(<SignInForm />);
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  it('handles email input', () => {
    render(<SignInForm />);
    const emailInput = screen.getByPlaceholderText('Enter email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('handles password input', () => {
    render(<SignInForm />);
    const passwordInput = screen.getByPlaceholderText('Enter password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  it('navigates to sign up page', () => {
    render(<SignInForm />);
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  it('handles form submission', () => {
    render(<SignInForm />);
    const form = screen.getByTestId('sign-in-form'); // Add this data-testid to your form

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    // Use form submit instead of button click
    fireEvent.submit(form);
  });

  // it('shows validation errors for invalid inputs', async () => {
  //   render(<SignInForm />);

  //   // Submit without filling form
  //   fireEvent.submit(screen.getByTestId('sign-in-form'));

  //   // Check for validation messages
  //   await waitFor(() => {
  //     expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  //     expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  //   });
  // });

  // it('navigates to sign up page when clicking sign up link', async () => {
  //   render(<SignInForm />);

  //   const signUpLink = screen.getByRole('link', { name: /sign up/i });
  //   fireEvent.click(signUpLink);

  //   await waitFor(() => {
  //     expect(mockRouter.push).toHaveBeenCalledWith('/sign-up');
  //   });
  // });
});