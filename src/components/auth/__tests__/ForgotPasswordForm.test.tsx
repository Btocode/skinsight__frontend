import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordForm from '../ForgotPasswordForm';
import '@testing-library/jest-dom';

describe('ForgotPasswordForm', () => {
  it('renders the form correctly', () => {
    const mockOnSubmit = jest.fn(); // Create a mock function for onSubmit
    render(<ForgotPasswordForm onSubmit={mockOnSubmit} />); // Pass the mock function as a prop

    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('submits the form with a valid email', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<ForgotPasswordForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const emailInput = screen.getByPlaceholderText('Enter email address');
    const submitButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Check if the submit handler was called with the correct email
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });

  it('does not submit the form with an invalid email', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<ForgotPasswordForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const emailInput = screen.getByPlaceholderText('Enter email address');
    const submitButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Check if the submit handler was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
