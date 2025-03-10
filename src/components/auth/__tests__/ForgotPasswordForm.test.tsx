import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { useForgotPasswordMutation } from '@/lib/services/authApi';
import '@testing-library/jest-dom';

// Mock the API hook
jest.mock('@/lib/services/authApi', () => ({
  useForgotPasswordMutation: jest.fn(),
}));

describe('ForgotPasswordForm', () => {
  // Setup common mocks
  let mockForgotPassword: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mutation mock
    mockForgotPassword = jest.fn();
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([
      mockForgotPassword,
      { isLoading: false }
    ]);
  });

  it('renders the initial form state correctly', () => {
    render(<ForgotPasswordForm />);

    // Check for the heading
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByText("We'll send you a password reset link")).toBeInTheDocument();

    // Check for the email input
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows loading state when submitting', () => {
    // Set loading state
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([
      mockForgotPassword,
      { isLoading: true }
    ]);

    render(<ForgotPasswordForm />);

    // Check that the button shows loading state
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('submits the form with email value', async () => {
    render(<ForgotPasswordForm />);

    // Fill in the email
    const emailInput = screen.getByPlaceholderText('Enter email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(submitButton);

    // Check that the API was called with the correct data
    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('shows success message after successful submission', async () => {
    // Make the API call succeed
    mockForgotPassword.mockResolvedValue({});

    render(<ForgotPasswordForm />);

    // Fill in the email
    const emailInput = screen.getByPlaceholderText('Enter email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(submitButton);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Email Sent')).toBeInTheDocument();
      expect(screen.getByText('Password recovery email sent, please check your inbox')).toBeInTheDocument();
    });

    // Form should no longer be visible
    expect(screen.queryByPlaceholderText('Enter email address')).not.toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Make the API call fail
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockForgotPassword.mockRejectedValue(new Error('API error'));

    render(<ForgotPasswordForm />);

    // Fill in the email
    const emailInput = screen.getByPlaceholderText('Enter email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(submitButton);

    // Check that error was logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    // Form should still be visible (not in success state)
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
