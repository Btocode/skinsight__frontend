import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SkinRegimenTabs from '../SkinRegimenTabs';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SkinRegimenTabs Component', () => {
  // Setup common mocks before each test
  const mockPush = jest.fn();
  const mockGet = jest.fn();
  const mockSearchParams = {
    get: mockGet,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  /**
   * Test 1: Verify that the component renders the tabs
   *
   * This test ensures that:
   * - The component renders the Morning routine and Evening routine tabs
   */
  it('renders the tabs', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockReturnValue(null);

    render(<SkinRegimenTabs />);

    // Check if the tabs are rendered
    expect(screen.getByText('Morning routine')).toBeInTheDocument();
    expect(screen.getByText('Evening routine')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component sets the active tab based on the URL
   *
   * This test ensures that:
   * - The component sets the active tab based on the tab query parameter in the URL
   */
  it('sets the active tab based on the URL', () => {
    // Mock the useSearchParams to return 'evening-routine' for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return 'evening-routine';
      return null;
    });

    render(<SkinRegimenTabs />);

    // Get the tabs
    const morningTab = screen.getByText('Morning routine').closest('li');
    const eveningTab = screen.getByText('Evening routine').closest('li');

    // Check if the Evening routine tab has the active indicator
    const eveningIndicator = eveningTab?.querySelector('span');
    expect(eveningIndicator).toBeInTheDocument();

    // Check if the Morning routine tab doesn't have the active indicator
    const morningIndicator = morningTab?.querySelector('span');
    expect(morningIndicator).not.toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component sets the default active tab when no tab is specified in the URL
   *
   * This test ensures that:
   * - The component sets the Morning routine tab as active when no tab is specified in the URL
   */
  it('sets the default active tab when no tab is specified in the URL', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return null;
      return null;
    });

    render(<SkinRegimenTabs />);

    // Get the tabs
    const morningTab = screen.getByText('Morning routine').closest('li');
    const eveningTab = screen.getByText('Evening routine').closest('li');

    // Check if the Morning routine tab has the active indicator
    const morningIndicator = morningTab?.querySelector('span');
    expect(morningIndicator).toBeInTheDocument();

    // Check if the Evening routine tab doesn't have the active indicator
    const eveningIndicator = eveningTab?.querySelector('span');
    expect(eveningIndicator).not.toBeInTheDocument();
  });

  /**
   * Test 4: Verify that clicking a tab updates the URL and changes the active tab
   *
   * This test ensures that:
   * - Clicking a tab updates the URL with the correct tab query parameter
   */
  it('updates the URL when a tab is clicked', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return null;
      return null;
    });

    render(<SkinRegimenTabs />);

    // Click the Evening routine tab
    fireEvent.click(screen.getByText('Evening routine'));

    // Check if the router.push method was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/build-regimen/your-new-skin-regimen?tab=evening-routine', { scroll: false });
  });

  /**
   * Test 5: Verify that the component renders the active tab indicator
   *
   * This test ensures that:
   * - The component renders the active tab indicator for the active tab
   */
  it('renders the active tab indicator for the active tab', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return null;
      return null;
    });

    render(<SkinRegimenTabs />);

    // Get the tabs
    const morningTab = screen.getByText('Morning routine').closest('li');
    const eveningTab = screen.getByText('Evening routine').closest('li');

    // Check if the Morning routine tab has the active indicator
    const activeIndicator = morningTab?.querySelector('span.absolute.bottom-0.left-0.right-0.h-0\\.5.bg-primary');
    expect(activeIndicator).toBeInTheDocument();

    // Check if the Evening routine tab doesn't have the active indicator
    const inactiveIndicator = eveningTab?.querySelector('span');
    expect(inactiveIndicator).not.toBeInTheDocument();
  });


  /**
   * Test 7: Verify that the component renders the tabs with the correct ARIA attributes
   *
   * This test ensures that:
   * - The component renders the tabs with the correct ARIA attributes for accessibility
   */
  it('renders the tabs with the correct ARIA attributes', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return null;
      return null;
    });

    render(<SkinRegimenTabs />);

    // Check if the tabs list has the correct ARIA label
    const tabsList = screen.getByRole('list');
    expect(tabsList).toHaveAttribute('aria-label', 'Tabs');
  });

  /**
   * Test 8: Verify that the component renders the tabs with the correct styling
   *
   * This test ensures that:
   * - The component renders the tabs with the correct styling
   */
  it('renders the tabs with the correct styling', () => {
    // Mock the useSearchParams to return null for the tab query parameter
    mockGet.mockImplementation((param) => {
      if (param === 'tab') return null;
      return null;
    });

    render(<SkinRegimenTabs />);

    // Check if the tabs container has the correct classes
    const tabsContainer = screen.getByRole('list').parentElement;
    expect(tabsContainer).toHaveClass('max-w-md');
    expect(tabsContainer).toHaveClass('mx-auto');
    expect(tabsContainer).toHaveClass('w-full');
    expect(tabsContainer).toHaveClass('border-b');
    expect(tabsContainer).toHaveClass('mt-6');
    expect(tabsContainer).toHaveClass('mb-[64px]');
    expect(tabsContainer).toHaveClass('overflow-auto');
  });
});