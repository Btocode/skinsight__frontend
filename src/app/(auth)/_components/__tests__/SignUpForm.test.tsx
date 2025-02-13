import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '../SignUpForm';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form heading', () => {
    render(<SignUpForm />);
    expect(screen.getByText('Sign up to get personalized recommendations')).toBeInTheDocument();
  });

  it('renders form elements', () => {
    render(<SignUpForm />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    render(<SignUpForm />);
    const socialButtons = screen.getAllByRole('button');
    expect(socialButtons).toHaveLength(5); // 1 sign up + 3 social + 2 eye buttons for passwords
  });

  it('renders the sign in link', () => {
    render(<SignUpForm />);
    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toHaveAttribute('href', '/sign-in');
  });

  // it('shows validation errors for invalid email', async () => {
  //   render(<SignUpForm />);

  //   fireEvent.change(screen.getByPlaceholderText('Enter email address'), {
  //     target: { value: 'invalid-email' },
  //   });

  //   fireEvent.submit(screen.getByTestId('sign-up-form'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  //   });
  // });

  // it('shows validation error for short password', async () => {
  //   render(<SignUpForm />);

  //   fireEvent.change(screen.getByPlaceholderText('Enter password'), {
  //     target: { value: '12345' },
  //   });

  //   fireEvent.submit(screen.getByTestId('sign-up-form'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  //   });
  // });

  // it('shows validation error for password mismatch', async () => {
  //   render(<SignUpForm />);

  //   fireEvent.change(screen.getByPlaceholderText('Enter password'), {
  //     target: { value: 'password123' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Confirm password'), {
  //     target: { value: 'password456' },
  //   });

  //   fireEvent.submit(screen.getByTestId('sign-up-form'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Passwords must match')).toBeInTheDocument();
  //   });
  // });

  // it('shows validation error for empty name', async () => {
  //   render(<SignUpForm />);

  //   fireEvent.submit(screen.getByTestId('sign-up-form'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Name is required')).toBeInTheDocument();
  //   });
  // });

  // it('shows all validation errors for empty form submission', async () => {
  //   render(<SignUpForm />);

  //   fireEvent.submit(screen.getByTestId('sign-up-form'));

  //   await waitFor(() => {
  //     expect(screen.getByText('Name is required')).toBeInTheDocument();
  //     expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  //     expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  //     expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
  //   });
  // });
});