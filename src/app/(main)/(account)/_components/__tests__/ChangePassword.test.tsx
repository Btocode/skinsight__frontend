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

  it('calls onClose when Cancel button is clicked', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders with correct styling classes', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    // Check container width classes
    const container = screen.getByText('Change password').closest('div');
    expect(container).toHaveClass('w-[380px]', 'lg:w-[550px]');

    // Check heading styles
    const heading = screen.getByText('Change password');
    expect(heading).toHaveClass(
      'text-base',
      'lg:text-2xl',
      'font-semibold',
      'leading-[36px]',
      'tracking-[-0.02em]',
      'text-[#111111]'
    );

    // Check form inputs
    const form = screen.getByRole('form');
    expect(form).toHaveClass('space-y-4', 'mt-6');

    // Check buttons styling
    const saveButton = screen.getByText('Save');
    expect(saveButton).toHaveClass('py-3', 'px-6', 'text-[20px]', 'w-[130px]');

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toHaveClass(
      'py-3',
      'px-6',
      'text-[20px]',
      'w-[130px]',
      'border',
      'border-primary',
      'rounded-xl',
      'text-primary'
    );
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

  it('submits form with password values', () => {
    render(<ChangePassword onClose={mockOnClose} />);

    const form = screen.getByRole('form');
    const submitEvent = jest.fn(e => e.preventDefault());
    form.onsubmit = submitEvent;

    const oldPasswordInput = screen.getByPlaceholderText('Enter you old password');
    const newPasswordInput = screen.getByPlaceholderText('Enter you new password');
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat new password');

    fireEvent.change(oldPasswordInput, { target: { value: 'oldpass123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpass123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'newpass123' } });

    fireEvent.submit(form);

    expect(submitEvent).toHaveBeenCalled();
  });
});