import { render, screen, fireEvent } from '@testing-library/react';
import CodeValidationForm from '../CodeValidationForm';
import '@testing-library/jest-dom';

describe('CodeValidationForm', () => {
  it('renders the form correctly', () => {
    const mockOnSubmit = jest.fn(); // Create a mock function for onSubmit
    render(<CodeValidationForm onSubmit={mockOnSubmit} />); // Pass the mock function as a prop

    expect(screen.getByText('Enter the code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('submits the form with a valid code', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<CodeValidationForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const codeInput = screen.getByPlaceholderText('Enter code');
    const submitButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(codeInput, { target: { value: 'valid-code' } });
    fireEvent.click(submitButton);

    // Check if the submit handler was called with the correct code
    expect(handleSubmit).toHaveBeenCalledWith({
      code: 'valid-code',
    });
  });

  it('does not submit the form with an invalid code', () => {
    const handleSubmit = jest.fn(); // Mock the submit handler

    render(<CodeValidationForm onSubmit={handleSubmit} />); // Pass the mock function as a prop

    const codeInput = screen.getByPlaceholderText('Enter code');
    const submitButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(codeInput, { target: { value: '' } }); // Simulate an empty code
    fireEvent.click(submitButton);

    // Check if the submit handler was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});