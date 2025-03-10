import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SignInForm from '@/components/auth/SignInForm';
import { useLoginMutation } from '@/lib/services/authApi';
import { usePathname, useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/lib/services/authApi', () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean props to strings to avoid React warnings
    const imgProps = { ...props };
    if (typeof imgProps.fill === 'boolean') imgProps.fill = imgProps.fill.toString();
    if (typeof imgProps.priority === 'boolean') imgProps.priority = imgProps.priority.toString();

    return <img {...imgProps} alt={props.alt} data-testid={`image-${props.alt}`} />;
  },
}));

jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h1 className={className} data-testid="heading-primary">{children}</h1>
  ),
}));

jest.mock('@/components/common/InputBox', () => ({
  __esModule: true,
  InputBox: ({
    type,
    placeholder,
    id,
    value,
    onChange,
    error,
    disabled,
    className
  }: {
    type: string,
    placeholder: string,
    id: string,
    value: string,
    onChange: (e: any) => void,
    error?: string,
    disabled?: boolean,
    className?: string
  }) => (
    <div data-testid={`input-${id}`} className={className}>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        data-testid={id}
        className={className}
      />
      {error && <span data-testid={`error-${id}`}>{error}</span>}
    </div>
  ),
}));

jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({
    children,
    type,
    disabled,
    className,
    onClick
  }: {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    className?: string,
    onClick?: () => void
  }) => (
    <button
      type={type || "button"}
      disabled={disabled}
      className={className}
      onClick={onClick}
      data-testid="submit-button"
    >
      {children}
    </button>
  ),
}));

describe('SignInForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockPathname = '/test-path';
  let mockLoginMutation: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    // Setup login mutation mock with unwrap method
    const loginFn = jest.fn().mockImplementation(() => ({
      unwrap: () => Promise.resolve({ user: { id: '123', email: 'test@example.com' } })
    }));

    mockLoginMutation = [
      loginFn,
      {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
      },
    ];
    (useLoginMutation as jest.Mock).mockReturnValue(mockLoginMutation);
  });

  it('renders the sign in form correctly', () => {
    render(<SignInForm />);

    // Check heading
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Log into your account');

    // Check inputs
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();

    // Check submit button
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Sign in');

    // Check social login buttons
    expect(screen.getByTestId('image-Google')).toBeInTheDocument();
    expect(screen.getByTestId('image-Facebook')).toBeInTheDocument();
    expect(screen.getByTestId('image-Apple')).toBeInTheDocument();

    // Check sign up link
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const loginUser = mockLoginMutation[0];

    await act(async () => {
      render(<SignInForm />);
    });

    // Fill in the form
    await act(async () => {
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    // Check that the login mutation was called with correct data
    expect(loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    // Wait for the redirect
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(mockPathname);
    }, { timeout: 600 });
  });

  it('displays loading state during submission', async () => {
    // Set loading state
    mockLoginMutation[1].isLoading = true;

    await act(async () => {
      render(<SignInForm />);
    });

    // Check that the button shows loading state
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Signing in...');
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    // Check that inputs are disabled
    expect(screen.getByTestId('email')).toBeDisabled();
    expect(screen.getByTestId('password')).toBeDisabled();
  });

  it('displays validation errors', async () => {
    await act(async () => {
      render(<SignInForm />);
    });

    // Submit the form without filling it
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByTestId('error-email')).toBeInTheDocument();
    });
  });

  it('displays API error for invalid credentials', async () => {
    // Set error state for 401 unauthorized
    mockLoginMutation[1].isError = true;
    mockLoginMutation[1].error = { status: 401 };

    await act(async () => {
      render(<SignInForm />);
    });

    // Check that the error message is displayed
    expect(screen.getByText(/Oops! that is not the right password./i)).toBeInTheDocument();
    expect(screen.getByText(/Want to reset?/i)).toBeInTheDocument();
  });

  it('displays generic API error', async () => {
    // Set error state for other errors
    mockLoginMutation[1].isError = true;
    mockLoginMutation[1].error = {
      data: { detail: 'Something went wrong' },
      status: 500
    };

    await act(async () => {
      render(<SignInForm />);
    });

    // Check that the error message is displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('handles social login correctly', async () => {
    // Mock environment variable
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_URL: 'https://api.example.com',
    };

    await act(async () => {
      render(<SignInForm />);
    });

    // Click Google login button
    await act(async () => {
      fireEvent.click(screen.getByTestId('image-Google'));
    });

    // Check that router.push was called with the correct URL
    expect(mockRouter.push).toHaveBeenCalledWith('https://api.example.com/auth/oauth/google');

    // Click Facebook login button
    await act(async () => {
      fireEvent.click(screen.getByTestId('image-Facebook'));
    });

    // Check that router.push was called with the correct URL
    expect(mockRouter.push).toHaveBeenCalledWith('https://api.example.com/auth/oauth/facebook');

    // Click Apple login button
    await act(async () => {
      fireEvent.click(screen.getByTestId('image-Apple'));
    });

    // Check that router.push was called with the correct URL
    expect(mockRouter.push).toHaveBeenCalledWith('https://api.example.com/auth/oauth/apple');

    // Restore environment
    process.env = originalEnv;
  });



  it('shows success state after successful login', async () => {
    // Set success state
    mockLoginMutation[1].isSuccess = true;

    await act(async () => {
      render(<SignInForm />);
    });

    // Check that inputs have success class
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    expect(emailInput).toHaveClass('bg-green-50');
    expect(passwordInput).toHaveClass('bg-green-50');
  });
});