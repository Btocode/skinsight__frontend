import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectSkinType from '../SelectSkinType';
import { skinTypes } from '@/utils/products';

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

describe('SelectSkinType Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinType value="" onChange={mockOnChange} />);

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
   * Test 2: Verify that the component renders the correct number of skin type options
   */
  it('renders the correct number of skin type options', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Check if the correct number of skin type options is rendered
    const skinTypeCards = screen.getAllByTestId('card');
    expect(skinTypeCards.length).toBe(skinTypes.length);
  });

  /**
   * Test 3: Verify that the component renders the correct text for each skin type option
   */
  it('renders the correct text for each skin type option', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Check if the correct text is displayed for each skin type option
    skinTypes.forEach((skinType) => {
      const headingElement = screen.getByText(skinType);
      expect(headingElement).toBeInTheDocument();
      expect(headingElement.tagName).toBe('H3');
      expect(headingElement).toHaveClass('text-xl');
      expect(headingElement).toHaveClass('font-semibold');
    });
  });

  /**
   * Test 4: Verify that the component calls onChange with the correct value when a skin type option is clicked
   */
  it('calls onChange with the correct value when a skin type option is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Click on a skin type option
    const skinTypeCards = screen.getAllByTestId('card');
    fireEvent.click(skinTypeCards[0]);

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('skinType', skinTypes[0]);
  });

  /**
   * Test 5: Verify that the component marks the correct skin type option as checked
   */
  it('marks the correct skin type option as checked', () => {
    const selectedSkinType = skinTypes[1];
    const mockOnChange = jest.fn();
    render(<SelectSkinType value={selectedSkinType} onChange={mockOnChange} />);

    // Check if the correct skin type option is marked as checked
    const skinTypeCards = screen.getAllByTestId('card');

    // The second card should be checked
    expect(skinTypeCards[1]).toHaveAttribute('data-checked', 'true');

    // The other cards should not be checked
    expect(skinTypeCards[0]).toHaveAttribute('data-checked', 'false');
    expect(skinTypeCards[2]).toHaveAttribute('data-checked', 'false');
  });

  /**
   * Test 6: Verify that the component passes the correct props to the Card component
   */
  it('passes the correct props to the Card component', () => {
    const selectedSkinType = skinTypes[1];
    const mockOnChange = jest.fn();
    render(<SelectSkinType value={selectedSkinType} onChange={mockOnChange} />);

    // Check if the correct props are passed to the Card component
    const skinTypeCards = screen.getAllByTestId('card');

    // The second card should have checked=true
    expect(skinTypeCards[1]).toHaveAttribute('data-checked', 'true');

    // Click on the first card
    fireEvent.click(skinTypeCards[0]);

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('skinType', skinTypes[0]);
  });

  /**
   * Test 7: Verify that the component renders all skin types from the skinTypes array
   */
  it('renders all skin types from the skinTypes array', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Check if all skin types from the skinTypes array are rendered
    const renderedSkinTypes = screen.getAllByTestId('card').map(card => card.textContent);
    expect(renderedSkinTypes).toEqual(skinTypes);
  });

  /**
   * Test 8: Verify that the component handles empty value correctly
   */
  it('handles empty value correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Check if all cards are not checked when value is empty
    const skinTypeCards = screen.getAllByTestId('card');
    skinTypeCards.forEach(card => {
      expect(card).toHaveAttribute('data-checked', 'false');
    });
  });

  /**
   * Test 9: Verify that the component handles null value correctly
   */
  it('handles null value correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value={null as any} onChange={mockOnChange} />);

    // Check if all cards are not checked when value is null
    const skinTypeCards = screen.getAllByTestId('card');
    skinTypeCards.forEach(card => {
      expect(card).toHaveAttribute('data-checked', 'false');
    });
  });

  /**
   * Test 10: Verify that the component handles undefined value correctly
   */
  it('handles undefined value correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value={undefined as any} onChange={mockOnChange} />);

    // Check if all cards are not checked when value is undefined
    const skinTypeCards = screen.getAllByTestId('card');
    skinTypeCards.forEach(card => {
      expect(card).toHaveAttribute('data-checked', 'false');
    });
  });

  /**
   * Test 11: Verify that the component handles non-matching value correctly
   */
  it('handles non-matching value correctly', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="NonExistentSkinType" onChange={mockOnChange} />);

    // Check if all cards are not checked when value doesn't match any skin type
    const skinTypeCards = screen.getAllByTestId('card');
    skinTypeCards.forEach(card => {
      expect(card).toHaveAttribute('data-checked', 'false');
    });
  });

  /**
   * Test 12: Verify that the component renders the skin types in the correct order
   */
  it('renders the skin types in the correct order', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinType value="" onChange={mockOnChange} />);

    // Check if the skin types are rendered in the correct order
    const renderedSkinTypes = screen.getAllByTestId('card').map(card => card.textContent);
    expect(renderedSkinTypes).toEqual(skinTypes);
  });
});