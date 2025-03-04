import React from 'react';
import { render, screen } from '@testing-library/react';
import MyProfilePage from '../page';

// Mock the ProfileForm component
jest.mock('../../_components/ProfileForm', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-form">Profile Form</div>,
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock next/dynamic to return the ProfileForm component directly
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: jest.fn((importFunc, options) => {
    return () => <div data-testid="dynamic-component">Dynamic Component</div>;
  }),
}));

describe('MyProfilePage Component', () => {
  /**
   * Test 1: Verify that the component renders without crashing
   */
  it('renders without crashing', () => {
    render(<MyProfilePage />);
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders a dynamic component
   */
  it('renders a dynamic component', () => {
    render(<MyProfilePage />);
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument();
  });
});