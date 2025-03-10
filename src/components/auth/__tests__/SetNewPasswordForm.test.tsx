import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SetNewPasswordForm from '../SetNewPasswordForm';
import { useUpdatePasswordMutation } from '@/lib/services/authApi';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('@/lib/services/authApi', () => ({
  useUpdatePasswordMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SetNewPasswordForm', () => {
  // Setup common mocks
  const mockRouter = {
    push: jest.fn(),
  };
  let mockUpdatePassword: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Setup update password mutation mock
    mockUpdatePassword = jest.fn().mockImplementation(() => ({
      unwrap: () => Promise.resolve({})
    }));

    (useUpdatePasswordMutation as jest.Mock).mockReturnValue([
      mockUpdatePassword,
      { isLoading: false }
    ]);

    // Reset timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the form correctly', () => {
    render(<SetNewPasswordForm />);

    // Check heading
    expect(screen.getByText('Set your new password')).toBeInTheDocument();

    // Check subheader
    expect(screen.getByText('to sign into your skinsight account')).toBeInTheDocument();

    // Check password inputs
    expect(screen.getByPlaceholderText('Enter new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat new password')).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole('button', { name: 'Update Password' })).toBeInTheDocument();
  });

  it('updates password state when typing', () => {
    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'Password123' } });

    // Check that inputs have the values
    expect(passwordInput).toHaveValue('Password123');
    expect(repeatPasswordInput).toHaveValue('Password123');

    // Check that the subheader updates when passwords match
    expect(screen.getByText('Great! The passwords match')).toBeInTheDocument();
  });

  it('shows error when passwords do not match', () => {
    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in different passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'DifferentPassword' } });

    // Check that error message appears
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();

    // Button should be disabled
    expect(screen.getByRole('button', { name: 'Update Password' })).toBeDisabled();
  });

  it('submits the form with password value', async () => {
    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in matching passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'Password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Update Password' });
    fireEvent.click(submitButton);

    // Check that API was called with correct data
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith({ new_password: 'Password123' });
    });
  });

  it('shows loading state during submission', () => {
    // Set loading state
    (useUpdatePasswordMutation as jest.Mock).mockReturnValue([
      mockUpdatePassword,
      { isLoading: true }
    ]);

    render(<SetNewPasswordForm />);

    // Check that the button shows loading state
    expect(screen.getByRole('button', { name: 'Updating...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Updating...' })).toBeDisabled();
  });

  it('shows success state after successful submission', async () => {
    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in matching passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'Password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Update Password' });
    fireEvent.click(submitButton);

    // Check for success state
    await waitFor(() => {
      expect(screen.getByText('Password Updated Successfully')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Password Updated' })).toBeInTheDocument();
    });

    // Check that inputs have success class
    expect(passwordInput).toHaveClass('bg-green-50');
    expect(repeatPasswordInput).toHaveClass('bg-green-50');

    // Advance timers to trigger redirect
    jest.advanceTimersByTime(2000);

    // Check that we redirect to home page
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('handles API errors during form submission', async () => {
    // Make API call fail
    mockUpdatePassword.mockImplementation(() => ({
      unwrap: () => Promise.reject({ data: { detail: 'Invalid credentials' } })
    }));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in matching passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'Password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Update Password' });
    fireEvent.click(submitButton);

    // Check that error was logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    // Check that error message is displayed
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();

    // Should not redirect
    expect(mockRouter.push).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('displays default error message when API error has no detail', async () => {
    // Make API call fail with no detail
    mockUpdatePassword.mockImplementation(() => ({
      unwrap: () => Promise.reject({ data: {} })
    }));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<SetNewPasswordForm />);

    // Get password inputs
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    // Type in matching passwords
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'Password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Update Password' });
    fireEvent.click(submitButton);

    // Check that default error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to update password')).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
