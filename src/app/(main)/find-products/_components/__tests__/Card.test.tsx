import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  /**
   * Test 1: Verify that the component renders correctly with default props
   */
  it('renders with default props', () => {
    const { container } = render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    // Check if the content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Check if the default classes are applied to the main card div
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('w-full');
    expect(cardElement).toHaveClass('lg:w-[200px]');
    expect(cardElement).toHaveClass('h-[180px]');
    expect(cardElement).toHaveClass('rounded-xl');
    expect(cardElement).toHaveClass('bg-[#8599FE26]');
    expect(cardElement).toHaveClass('relative');
  });


  /**
   * Test 2: Verify that the component renders with custom className
   */
  it('renders with custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test Content</p>
      </Card>
    );

    // Check if the custom class is applied to the main card div
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('custom-class');
  });

  /**
   * Test 3: Verify that the component renders the circle with default props
   */
  it('renders the circle with default props', () => {
    const { container } = render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    // Check if the circle is rendered
    const circleElement = container.querySelector('span');
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveClass('absolute');
    expect(circleElement).toHaveClass('top-4');
    expect(circleElement).toHaveClass('left-4');
    expect(circleElement).toHaveClass('flex');
    expect(circleElement).toHaveClass('items-center');
    expect(circleElement).toHaveClass('justify-center');
    expect(circleElement).toHaveClass('w-8');
    expect(circleElement).toHaveClass('h-8');
    expect(circleElement).toHaveClass('rounded-full');
    expect(circleElement).toHaveClass('bg-[#FDFDFF]');
  });

  /**
   * Test 4: Verify that the component renders the circle with custom className
   */
  it('renders the circle with custom className', () => {
    const { container } = render(
      <Card circleClassName="custom-circle-class">
        <p>Test Content</p>
      </Card>
    );

    // Check if the custom circle class is applied
    const circleElement = container.querySelector('span');
    expect(circleElement).toHaveClass('custom-circle-class');
  });

  /**
   * Test 5: Verify that the component renders the content with default props
   */
  it('renders the content with default props', () => {
    const { container } = render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    // Find the content div (it's the div that contains the children)
    const contentElement = container.querySelector('div > div:nth-child(2)');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveClass('absolute');
    expect(contentElement).toHaveClass('bottom-4');
    expect(contentElement).toHaveClass('left-4');
  });

  /**
   * Test 6: Verify that the component renders the content with custom className
   */
  it('renders the content with custom className', () => {
    const { container } = render(
      <Card contentClassName="custom-content-class">
        <p>Test Content</p>
      </Card>
    );

    // Check if the custom content class is applied
    const contentElement = container.querySelector('div > div:nth-child(2)');
    expect(contentElement).toHaveClass('custom-content-class');
  });

  /**
   * Test 7: Verify that the component handles onClick events
   */
  it('handles onClick events', () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Card onClick={handleClick}>
        <p>Test Content</p>
      </Card>
    );

    // Click the card
    fireEvent.click(container.firstChild as HTMLElement);

    // Check if the onClick handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test 8: Verify that the component renders correctly when checked
   */
  it('renders correctly when checked', () => {
    const { container } = render(
      <Card checked>
        <p>Test Content</p>
      </Card>
    );

    // Check if the card has the primary background color
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-primary');

    // Check if the circle has the transparent background and border
    const circleElement = container.querySelector('span');
    expect(circleElement).toHaveClass('bg-transparent');
    expect(circleElement).toHaveClass('border-2');

    // Check if the checkmark SVG is rendered
    const svgElement = circleElement?.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    // Check if the content has the white text color
    const contentElement = container.querySelector('div > div:nth-child(2)');
    expect(contentElement).toHaveClass('text-white');
  });

  /**
   * Test 9: Verify that the component does not render the checkmark when not checked
   */
  it('does not render the checkmark when not checked', () => {
    const { container } = render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    // Check if the checkmark SVG is not rendered
    const circleElement = container.querySelector('span');
    const svgElement = circleElement?.querySelector('svg');
    expect(svgElement).not.toBeInTheDocument();
  });

  /**
   * Test 10: Verify that the component renders children correctly
   */
  it('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="custom-child">
          <h3>Title</h3>
          <p>Description</p>
        </div>
      </Card>
    );

    // Check if the children are rendered
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});