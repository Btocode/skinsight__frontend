import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectComplexion from '../SelectComplexion';
import { complexionOptions } from '@/utils/products';


// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className
  }: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  }) => {
    // Extract the complexion type from the src or alt
    const complexionType = alt?.toLowerCase() ||
                          src.split('/').pop()?.split('.')[0] ||
                          'unknown';

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || 'Complexion image'}
        width={width}
        height={height}
        className={className}
        data-testid={`image-${complexionType}`}
      />
    );
  },
}));

describe('SelectComplexion Component', () => {
  /**
   * Test 1: Verify that the component renders correctly
   */
  it('renders the component', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SelectComplexion value="" onChange={mockOnChange} />);

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('max-w-max');
    expect(container.firstChild).toHaveClass('grid');
    expect(container.firstChild).toHaveClass('grid-cols-2');
    expect(container.firstChild).toHaveClass('md:grid-cols-3');
    expect(container.firstChild).toHaveClass('mt-[32px]');
    expect(container.firstChild).toHaveClass('lg:mt-0');
    expect(container.firstChild).toHaveClass('gap-5');
  });

  /**
   * Test 2: Verify that the component renders the correct number of complexion options
   */
  it('renders the correct number of complexion options', () => {
    const mockOnChange = jest.fn();
    render(<SelectComplexion value="" onChange={mockOnChange} />);

    // Check if the correct number of complexion options is rendered
    const complexionItems = screen.getAllByRole('heading', { level: 2 });
    expect(complexionItems).toHaveLength(complexionOptions.length);
  });

  /**
   * Test 3: Verify that the component renders the correct text for each complexion option
   */
  it('renders the correct text for each complexion option', () => {
    const mockOnChange = jest.fn();
    render(<SelectComplexion value="" onChange={mockOnChange} />);

    // Check if the correct text is rendered for each complexion option
    complexionOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
      expect(screen.getByText(option.description)).toBeInTheDocument();
    });
  });

  /**
   * Test 4: Verify that the component renders the correct images for each complexion option
   */
  it('renders the correct images for each complexion option', () => {
    const mockOnChange = jest.fn();
    render(<SelectComplexion value="" onChange={mockOnChange} />);

    // Check if the correct images are rendered for each complexion option
    complexionOptions.forEach((option) => {
      const image = screen.getByTestId(`image-${option.title.toLowerCase()}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', option.icon);
      expect(image).toHaveAttribute('alt', option.title);
    });
  });

  /**
   * Test 5: Verify that the component calls onChange with the correct value when a complexion option is clicked
   */
  it('calls onChange with the correct value when a complexion option is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SelectComplexion value="" onChange={mockOnChange} />);

    // Click on each complexion option and check if onChange is called with the correct value
    complexionOptions.forEach((option, index) => {
      const complexionItem = screen.getAllByRole('heading', { level: 2 })[index].closest('div');
      fireEvent.click(complexionItem!);

      expect(mockOnChange).toHaveBeenCalledWith('complexion', option.title);
    });
  });


  /**
   * Test 8: Verify that the component applies the correct text color for the selected complexion option
   */
  it('applies the correct text color for the selected complexion option', () => {
    const mockOnChange = jest.fn();
    const selectedOption = complexionOptions[1].title;

    render(<SelectComplexion value={selectedOption} onChange={mockOnChange} />);

    // Check if the correct text color is applied for the selected complexion option
    complexionOptions.forEach((option) => {
      const title = screen.getByText(option.title);
      const description = screen.getByText(option.description);

      if (option.title === selectedOption) {
        // Selected option should have white text
        expect(title).toHaveClass('text-white');
        expect(description).toHaveClass('text-white');
      } else {
        // Non-selected options should have accent text
        expect(title).toHaveClass('text-accent');
        expect(description).toHaveClass('text-accent');
      }
    });
  });



});