import { render, screen } from '@testing-library/react';
import SignInPage from '../sign-in/page';
import { metadata } from '../sign-in/page';

// Mock the dynamic import of SignInForm
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const MockSignInForm = () => <div data-testid="sign-in-form">Mock Sign In Form</div>;
    return MockSignInForm;
  },
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('SignInPage', () => {
  it('renders the sign in page', () => {
    render(<SignInPage />);
    expect(screen.getByTestId('sign-in-page')).toBeInTheDocument();
  });

  it('renders the sign in form', () => {
    render(<SignInPage />);
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Sign In',
      description: 'Sign in to your account',
    });
  });
});
