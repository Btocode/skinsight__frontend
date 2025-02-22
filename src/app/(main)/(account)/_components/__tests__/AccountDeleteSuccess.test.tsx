import { render, screen, fireEvent } from '@testing-library/react';
import AccountDeleteSuccess from '../AccountDeleteSuccess';
import '@testing-library/jest-dom';

describe('AccountDeleteSuccess', () => {
  // Mock onClose function
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Clear mock calls before each test
    mockOnClose.mockClear();
  });

  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);
  });

  // Test 2: Check heading and message
  // it('renders correct heading and message', () => {
  //   render(<AccountDeleteSuccess onClose={mockOnClose} />);

  //   expect(screen.getByText('You have deleted your account')).toBeInTheDocument();
  //   expect(screen.getByText(/We're sad to see you go!/)).toBeInTheDocument();
  // });

  // Test 3: Check email link
  it('renders email link correctly', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const emailLink = screen.getByText('help@skinsight.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:help@skinsight.com');
    expect(emailLink).toHaveClass('font-semibold', 'text-primary');
  });

  // Test 4: Check back button
  // it('renders back button with correct styling', () => {
  //   render(<AccountDeleteSuccess onClose={mockOnClose} />);

  //   const backButton = screen.getByRole('button', { name: /back/i });
  //   expect(backButton).toBeInTheDocument();
  //   expect(backButton).toHaveClass('variant-back');
  // });

  // Test 5: Check onClose functionality
  it('calls onClose when back button is clicked', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test 6: Check goodbye button
  it('renders goodbye button', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const goodbyeButton = screen.getByText('This is goodby');
    expect(goodbyeButton).toBeInTheDocument();
  });

  // Test 7: Check container styling
  it('has correct container styling', () => {
    const { container } = render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('w-[380px]', 'lg:w-[550px]');
  });

  // Test 8: Check responsive layout
  it('has correct responsive classes', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const heading = screen.getByText('You have deleted your account');
    expect(heading).toHaveClass(
      'text-base',
      'lg:text-xl',
      'font-semibold',
      'leading-[36px]',
      'tracking-[-0.02em]',
      'text-[#111111]'
    );
  });

  // Test 9: Check divider line
  it('renders divider line', () => {
    render(<AccountDeleteSuccess onClose={mockOnClose} />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('w-full', 'h-px', 'my-5', 'bg-[#EFEFEF]');
  });
});