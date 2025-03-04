import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectGender from '../SelectGender';
import { genders } from '@/utils/products';

// Mock the Card component
jest.mock('../Card', () => {
  return {
    __esModule: true,
    default: ({ children, onClick, checked }: any) => (
      <div
        data-testid="card"
        data-checked={checked}
        onClick={onClick}
      >
        {children}
      </div>
    ),
  };
});

describe('SelectGender Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectGender value="" onChange={mockOnChange} />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('grid');
    expect(container.firstChild).toHaveClass('grid-cols-2');
    expect(container.firstChild).toHaveClass('md:grid-cols-3');
    expect(container.firstChild).toHaveClass('mt-[32px]');
    expect(container.firstChild).toHaveClass('lg:mt-0');
    expect(container.firstChild).toHaveClass('gap-5');
  });

  /**
   * Test 2: Verify that the component renders the correct number of gender options
   */
  it('renders the correct number of gender options', () => {
    const mockOnChange = jest.fn();
    render(<SelectGender value="" onChange={mockOnChange} />);

    // Check if the correct number of gender options is rendered
    const genderCards = screen.getAllByTestId('card');
    expect(genderCards).toHaveLength(genders.length);
  });

  /**
   * Test 3: Verify that the component renders the correct text for each gender option
   */
  it('renders the correct text for each gender option', () => {
    const mockOnChange = jest.fn();
    render(<SelectGender value="" onChange={mockOnChange} />);

    // Check if the correct text is rendered for each gender option
    genders.forEach((gender) => {
      expect(screen.getByText(gender)).toBeInTheDocument();
    });
  });

  /**
   * Test 4: Verify that the component calls onChange with the correct value when a gender option is clicked
   */
  it('calls onChange with the correct value when a gender option is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectGender value="" onChange={mockOnChange} />);

    // Click on each gender option and check if onChange is called with the correct value
    genders.forEach((gender, index) => {
      const genderCard = screen.getAllByTestId('card')[index];
      fireEvent.click(genderCard);

      expect(mockOnChange).toHaveBeenCalledWith('gender', gender);
    });
  });

  /**
   * Test 5: Verify that the component marks the correct gender option as checked
   */
  it('marks the correct gender option as checked', () => {
    const mockOnChange = jest.fn();
    const selectedGender = genders[1];

    render(<SelectGender value={selectedGender} onChange={mockOnChange} />);

    // Check if the correct gender option is marked as checked
    const genderCards = screen.getAllByTestId('card');

    genderCards.forEach((card, index) => {
      if (genders[index] === selectedGender) {
        expect(card).toHaveAttribute('data-checked', 'true');
      } else {
        expect(card).toHaveAttribute('data-checked', 'false');
      }
    });
  });

  /**
   * Test 6: Verify that the component renders the gender options as h3 elements with the correct classes
   */
  it('renders the gender options as h3 elements with the correct classes', () => {
    const mockOnChange = jest.fn();
    render(<SelectGender value="" onChange={mockOnChange} />);

    // Check if the gender options are rendered as h3 elements with the correct classes
    genders.forEach((gender) => {
      const genderHeading = screen.getByText(gender);
      expect(genderHeading.tagName).toBe('H3');
      expect(genderHeading).toHaveClass('text-xl');
      expect(genderHeading).toHaveClass('font-semibold');
    });
  });

  /**
   * Test 7: Verify that the component passes the correct props to the Card component
   */
  it('passes the correct props to the Card component', () => {
    const mockOnChange = jest.fn();
    const selectedGender = genders[1];

    render(<SelectGender value={selectedGender} onChange={mockOnChange} />);

    // Check if the correct props are passed to the Card component
    const genderCards = screen.getAllByTestId('card');

    genderCards.forEach((card, index) => {
      // Check if the checked prop is correct
      if (genders[index] === selectedGender) {
        expect(card).toHaveAttribute('data-checked', 'true');
      } else {
        expect(card).toHaveAttribute('data-checked', 'false');
      }

      // Check if the children are rendered correctly
      expect(card.textContent).toBe(genders[index]);
    });
  });

  /**
   * Test 8: Verify that the component renders all gender options from the genders array
   */
  it('renders all gender options from the genders array', () => {
    const mockOnChange = jest.fn();
    render(<SelectGender value="" onChange={mockOnChange} />);

    // Check if all gender options from the genders array are rendered
    const renderedGenders = screen.getAllByTestId('card').map(card => card.textContent);
    expect(renderedGenders).toEqual(genders);
  });
});