import { render, screen, fireEvent } from '@testing-library/react';
import SetNewPasswordForm from '../SetNewPasswordForm';
import '@testing-library/jest-dom';

describe('SetNewPasswordForm', () => {
  it('renders the form correctly', () => {
    const mockOnSubmit = jest.fn(); // Create a mock function for onSubmit
    render(<SetNewPasswordForm onSubmit={mockOnSubmit} />); // Pass the mock function as a prop

    expect(screen.getByText('Set your new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('submits the form when passwords match', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<SetNewPasswordForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const passwordInput = screen.getByPlaceholderText('Enter password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'newpassword123' } });

    fireEvent.click(submitButton);

    // Check if the submit handler was called
    expect(handleSubmit).toHaveBeenCalledWith({
      password: 'newpassword123',
      repeatPassword: 'newpassword123',
    });
  });

  it('does not submit the form if passwords do not match', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<SetNewPasswordForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const passwordInput = screen.getByPlaceholderText('Enter password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'differentpassword' } });

    fireEvent.click(submitButton);

    // Check if the submit handler was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});