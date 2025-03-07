import { render, screen } from '@testing-library/react';
import MatchesProductHeader from '../MatchesProductHeader';
import { Avatar } from '../MatchesProductHeader';

// Mock BackButton component
jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: ({ buttonProps }: any) => (
    <button
      className={buttonProps?.className}
      data-testid="back-button"
    >
      Back
    </button>
  ),
}));

// Mock HeadingPrimary component
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <h1 className={className} data-testid="heading-primary">
      {children}
    </h1>
  ),
}));

describe('MatchesProductHeader', () => {
  it('renders without crashing', () => {
    render(<MatchesProductHeader />);
  });

  it('renders the back button with correct props', () => {
    render(<MatchesProductHeader />);

    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('mb-2');
  });

  it('renders the heading with correct text', () => {
    render(<MatchesProductHeader />);

    const heading = screen.getByTestId('heading-primary');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Your skin matches');
  });

  it('renders the heading with correct styling', () => {
    render(<MatchesProductHeader />);

    const heading = screen.getByTestId('heading-primary');
    expect(heading).toHaveClass('text-[28px]');
    expect(heading).toHaveClass('leading-[33.32px]');
    expect(heading).toHaveClass('lg:text-[42px]');
    expect(heading).toHaveClass('lg:leading-[49.98px]');
    expect(heading).toHaveClass('tracking-[-2%]');
    expect(heading).toHaveClass('font-semibold');
  });

  it('renders three avatar components', () => {
    render(<MatchesProductHeader />);

    const avatars = screen.getAllByText(/[A-Z]{2}/); // Match two uppercase letters (initials)
    expect(avatars).toHaveLength(3);
    expect(avatars[0]).toHaveTextContent('NF');
    expect(avatars[1]).toHaveTextContent('SA');
    expect(avatars[2]).toHaveTextContent('RK');
  });

  it('renders avatars with correct styling', () => {
    render(<MatchesProductHeader />);

    // The actual avatar elements are one level deeper than we initially selected
    const avatarNF = screen.getByText('NF').closest('div');
    const avatarSA = screen.getByText('SA').closest('div');
    const avatarRK = screen.getByText('RK').closest('div');

    // Check common classes
    expect(avatarNF).toHaveClass('rounded-full');
    expect(avatarNF).toHaveClass('flex');
    expect(avatarNF).toHaveClass('items-center');
    expect(avatarNF).toHaveClass('justify-center');
    expect(avatarNF).toHaveClass('text-white');

    // Check specific background colors
    expect(avatarNF).toHaveClass('bg-pink-400');
    expect(avatarSA).toHaveClass('bg-emerald-400');
    expect(avatarRK).toHaveClass('bg-purple-400');

    // Check border classes
    expect(avatarNF).toHaveClass('border-2');
    expect(avatarNF).toHaveClass('border-white');
  });

  it('renders the skin twins text', () => {
    render(<MatchesProductHeader />);

    const skinTwinsText = screen.getByText(/We also found/i);
    expect(skinTwinsText).toBeInTheDocument();

    const strongText = screen.getByText('2,354 skin twins');
    expect(strongText).toBeInTheDocument();
  });

  it('renders the skin twins text with correct styling', () => {
    render(<MatchesProductHeader />);

    const skinTwinsText = screen.getByText(/We also found/i);
    expect(skinTwinsText).toHaveClass('text-[15px]');
    expect(skinTwinsText).toHaveClass('lg:text-xl');
    expect(skinTwinsText).toHaveClass('leading-[17.85px]');
    expect(skinTwinsText).toHaveClass('lg:leading-[26px]');
    expect(skinTwinsText).toHaveClass('tracking-[-0.02em]');
    expect(skinTwinsText).toHaveClass('font-medium');
    expect(skinTwinsText).toHaveClass('text-accent');
  });

  it('renders the avatar component with correct props', () => {
    render(<MatchesProductHeader />);

    // Check first avatar's props
    const avatarNF = screen.getByText('NF').closest('div');
    expect(avatarNF).toHaveClass('h-[38px]');
    expect(avatarNF).toHaveClass('w-[38px]');
    expect(avatarNF).toHaveClass('bg-pink-400');
    expect(avatarNF).toHaveClass('border-2');
    expect(avatarNF).toHaveClass('border-white');

    // Check that the initials are displayed
    expect(screen.getByText('NF')).toBeInTheDocument();
  });

  it('renders the avatar container with correct styling', () => {
    render(<MatchesProductHeader />);

    // The container of all avatars - we need to select the div with class "-space-x-4"
    const avatarContainer = screen.getByText('NF')
      .closest('div')  // This is the avatar div
      ?.parentElement;  // This is the container with -space-x-4

    expect(avatarContainer).toHaveClass('flex');
    expect(avatarContainer).toHaveClass('-space-x-4');
  });

  it('renders avatar with default className when not provided', () => {
    render(<Avatar initials="AB" color="bg-blue-400" />);

    const avatarElement = screen.getByText('AB').closest('div');

    expect(avatarElement).toHaveClass('h-[38px]');
    expect(avatarElement).toHaveClass('w-[38px]');
    expect(avatarElement).toHaveClass('rounded-full');
    expect(avatarElement).toHaveClass('bg-blue-400');

    expect(avatarElement).not.toHaveClass('border-2');
    expect(avatarElement).not.toHaveClass('border-white');
  });
});