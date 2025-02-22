import { render, screen } from '@testing-library/react';
import AccountTabs from '../AccountTabs';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('AccountTabs', () => {
  // Test 1: Basic Rendering
  it('renders without crashing', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);
  });

  // Test 2: Check all tabs are rendered
  it('renders all tab links', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    expect(screen.getByText('My profile')).toBeInTheDocument();
    expect(screen.getByText('Saved items')).toBeInTheDocument();
    expect(screen.getByText('My reviews')).toBeInTheDocument();
    expect(screen.getByText('My regimen')).toBeInTheDocument();
  });

  // Test 3: Check active tab styling
  it('applies correct styling to active tab', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    const activeTab = screen.getByText('My profile').closest('a');
    expect(activeTab).toHaveClass('text-gray-900', 'font-semibold');
  });

  // Test 4: Check inactive tab styling
  it('applies correct styling to inactive tabs', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    const inactiveTab = screen.getByText('Saved items').closest('a');
    expect(inactiveTab).toHaveClass('text-gray-500');
  });

  // Test 5: Check navigation links
  it('has correct href attributes', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    expect(screen.getByText('My profile').closest('a')).toHaveAttribute('href', '/my-profile');
    expect(screen.getByText('Saved items').closest('a')).toHaveAttribute('href', '/saved-items');
    expect(screen.getByText('My reviews').closest('a')).toHaveAttribute('href', '/my-reviews');
    expect(screen.getByText('My regimen').closest('a')).toHaveAttribute('href', '/my-regimen');
  });

  // Test 6: Check container styling
  it('has correct container styling', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    const { container } = render(<AccountTabs />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('w-full', 'border-b', 'mb-12', 'overflow-auto');
  });

  // Test 7: Check nav styling
  it('has correct nav styling', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'justify-evenly', 'space-x-4', 'lg:space-x-8');
    expect(nav).toHaveAttribute('aria-label', 'Tabs');
  });

  // Test 8: Check active indicator
  it('shows active indicator for current tab', () => {
    (usePathname as jest.Mock).mockReturnValue('/my-profile');
    render(<AccountTabs />);

    const activeTab = screen.getByText('My profile').closest('a');
    const indicator = activeTab?.querySelector('.absolute.bottom-0');
    expect(indicator).toHaveClass('bg-primary');
  });
});