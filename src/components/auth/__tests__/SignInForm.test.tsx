import { render, screen } from '@testing-library/react';
import SignInForm from '../SignInForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/services/authApi';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Create mock store
const createMockStore = () => configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

describe('SignInForm', () => {
  // Helper function to render with Redux Provider
  const renderWithProvider = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
  };

  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    renderWithProvider();
  });

  // Test 2: Check for main heading
  it('renders the main heading', () => {
    renderWithProvider();
    expect(screen.getByText('Log into your account')).toBeInTheDocument();
  });

  // Test 3: Check for input fields
  it('renders email and password inputs', () => {
    renderWithProvider();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  // Test 4: Check for social login buttons
  it('renders social login buttons', () => {
    renderWithProvider();
    expect(screen.getByAltText('Google')).toBeInTheDocument();
    expect(screen.getByAltText('Facebook')).toBeInTheDocument();
    expect(screen.getByAltText('Apple')).toBeInTheDocument();
  });

  // Test 5: Check for sign up link
  it('renders sign up link', () => {
    renderWithProvider();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

/*
Future test cases to implement:

1. Form Validation Tests:
- Test email validation
- Test password validation
- Test empty form submission

2. Social Login Tests:
- Test Google login click handler
- Test Facebook login click handler
- Test Apple login click handler

3. Authentication Flow Tests:
- Test successful login
- Test failed login
- Test error messages display
- Test loading state

4. Navigation Tests:
- Test sign up link navigation
- Test forgot password link navigation
- Test successful login navigation

5. UI State Tests:
- Test loading button state
- Test disabled states
- Test error message displays
- Test success message displays

6. Input Interaction Tests:
- Test password visibility toggle
- Test input focus states
- Test form reset

7. API Integration Tests:
- Test login API call
- Test API error handling
- Test API success handling
*/
