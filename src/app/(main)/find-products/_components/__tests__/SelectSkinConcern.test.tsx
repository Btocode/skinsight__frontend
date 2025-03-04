import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectSkinConcern from '../SelectSkinConcern';
import { skinConcerns } from '@/utils/products';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the Button component
jest.mock('@/components/common/Button', () => {
  return {
    __esModule: true,
    default: ({ children, className, onClick }: any) => (
      <button
        data-testid="button"
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    ),
  };
});

describe('SelectSkinConcern Component', () => {
  // Setup mock router
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the correct number of skin concern options
   */
  it('renders the correct number of skin concern options', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Check if the correct number of skin concern options is rendered
    const skinConcernItems = screen.getAllByRole('heading', { level: 3 });

    // Each skin concern has two headings (one for each part of the concern)
    expect(skinConcernItems.length).toBe(skinConcerns.length * 2);
  });

  /**
   * Test 3: Verify that the component renders the correct text for each skin concern option
   */
  it('renders the correct text for each skin concern option', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Check if the correct text is displayed for each skin concern option
    skinConcerns.forEach((concern) => {
      expect(screen.getByText(`${concern[0]} &`)).toBeInTheDocument();
      expect(screen.getByText(concern[1])).toBeInTheDocument();
    });
  });

  /**
   * Test 4: Verify that the component calls onChange with the correct value when a skin concern option is clicked
   */
  it('calls onChange with the correct value when a skin concern option is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Click on a skin concern option
    const firstConcernHeading = screen.getByText(`${skinConcerns[0][0]} &`);
    const firstConcernItem = firstConcernHeading.closest('div')?.closest('div');
    fireEvent.click(firstConcernItem!);

    // Check if onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('skinConcern', skinConcerns[0].join(' & '));
  });

  /**
   * Test 5: Verify that the component marks the correct skin concern option as checked
   */
  it('marks the correct skin concern option as checked', () => {
    const selectedConcern = skinConcerns[1].join(' & ');
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[selectedConcern]} onChange={mockOnChange} />);

    // Find all the concern items directly
    const concernItems = container.querySelectorAll('.grid > div');

    // The second item should have the bg-primary class
    expect(concernItems[1]).toHaveClass('bg-primary');

    // The first item should not have the bg-primary class
    expect(concernItems[0]).not.toHaveClass('bg-primary');
  });

  /**
   * Test 6: Verify that the component renders the checkmark for the selected skin concern option
   */
  it('renders the checkmark for the selected skin concern option', () => {
    const selectedConcern = skinConcerns[1].join(' & ');
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[selectedConcern]} onChange={mockOnChange} />);

    // Find all SVG elements directly
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBe(1);

    // Check if the SVG is in the correct container
    const concernItems = container.querySelectorAll('.grid > div');
    const selectedConcernItem = concernItems[1];
    expect(selectedConcernItem.contains(svgElements[0])).toBe(true);
  });

  /**
   * Test 7: Verify that the component applies the correct text color for the selected skin concern option
   */
  it('applies the correct text color for the selected skin concern option', () => {
    const selectedConcern = skinConcerns[1].join(' & ');
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[selectedConcern]} onChange={mockOnChange} />);

    // Find all the concern items
    const concernItems = container.querySelectorAll('.grid > div');

    // Find the text container in the selected concern item
    const selectedTextContainer = concernItems[1].querySelector('div:nth-child(2)');
    expect(selectedTextContainer).toHaveClass('text-white');

    // Find the text container in the first concern item
    const firstTextContainer = concernItems[0].querySelector('div:nth-child(2)');
    expect(firstTextContainer).not.toHaveClass('text-white');
  });

  /**
   * Test 8: Verify that the component applies the correct styles to the checkmark container
   */
  it('applies the correct styles to the checkmark container', () => {
    const selectedConcern = skinConcerns[1].join(' & ');
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[selectedConcern]} onChange={mockOnChange} />);

    // Find all the concern items
    const concernItems = container.querySelectorAll('.grid > div');

    // Find the checkmark container in the selected concern item
    const checkmarkContainer = concernItems[1].querySelector('div:first-child');

    // Check if it has the correct classes
    expect(checkmarkContainer).toHaveClass('w-6');
    expect(checkmarkContainer).toHaveClass('h-6');
    expect(checkmarkContainer).toHaveClass('flex');
    expect(checkmarkContainer).toHaveClass('items-center');
    expect(checkmarkContainer).toHaveClass('justify-center');
    expect(checkmarkContainer).toHaveClass('rounded-[3px]');
    expect(checkmarkContainer).toHaveClass('bg-white');
  });

  /**
   * Test 9: Verify that the component navigates to the correct page when the Next button is clicked
   */
  it('navigates to the correct page when the Next button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Click the Next button
    const nextButton = screen.getByTestId('button');
    fireEvent.click(nextButton);

    // Check if the router.push is called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/find-products/age');
  });

  /**
   * Test 10: Verify that the component renders the correct layout for the skin concern options
   */
  it('renders the correct layout for the skin concern options', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Find the grid container directly
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('grid-cols-2');
    expect(gridContainer).toHaveClass('md:grid-cols-3');
    expect(gridContainer).toHaveClass('mt-[32px]');
    expect(gridContainer).toHaveClass('lg:mt-0');
    expect(gridContainer).toHaveClass('gap-5');

    // Find the first concern item directly
    const firstConcernItem = container.querySelector('.grid > div:first-child');
    expect(firstConcernItem).toHaveClass('w-full');
    expect(firstConcernItem).toHaveClass('lg:w-[200px]');
    expect(firstConcernItem).toHaveClass('h-[180px]');
    expect(firstConcernItem).toHaveClass('rounded-xl');
    expect(firstConcernItem).toHaveClass('bg-[#8599FE26]');
    expect(firstConcernItem).toHaveClass('relative');
    expect(firstConcernItem).toHaveClass('pt-[11px]');
    expect(firstConcernItem).toHaveClass('px-[13px]');
    expect(firstConcernItem).toHaveClass('pb-[13px]');
  });

  /**
   * Test 11: Verify that the component handles multiple selected skin concerns correctly
   */
  it('handles multiple selected skin concerns correctly', () => {
    const selectedConcerns = [
      skinConcerns[0].join(' & '),
      skinConcerns[1].join(' & ')
    ];
    const mockOnChange = jest.fn();
    const { container } = render(<SelectSkinConcern value={selectedConcerns} onChange={mockOnChange} />);

    // Find all the concern items directly
    const concernItems = container.querySelectorAll('.grid > div');

    // Both the first and second items should have the bg-primary class
    expect(concernItems[0]).toHaveClass('bg-primary');
    expect(concernItems[1]).toHaveClass('bg-primary');

    // Find all SVG elements directly
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBe(2);
  });

  /**
   * Test 12: Verify that the component renders the correct text for the Next button
   */
  it('renders the correct text for the Next button', () => {
    const mockOnChange = jest.fn();
    render(<SelectSkinConcern value={[]} onChange={mockOnChange} />);

    // Check if the Next button has the correct text
    const nextButton = screen.getByTestId('button');
    expect(nextButton.querySelector('span.hidden.lg\\:block')).toHaveTextContent('Next');
    expect(nextButton.querySelector('span.lg\\:hidden')).toHaveTextContent("Let's go");
  });
});