import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword from '../ChangePassword';

describe('ChangePassword', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  it('renders the change password component correctly', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    // Check for main elements
    expect(screen.getByText('Change password')).toBeInTheDocument();
    expect(screen.getByText(/To change your password, please enter your old password/)).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByPlaceholderText('Enter you old password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter you new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat new password')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onClose when back button is clicked', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });



  it('allows input in password fields', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    const oldPasswordInput = screen.getByPlaceholderText('Enter you old password');
    const newPasswordInput = screen.getByPlaceholderText('Enter you new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    fireEvent.change(oldPasswordInput, { target: { value: 'oldpass123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpass123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'newpass123' } });

    expect(oldPasswordInput).toHaveValue('oldpass123');
    expect(newPasswordInput).toHaveValue('newpass123');
    expect(repeatPasswordInput).toHaveValue('newpass123');
  });

});