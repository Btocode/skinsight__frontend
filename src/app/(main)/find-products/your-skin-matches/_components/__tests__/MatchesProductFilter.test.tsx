import { render, screen, fireEvent } from '@testing-library/react';
import MatchesProductFilter from '../MatchesProductFilter';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: string;
  className: string;
  icon: React.ReactNode;
  iconClassName: string;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  className: string;
  iconClassName: string;
  labelClassName: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentClassName: string;
  isCloseIconVisible: boolean;
  children: React.ReactNode;
}

// Mock the Button component
jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, variant, className, icon, iconClassName }: ButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-variant={variant}
    >
      {icon && <span className={iconClassName}>{icon}</span>}
      {children}
    </button>
  ),
}));

// Mock the Checkbox component
jest.mock('@/components/common/CheckBox', () => ({
  __esModule: true,
  default: ({ label, checked, onChange, className, iconClassName, labelClassName }: CheckboxProps) => (
    <div className={className} data-testid={`checkbox-${label}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={`checkbox-input-${label}`}
      />
      <span className={iconClassName}></span>
      <span className={labelClassName}>{label}</span>
    </div>
  ),
}));

// Mock the Modal component
jest.mock('@/components/common/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, contentClassName, isCloseIconVisible, children }: ModalProps) => (
    isOpen ? (
      <div data-testid="modal" className={contentClassName}>
        {!isCloseIconVisible ? null : (
          <button onClick={onClose} data-testid="modal-close">Close</button>
        )}
        {children}
      </div>
    ) : null
  ),
}));

describe('MatchesProductFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter button correctly', () => {
    render(<MatchesProductFilter />);

    const filterButton = screen.getByRole('button');
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute('data-variant', 'outline');
  });

  it('shows filter icon in the button', () => {
    render(<MatchesProductFilter />);

    const iconSpan = screen.getByRole('button').querySelector('span');
    expect(iconSpan).toBeInTheDocument();
    expect(iconSpan?.innerHTML).toContain('svg');
  });

  it('opens modal when filter button is clicked', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders sort section in the modal', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('renders filter section in the modal', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    const filterHeadings = screen.getAllByText('Filter');
    expect(filterHeadings[1]).toBeInTheDocument();
  });

  it('toggles sort section when clicked', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    const sortToggle = screen.getAllByRole('button')[1];

    expect(sortToggle).toHaveClass('rotate-180');

    fireEvent.click(sortToggle);

    expect(sortToggle).not.toHaveClass('rotate-180');
  });

  it('toggles filter section when clicked', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    const filterToggle = screen.getAllByRole('button')[2];

    expect(filterToggle).toHaveClass('rotate-180');

    fireEvent.click(filterToggle);

    expect(filterToggle).not.toHaveClass('rotate-180');
  });

  it('renders sort options correctly', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('checkbox-Perfect match')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Best rated')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Most popular')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Price (Low to High)')).toBeInTheDocument();
  });

  it('renders filter options correctly', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('checkbox-All')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Toners')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Treatments')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Moisturisers')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Other')).toBeInTheDocument();
  });

  it('handles sort option selection', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Best rated'));

    expect(screen.getByTestId('checkbox-input-Best rated')).toHaveProperty('checked', true);
  });

  it('handles filter option selection', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Toners'));

    expect(screen.getByTestId('checkbox-input-Toners')).toHaveProperty('checked', true);
  });

  it('handles child option selection', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Exact match'));

    expect(screen.getByTestId('checkbox-input-Exact match')).toHaveProperty('checked', true);

    expect(screen.getByTestId('checkbox-input-Perfect match')).toHaveProperty('checked', true);
  });

  it('handles parent option selection affecting children', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Perfect match'));

    fireEvent.click(screen.getByTestId('checkbox-input-Perfect match'));

    expect(screen.getByTestId('checkbox-input-Perfect match')).toHaveProperty('checked', true);

    expect(screen.getByTestId('checkbox-input-Exact match')).toHaveProperty('checked', true);
    expect(screen.getByTestId('checkbox-input-Close match')).toHaveProperty('checked', true);
  });

  it('handles clear button click', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Best rated'));
    fireEvent.click(screen.getByTestId('checkbox-input-Toners'));

    fireEvent.click(screen.getByText('Clear'));

    expect(screen.getByTestId('checkbox-input-Best rated')).toHaveProperty('checked', false);
    expect(screen.getByTestId('checkbox-input-Toners')).toHaveProperty('checked', false);
  });

  it('handles apply button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('checkbox-input-Best rated'));
    fireEvent.click(screen.getByTestId('checkbox-input-Toners'));

    fireEvent.click(screen.getByText('Apply'));

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('renders action buttons', () => {
    render(<MatchesProductFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});