import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectRegion from '../SelectRegion';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hook';
import { setCookie } from 'cookies-next/client';
import { allCountries } from 'country-region-data';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppSelector: jest.fn(),
}));

// Mock the cookies-next/client module
jest.mock('cookies-next/client', () => ({
  setCookie: jest.fn(),
}));

// Mock the country-region-data module
jest.mock('country-region-data', () => ({
  allCountries: [
    ['United States', 'US', [['California', 'CA'], ['New York', 'NY']]],
    ['Canada', 'CA', [['Ontario', 'ON'], ['Quebec', 'QC']]],
  ],
}));

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder: string;
  value?: ComboboxOption;
  onChange: (option: ComboboxOption) => void;
}

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

// Mock the Combobox component
jest.mock('@/components/common/Combobox', () => {
  return {
    __esModule: true,
    Combobox: ({ options, placeholder, value, onChange }: ComboboxProps) => (
      <div data-testid="combobox" data-placeholder={placeholder}>
        <select
          data-testid={`combobox-select-${placeholder}`}
          value={value?.value || ''}
          onChange={(e) => {
            const selectedOption = options.find((opt) => opt.value === e.target.value);
            onChange(selectedOption!);
          }}
        >
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    ),
    Option: ({ value, label }: ComboboxOption) => ({ value, label }),
  };
});

// Mock the Button component
jest.mock('@/components/common/Button', () => {
  return {
    __esModule: true,
    default: ({ children, className, disabled, onClick, variant }: ButtonProps) => (
      <button
        data-testid="button"
        className={className}
        disabled={disabled}
        onClick={onClick}
        data-variant={variant}
      >
        {children}
      </button>
    ),
  };
});

// Mock console.log to prevent it from cluttering the test output
console.log = jest.fn();

