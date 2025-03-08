import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../BackButton';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Button component
jest.mock('../Button', () => {
  return {
    __esModule: true,
    default: ({ children, onClick, icon, className, variant }: any) => (
      <button
        onClick={onClick}
        className={className}
        data-variant={variant}
        data-testid="button-component"
      >
        {icon && <span data-testid="button-icon">{icon}</span>}
        {children}
      </button>
    ),
  };
});

describe('BackButton', () => {
  // Setup common mocks
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it('renders with correct text and icon', () => {
    render(<BackButton />);

    // Check if "Back" text is rendered
    expect(screen.getByText('Back')).toBeInTheDocument();

    // Check if icon is rendered
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  it('calls router.back() when clicked without custom onClick', () => {
    render(<BackButton />);

    // Click the button
    fireEvent.click(screen.getByTestId('button-component'));

    // Check if router.back was called
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('calls custom onClick when provided', () => {
    const customOnClick = jest.fn();
    render(<BackButton onClick={customOnClick} />);

    // Click the button
    fireEvent.click(screen.getByTestId('button-component'));

    // Check if custom onClick was called
    expect(customOnClick).toHaveBeenCalledTimes(1);

    // Check that router.back was not called
    expect(mockBack).not.toHaveBeenCalled();
  });

  it('passes buttonProps to Button component', () => {
    render(
      <BackButton
        buttonProps={{
          'aria-label': 'Go back',
          disabled: true,
          className: 'custom-class'
        }}
      />
    );

    const button = screen.getByTestId('button-component');

    // Check if className was merged correctly
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('w-[94px]');
    expect(button).toHaveClass('h-[28px]');
  });

  it('passes svgProps to svg element', () => {
    render(
      <BackButton
        svgProps={{
          className: 'custom-svg-class',
          'data-testid': 'custom-svg'
        }}
      />
    );

    // Check if svg props were passed
    const svg = screen.getByTestId('custom-svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('custom-svg-class');
  });

  it('uses "back" variant for Button component', () => {
    render(<BackButton />);

    // Check if button has correct variant
    expect(screen.getByTestId('button-component')).toHaveAttribute('data-variant', 'back');
  });

  it('applies default styling', () => {
    render(<BackButton />);

    const button = screen.getByTestId('button-component');

    // Check default classes
    expect(button).toHaveClass('w-[94px]');
    expect(button).toHaveClass('h-[28px]');
    expect(button).toHaveClass('p-0');
    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('font-medium');
    expect(button).toHaveClass('text-accent');
  });
});