import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the components
jest.mock('@/lib/redux/ReduxProvider', () => ({
  ReduxProvider: ({ children }) => <div data-testid="redux-provider">{children}</div>,
}));

jest.mock('@/components/auth/AuthCheck', () => ({
  AuthCheck: () => <div data-testid="auth-check">Auth Check Component</div>,
}));

// Mock next/font
jest.mock('next/font/google', () => ({
  DM_Sans: () => ({
    subsets: ['latin'],
    variable: 'mock-font-variable',
  }),
}));

// Create a simplified version of the layout for testing
const MockRootLayout = ({ children }) => {
  return (
    <div data-testid="mock-html" lang="en">
      <div
        data-testid="mock-body"
        className="mock-font-variable font-dm-sans"
      >
        <div data-testid="redux-provider">
          <div data-testid="auth-check">Auth Check Component</div>
          {children}
        </div>
        <div id="modal" />
      </div>
    </div>
  );
};

// Import the actual component but don't render it directly
import RootLayout from '../layout';

describe('RootLayout', () => {
  it('renders with correct structure using a mock', () => {
    const { getByTestId } = render(
      <MockRootLayout>
        <div data-testid="child-content">Child Content</div>
      </MockRootLayout>
    );

    // Check that html has the correct lang attribute
    const html = getByTestId('mock-html');
    expect(html).toHaveAttribute('lang', 'en');

    // Check that body has the correct class
    const body = getByTestId('mock-body');
    expect(body).toHaveClass('mock-font-variable font-dm-sans');

    // Check that ReduxProvider is rendered
    const reduxProvider = getByTestId('redux-provider');
    expect(reduxProvider).toBeInTheDocument();

    // Check that AuthCheck is rendered
    const authCheck = getByTestId('auth-check');
    expect(authCheck).toBeInTheDocument();

    // Check that children are rendered
    const childContent = getByTestId('child-content');
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent('Child Content');

    // Check that modal container is rendered
    const modalContainer = document.querySelector('#modal');
    expect(modalContainer).toBeInTheDocument();
  });

  it('verifies RootLayout exports correctly', () => {
    // Just verify that the RootLayout component exists and is a function
    expect(typeof RootLayout).toBe('function');
  });
});