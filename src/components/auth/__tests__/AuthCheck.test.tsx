import React from 'react';
import { render } from '@testing-library/react';
import { AuthCheck } from '@/components/auth/AuthCheck';
import { useCheckAuthQuery } from '@/lib/services/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

// Mock the dependencies
jest.mock('@/lib/services/authApi', () => ({
  useCheckAuthQuery: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock the action creator to return an action object
jest.mock('@/redux/slices/authSlice', () => ({
  setCredentials: jest.fn().mockImplementation((payload) => ({
    type: 'auth/setCredentials',
    payload
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthCheck', () => {
  // Setup common mocks
  const mockDispatch = jest.fn();
  const mockRouter = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders nothing to the DOM', () => {
    // Mock the query to return empty data
    (useCheckAuthQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
    });

    const { container } = render(<AuthCheck />);
    expect(container.firstChild).toBeNull();
  });

  it('dispatches setCredentials when data is available', () => {
    // Mock user data
    const mockUserData = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };

    // Mock the query to return user data
    (useCheckAuthQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      error: null,
    });

    render(<AuthCheck />);

    // Check if setCredentials was called with the correct data
    expect(setCredentials).toHaveBeenCalledWith({ user: mockUserData });

    // Check if dispatch was called with the action object
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/setCredentials',
      payload: { user: mockUserData }
    });
  });

  it('does not dispatch when no data and no error', () => {
    // Mock the query to return empty data and no error
    (useCheckAuthQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
    });

    render(<AuthCheck />);

    // Dispatch should not be called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('handles error case correctly', () => {
    // Mock an error response
    const mockError = {
      status: 401,
      data: { message: 'Unauthorized' },
    };

    // Mock the query to return an error
    (useCheckAuthQuery as jest.Mock).mockReturnValue({
      data: null,
      error: mockError,
    });

    render(<AuthCheck />);

    // Currently the error handling is commented out in the component
    // so we expect no actions to be dispatched
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  it('configures the query with correct options', () => {
    // Mock the query to return empty data
    (useCheckAuthQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
    });

    render(<AuthCheck />);

    // Check if useCheckAuthQuery was called with the correct options
    expect(useCheckAuthQuery).toHaveBeenCalledWith(undefined, {
      pollingInterval: 5 * 60 * 1000, // 5 minutes
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });
  });
});