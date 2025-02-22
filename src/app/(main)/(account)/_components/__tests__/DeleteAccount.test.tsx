import { render, screen, fireEvent } from '@testing-library/react';
import DeleteAccount from '../DeleteAccount';

describe('DeleteAccount', () => {
  const mockOnClose = jest.fn();
  const mockSetState = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders the delete account component correctly', () => {
    render(<DeleteAccount onClose={mockOnClose} setState={mockSetState} />);

    // Check for main elements
    expect(screen.getByText('Delete my account')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete your account\?/)).toBeInTheDocument();
    expect(screen.getByText('Yes, delete')).toBeInTheDocument();
    expect(screen.getByText('No, cancel')).toBeInTheDocument();
  });

  // it('calls onClose when back button is clicked', () => {
  //   render(<DeleteAccount onClose={mockOnClose} setState={mockSetState} />);

  //   const backButton = screen.getByRole('button', { name: /back/i });
  //   fireEvent.click(backButton);

  //   expect(mockOnClose).toHaveBeenCalledTimes(1);
  // });

  it('calls setState with "delete-success" when Yes button is clicked', () => {
    render(<DeleteAccount onClose={mockOnClose} setState={mockSetState} />);

    const deleteButton = screen.getByText('Yes, delete');
    fireEvent.click(deleteButton);

    expect(mockSetState).toHaveBeenCalledWith('delete-success');
  });

  // it('calls onClose when No button is clicked', () => {
  //   render(<DeleteAccount onClose={mockOnClose} setState={mockSetState} />);

  //   const cancelButton = screen.getByText('No, cancel');
  //   fireEvent.click(cancelButton);

  //   expect(mockOnClose).toHaveBeenCalledTimes(1);
  // });

  it('renders with correct styling classes', () => {
    render(<DeleteAccount onClose={mockOnClose} setState={mockSetState} />);

    // Check container width classes
    const container = screen.getByText('Delete my account').closest('div');
    expect(container).toHaveClass('w-[380px]', 'lg:w-[550px]');

    // Check button styling
    const deleteButton = screen.getByText('Yes, delete');
    expect(deleteButton).toHaveClass('py-3', 'px-6', 'text-[20px]');

    const cancelButton = screen.getByText('No, cancel');
    expect(cancelButton).toHaveClass(
      'py-3',
      'px-6',
      'text-[20px]',
      'w-[150px]',
      'border',
      'border-primary',
      'rounded-xl',
      'text-primary'
    );
  });
});