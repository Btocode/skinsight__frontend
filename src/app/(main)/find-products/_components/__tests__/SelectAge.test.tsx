import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectAge from '../SelectAge';
import { ages } from '@/utils/products';

interface MockCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  checked: boolean;
  contentClassName?: string;
}
// Mock the Card component
jest.mock('../Card', () => {
  return {
    __esModule: true,
    default: ({ children, onClick, checked, contentClassName }: MockCardProps) => (
      <div
        data-testid="card"
        data-checked={checked}
        className={contentClassName}
        onClick={onClick}
      >
        {children}
      </div>
    ),
  };
});

describe('SelectAge Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectAge value="" onChange={mockOnChange} />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('grid');
    expect(container.firstChild).toHaveClass('grid-cols-2');
    expect(container.firstChild).toHaveClass('md:grid-cols-3');
    expect(container.firstChild).toHaveClass('mt-[32px]');
    expect(container.firstChild).toHaveClass('lg:mt-0');
    expect(container.firstChild).toHaveClass('gap-5');
  });

  /**
   * Test 2: Verify that the component renders the correct number of cards
   */
  it('renders the correct number of cards', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Check if the correct number of cards is rendered
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(ages.length);
  });

  /**
   * Test 3: Verify that the component renders the correct text for each card
   */
  it('renders the correct text for each card', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Check if the correct text is rendered for each card
    ages.forEach((age) => {
      if (Array.isArray(age)) {
        expect(screen.getByText(age[0])).toBeInTheDocument();
        expect(screen.getByText(age[1])).toBeInTheDocument();
      } else {
        expect(screen.getByText(age)).toBeInTheDocument();
      }
    });
  });

  /**
   * Test 4: Verify that the component calls onChange with the correct value when a card is clicked
   */
  it('calls onChange with the correct value when a card is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Click on each card and check if onChange is called with the correct value
    const cards = screen.getAllByTestId('card');

    cards.forEach((card, index) => {
      fireEvent.click(card);

      const age = ages[index];
      const expectedValue = Array.isArray(age) ? age.join(' ') : age;

      expect(mockOnChange).toHaveBeenCalledWith('age', expectedValue);
    });
  });


  /**
   * Test 6: Verify that the component applies the correct contentClassName to the Card
   */
  it('applies the correct contentClassName to the Card', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Check if the correct contentClassName is applied to the Card
    const cards = screen.getAllByTestId('card');
    cards.forEach(card => {
      expect(card).toHaveClass('pr-4');
      expect(card).toHaveClass('lg:pr-0');
    });
  });

  /**
   * Test 7: Verify that the component renders array items correctly
   */
  it('renders array items correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Find an array item
    const arrayItem = ages.find(age => Array.isArray(age)) as string[];

    // Check if the array item is rendered correctly
    const firstPart = screen.getByText(arrayItem[0]);
    const secondPart = screen.getByText(arrayItem[1]);

    expect(firstPart).toBeInTheDocument();
    expect(secondPart).toBeInTheDocument();

    // Check if they are rendered as h3 elements
    expect(firstPart.tagName).toBe('H3');
    expect(secondPart.tagName).toBe('H3');

    // Check if they have the correct classes
    expect(firstPart).toHaveClass('text-xl');
    expect(firstPart).toHaveClass('font-semibold');
    expect(secondPart).toHaveClass('text-xl');
    expect(secondPart).toHaveClass('font-semibold');
  });

  /**
   * Test 8: Verify that the component renders string items correctly
   */
  it('renders string items correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectAge value="" onChange={mockOnChange} />);

    // Find a string item
    const stringItem = ages.find(age => !Array.isArray(age)) as string;

    // Check if the string item is rendered correctly
    const stringElement = screen.getByText(stringItem);

    expect(stringElement).toBeInTheDocument();

    // Check if it is rendered as an h3 element
    expect(stringElement.tagName).toBe('H3');

    // Check if it has the correct classes
    expect(stringElement).toHaveClass('text-xl');
    expect(stringElement).toHaveClass('font-semibold');
  });
});