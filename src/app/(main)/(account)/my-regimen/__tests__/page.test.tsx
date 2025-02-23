import { render, screen } from '@testing-library/react';
import MyRegimenPage from '../page';

// Remove unused types
// Mock the RegimenCard component
jest.mock('../../_components/RegimenCard', () => ({
  __esModule: true,
  default: () => <div data-testid="regimen-card">Regimen Card Content</div>,
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock next/dynamic
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => (
      <>
        <div data-testid="spinner">Loading...</div>
        <div data-testid="regimen-card">Regimen Card Content</div>
      </>
    );
    return DynamicComponent;
  },
}));

describe('MyRegimenPage', () => {
  it('renders without crashing', () => {
    render(<MyRegimenPage />);
  });

  it('renders the RegimenCard component', () => {
    render(<MyRegimenPage />);
    expect(screen.getByTestId('regimen-card')).toBeInTheDocument();
  });

  it('displays regimen card content', () => {
    render(<MyRegimenPage />);
    expect(screen.getByText('Regimen Card Content')).toBeInTheDocument();
  });


});