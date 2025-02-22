import { render, screen } from '@testing-library/react';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/services/authApi';
import '@testing-library/jest-dom';

// Create mock store
const createMockStore = () => configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

describe('ForgotPasswordForm', () => {
  // Helper function to render with Redux Provider
  const renderWithProvider = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );
  };

  // Test 1: Basic Rendering - Just check if the component renders
  it('renders without crashing', () => {
    renderWithProvider();
  });

  // Test 2: Check for heading
  // it('renders the heading', () => {
  //   renderWithProvider();
  //   expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  // });

  // Test 3: Check for email input
  it('renders email input field', () => {
    renderWithProvider();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();

  });
});
