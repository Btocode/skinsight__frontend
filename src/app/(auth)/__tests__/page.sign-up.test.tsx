import { render, screen } from '@testing-library/react';
import SignUpPage from '../sign-up/page';
import { metadata } from '../sign-up/page';

// Mock the dynamic import of SignUpForm
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const MockSignUpForm = () => <div data-testid="sign-up-form">Mock Sign Up Form</div>;
    return MockSignUpForm;
  },
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('SignUpPage', () => {
  it('renders the sign up page', () => {
    render(<SignUpPage />);
    expect(screen.getByTestId('sign-up-page')).toBeInTheDocument();
  });

  it('renders the sign up form', () => {
    render(<SignUpPage />);
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Sign Up',
      description: 'Sign up to create an account',
    });
  });
});