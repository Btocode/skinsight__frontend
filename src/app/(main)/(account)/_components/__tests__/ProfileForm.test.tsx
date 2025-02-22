import { render, screen } from '@testing-library/react';
import ProfileForm from '../ProfileForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Create mock store with auth state
const createMockStore = () => configureStore({
  reducer: {
    auth: (state = {
      user: {
        display_name: 'Test User',
        email: 'test@example.com',
        country: 'United States'
      }
    }) => state
  }
});

describe('ProfileForm', () => {
  // Helper function to render with Redux Provider
  const renderWithProvider = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );
  };

  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    renderWithProvider();
  });

  // Test 2: Check for heading
  it('renders the profile info heading', () => {
    renderWithProvider();
    expect(screen.getByText('Profile info')).toBeInTheDocument();
  });

  // Test 3: Check for input fields
  it('renders all input fields', () => {
    renderWithProvider();
    expect(screen.getByPlaceholderText('Display Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
  });

  // Test 4: Check default values from Redux state
  it('displays user data from Redux state', () => {
    renderWithProvider();
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('United States')).toBeInTheDocument();
  });

  // Test 5: Check if email field is disabled
  it('has disabled email input', () => {
    renderWithProvider();
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeDisabled();
    expect(emailInput).toHaveClass('cursor-not-allowed', 'opacity-70');
  });

  // Test 6: Check for save button
  it('renders save button', () => {
    renderWithProvider();
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveClass('btn-primary');
  });

  // Test 7: Check form classes for responsive design
  it('has correct responsive classes', () => {
    const { container } = renderWithProvider();
    const form = container.querySelector('form');
    expect(form).toHaveClass('max-w-xl', 'space-y-8');

    const inputContainers = container.querySelectorAll('.w-full.lg\\:w-\\[70\\%\\]');
    expect(inputContainers).toHaveLength(3);
  });
});