describe('SelectRegion Component', () => {
  // Setup mock router and selector
  const mockPush = jest.fn();
  const mockUserSkinProfile = {
    gender: 'Male',
    skinType: 'Dry',
    complexion: 'Fair',
    skinConcern: ['Acne', 'Wrinkles'],
    age: '25-34',
    region: { country: '', city: '' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAppSelector as jest.Mock).mockReturnValue(mockUserSkinProfile);
  });

  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('flex-col');
    expect(container.firstChild).toHaveClass('mt-[32px]');
    expect(container.firstChild).toHaveClass('lg:mt-0');
    expect(container.firstChild).toHaveClass('gap-5');
    expect(container.firstChild).toHaveClass('text-[#2C2C2C]');
  });

  /**
   * Test 2: Verify that the component renders the country combobox with formatted countries
   */
  it('renders the country combobox with formatted countries', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Check if the country combobox is rendered
    const comboboxes = screen.getAllByTestId('combobox');
    expect(comboboxes.length).toBe(1);

    // Check if the options include the formatted countries
    const countrySelect = screen.getByTestId('combobox-select-Select');
    expect(countrySelect).toBeInTheDocument();

    // Check if the options include the countries from the mock
    const options = Array.from(countrySelect.querySelectorAll('option'));
    expect(options.length).toBe(3); // Select + 2 countries
    expect(options[1].value).toBe('United States');
    expect(options[2].value).toBe('Canada');
  });


  /**
   * Test 4: Verify that the component does not render the region combobox when no country is selected
   */
  it('does not render the region combobox when no country is selected', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Check if only one combobox is rendered
    const comboboxes = screen.getAllByTestId('combobox');
    expect(comboboxes.length).toBe(1);
  });

  /**
   * Test 5: Verify that the component calls onChange with the correct value when a country is selected
   */
  it('calls onChange with the correct value when a country is selected', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Select a country
    const countrySelect = screen.getByTestId('combobox-select-Select');
    fireEvent.change(countrySelect, { target: { value: 'United States' } });

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('region', { country: 'United States', city: '' });
  });

  /**
   * Test 6: Verify that the component calls onChange with the correct value when a region is selected
   */
  it('calls onChange with the correct value when a region is selected', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: '' }} onChange={mockOnChange} />);

    // Select a region
    const regionSelect = screen.getAllByTestId('combobox-select-Select')[1];
    fireEvent.change(regionSelect, { target: { value: 'California' } });

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('region', { country: 'United States', city: 'California' });
  });

  /**
   * Test 7: Verify that the Next button is disabled when no country or region is selected
   */
  it('disables the Next button when no country or region is selected', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Check if the Next button is disabled
    const buttons = screen.getAllByTestId('button');
    const nextButton = buttons.find(button => button.textContent === 'Next');
    expect(nextButton).toBeDisabled();
  });

  /**
   * Test 8: Verify that the Next button is enabled when both country and region are selected
   */
  it('enables the Next button when both country and region are selected', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: 'California' }} onChange={mockOnChange} />);

    // Check if the Next button is enabled
    const buttons = screen.getAllByTestId('button');
    const nextButton = buttons.find(button => button.textContent === 'Next');
    expect(nextButton).not.toBeDisabled();
  });

  /**
   * Test 9: Verify that the component navigates to the correct page when the Next button is clicked
   */
  it('navigates to the correct page when the Next button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: 'California' }} onChange={mockOnChange} />);

    // Click the Next button
    const buttons = screen.getAllByTestId('button');
    const nextButton = buttons.find(button => button.textContent === 'Next');
    fireEvent.click(nextButton!);

    // Check if the cookie is set and the router.push is called
    expect(setCookie).toHaveBeenCalledWith('recommendation', JSON.stringify(mockUserSkinProfile));
    expect(mockPush).toHaveBeenCalledWith('/find-products/find-perfect-match');
  });

  /**
   * Test 10: Verify that the component navigates to the correct page when the Skip button is clicked
   */
  it('navigates to the correct page when the Skip button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Click the Skip button
    const buttons = screen.getAllByTestId('button');
    const skipButton = buttons.find(button => button.textContent === 'Skip');
    fireEvent.click(skipButton!);

    // Check if onChange is called with empty values and the router.push is called
    expect(mockOnChange).toHaveBeenCalledWith('region', { country: '', city: '' });
    expect(mockPush).toHaveBeenCalledWith('/find-products/find-perfect-match');
  });

  /**
   * Test 11: Verify that the formatCountries function returns the correct format
   */
  it('formats countries correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: '', city: '' }} onChange={mockOnChange} />);

    // Check if the country combobox has options in the correct format
    const countrySelect = screen.getByTestId('combobox-select-Select');
    const options = Array.from(countrySelect.querySelectorAll('option'));

    // Skip the first option (Select)
    for (let i = 1; i < options.length; i++) {
      const countryName = allCountries[i-1][0];
      expect(options[i].value).toBe(countryName);
      expect(options[i].textContent).toBe(countryName);
    }
  });

  /**
   * Test 12: Verify that the formatRegions function returns the correct format
   */
  it('formats regions correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: '' }} onChange={mockOnChange} />);

    // Check if the region combobox has options in the correct format
    const regionSelect = screen.getAllByTestId('combobox-select-Select')[1];
    const options = Array.from(regionSelect.querySelectorAll('option'));

    // Skip the first option (Select)
    for (let i = 1; i < options.length; i++) {
      const regionName = allCountries[0][2][i-1][0];
      expect(options[i].value).toBe(regionName);
      expect(options[i].textContent).toBe(regionName);
    }
  });

  /**
   * Test 13: Verify that the getCountry function returns the correct country
   */
  it('gets the correct country', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: '' }} onChange={mockOnChange} />);

    // Check if the country combobox has the correct selected value
    const countrySelects = screen.getAllByTestId(/combobox-select/);
    const countrySelect = countrySelects[0];
    expect(countrySelect).toHaveValue('United States');
  });

  /**
   * Test 14: Verify that the getRegion function returns the correct region
   */
  it('gets the correct region', () => {
    const mockOnChange = jest.fn();
    render(<SelectRegion value={{ country: 'United States', city: 'California' }} onChange={mockOnChange} />);

    // Check if the region combobox has the correct selected value
    const comboboxSelects = screen.getAllByTestId(/combobox-select/);
    const regionSelect = comboboxSelects[1];
    expect(regionSelect).toHaveValue('California');
  });
});