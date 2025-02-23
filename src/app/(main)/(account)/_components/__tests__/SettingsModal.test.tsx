import { render, screen, fireEvent } from '@testing-library/react';
import SettingsModal from '../SettingsModal';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

// Mock the sub-components
jest.mock('../MarketingPreference', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => <div data-testid="marketing-preference">Marketing Preference <button onClick={onClose}>Close</button></div>
}));

jest.mock('../ChangePassword', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => <div data-testid="change-password">Change Password <button onClick={onClose}>Close</button></div>
}));

jest.mock('../DownloadData', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => <div data-testid="download-data">Download Data <button onClick={onClose}>Close</button></div>
}));

jest.mock('../DeleteAccount', () => ({
  __esModule: true,
  default: ({ onClose, setState }: { onClose: () => void, setState: (state: string) => void }) => (
    <div data-testid="delete-account">Delete Account
      <button onClick={onClose}>Close</button>
      <button onClick={() => setState('delete-success')}>Confirm Delete</button>
    </div>
  )
}));

jest.mock('../AccountDeleteSuccess', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => <div data-testid="account-delete-success">Delete Success <button onClick={onClose}>Close</button></div>
}));

describe('SettingsModal', () => {
  beforeEach(() => {
    // Reset any mocked functions before each test
    jest.clearAllMocks();
  });

  it('renders settings button initially', () => {
    render(<SettingsModal />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();
    expect(settingsButton).toHaveClass('absolute', 'right-8', 'top-8');
  });

  it('opens modal when settings button is clicked', () => {
    render(<SettingsModal />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(settingsButton);

    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('renders all setting options in the main view', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));

    expect(screen.getByText('Change my marketing preferences')).toBeInTheDocument();
    expect(screen.getByText('Change my password')).toBeInTheDocument();
    expect(screen.getByText('Download my data')).toBeInTheDocument();
    expect(screen.getByText('Delete my account')).toBeInTheDocument();
  });

  it('shows marketing preferences when clicked', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Change my marketing preferences'));

    expect(screen.getByTestId('marketing-preference')).toBeInTheDocument();
  });

  it('shows change password when clicked', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Change my password'));

    expect(screen.getByTestId('change-password')).toBeInTheDocument();
  });

  it('shows download data when clicked', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Download my data'));

    expect(screen.getByTestId('download-data')).toBeInTheDocument();
  });

  it('shows delete account when clicked', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Delete my account'));

    expect(screen.getByTestId('delete-account')).toBeInTheDocument();
  });

  it('shows delete success screen after confirming deletion', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Delete my account'));
    fireEvent.click(screen.getByText('Confirm Delete'));

    expect(screen.getByTestId('account-delete-success')).toBeInTheDocument();
  });


  it('returns to main view when back is clicked in sub-views', () => {
    render(<SettingsModal />);

    // Open modal and navigate to marketing preferences
    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Change my marketing preferences'));

    // Click close in the sub-view
    fireEvent.click(screen.getByText('Close'));

    // Should show main view again
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('applies correct styling to the modal content', () => {
    render(<SettingsModal />);

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));

    const modalContent = screen.getByText('Account Settings').closest('div');
    expect(modalContent).toHaveClass('w-[380px]', 'lg:w-[550px]');
  });
});