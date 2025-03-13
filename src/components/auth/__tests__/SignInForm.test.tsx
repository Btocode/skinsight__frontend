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
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img
      src={props.src as string}
      alt={props.alt as string || ''}
      className={props.className}
    />;
  }
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