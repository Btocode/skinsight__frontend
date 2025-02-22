import { render, screen } from '@testing-library/react';
import SetNewPasswordForm from '../SetNewPasswordForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/services/authApi';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Create mock store
const createMockStore = () => configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

describe('SetNewPasswordForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  // Helper function to render with Redux Provider
  const renderWithProvider = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <SetNewPasswordForm />
      </Provider>
    );
  };

  // Test 1: Basic Rendering
  it('renders the form heading', () => {
    renderWithProvider();
    expect(screen.getByText('Set your new password')).toBeInTheDocument();
  });

  // Test 2: Input Fields
  it('renders password input fields', () => {
    renderWithProvider();
    expect(screen.getByPlaceholderText('Enter new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat new password')).toBeInTheDocument();
  });

  // Test 3: Submit Button
  it('renders submit button', () => {
    renderWithProvider();
    const submitButton = screen.getByText('Update Password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.closest('button')).toHaveClass('w-full bg-[#8599FE]');
  });

  // Test 4: Show/Hide Password Buttons
  it('renders show/hide password buttons', () => {
    renderWithProvider();
    const passwordToggleButtons = screen.getAllByLabelText('Show password');
    expect(passwordToggleButtons).toHaveLength(2);
  });
});
