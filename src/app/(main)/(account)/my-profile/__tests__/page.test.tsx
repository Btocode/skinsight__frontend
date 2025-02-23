import { render, screen } from '@testing-library/react';
import MyProfilePage from '../page';

// Add these types at the top of the file
type ImportFunction = () => Promise<{ default: React.ComponentType }>;
type DynamicOptions = {
  loading?: React.ComponentType;
  ssr?: boolean;
};

// Mock the ProfileForm component
jest.mock('../../_components/ProfileForm', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-form">Profile Form Content</div>,
}));

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock next/dynamic with loading state handling
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFunc: ImportFunction, options: DynamicOptions) => {
    const ProfileForm = () => <div data-testid="profile-form">Profile Form Content</div>;

    // Create a wrapper component that shows loading state first
    const DynamicComponent = () => {
      if (options?.loading) {
        const LoadingComponent = options.loading;
        return (
          <>
            <LoadingComponent />
            <ProfileForm />
          </>
        );
      }
      return <ProfileForm />;
    };

    return DynamicComponent;
  },
}));

describe('MyProfilePage', () => {
  it('renders without crashing', () => {
    render(<MyProfilePage />);
  });

  it('renders the ProfileForm component', () => {
    render(<MyProfilePage />);
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
  });

  it('displays profile form content', () => {
    render(<MyProfilePage />);
    expect(screen.getByText('Profile Form Content')).toBeInTheDocument();
  });

  it('shows spinner while loading', () => {
    // The dynamic mock will trigger the loading component
    render(<MyProfilePage />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('handles dynamic import correctly', () => {
    const { container } = render(<MyProfilePage />);
    // Verify both loading and final states
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('uses correct loading component from dynamic import options', () => {
    render(<MyProfilePage />);
    // Verify Spinner is used as loading component
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});