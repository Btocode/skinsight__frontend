import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

describe('Loading Component', () => {
  /**
   * Test 1: Verify that the component renders the container
   *
   * This test ensures that:
   * - The container div is rendered with the correct classes
   */
  it('renders the container with correct classes', () => {
    const { container } = render(<Loading />);

    // Check if the container div is rendered with the correct classes
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('py-10');
    expect(containerDiv).toHaveClass('relative');
    expect(containerDiv).toHaveClass('space-y-4');
  });

  /**
   * Test 2: Verify that the component renders the skeleton elements
   *
   * This test ensures that:
   * - The skeleton elements are rendered with the correct classes
   */
  it('renders the skeleton elements with correct classes', () => {
    const { container } = render(<Loading />);

    // Check if the skeleton elements are rendered with the correct classes
    const skeletons = container.querySelectorAll('.bg-gray-500');
    expect(skeletons.length).toBeGreaterThan(0);

    // Check specific skeletons
    const firstSkeleton = skeletons[0];
    expect(firstSkeleton).toHaveClass('w-[100px]');
    expect(firstSkeleton).toHaveClass('h-[50px]');

    const secondSkeleton = skeletons[1];
    expect(secondSkeleton).toHaveClass('w-[200px]');
    expect(secondSkeleton).toHaveClass('h-[20px]');
  });

  /**
   * Test 3: Verify that the component renders the grid of skeletons
   *
   * This test ensures that:
   * - The grid of skeletons is rendered with the correct classes
   */
  it('renders the grid of skeletons with correct classes', () => {
    const { container } = render(<Loading />);

    // Check if the grid div is rendered with the correct classes
    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv).toHaveClass('grid-cols-2');
    expect(gridDiv).toHaveClass('md:grid-cols-2');
    expect(gridDiv).toHaveClass('lg:grid-cols-3');
    expect(gridDiv).toHaveClass('gap-4');
    expect(gridDiv).toHaveClass('lg:gap-[40px]');

    // Check if the grid contains the correct number of skeleton items
    const gridItems = gridDiv?.querySelectorAll('.bg-gray-500');
    expect(gridItems?.length).toBe(6);
  });

  /**
   * Test 4: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', () => {
    render(<Loading />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the correct number of skeletons
   *
   * This test ensures that:
   * - The component renders the correct number of skeletons
   */
  it('renders the correct number of skeletons', () => {
    const { container } = render(<Loading />);

    // Check if the component renders the correct number of skeletons
    const skeletons = container.querySelectorAll('.bg-gray-500');

    // 4 individual skeletons + 6 grid skeletons + 1 bottom skeleton + 2 button skeletons = 13 total
    expect(skeletons.length).toBe(13);
  });

  /**
   * Test 6: Verify that the component renders the Skeleton component with animation
   *
   * This test ensures that:
   * - The Skeleton component is rendered with the animate-pulse class
   */
  it('renders the Skeleton component with animation', () => {
    const { container } = render(<Loading />);

    // Check if the Skeleton component is rendered with the animate-pulse class
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  /**
   * Test 7: Verify that the component renders the flex container for buttons
   *
   * This test ensures that:
   * - The flex container for buttons is rendered with the correct classes
   */
  it('renders the flex container for buttons with correct classes', () => {
    const { container } = render(<Loading />);

    // Check if the flex container for buttons is rendered with the correct classes
    const flexContainer = container.querySelector('.flex.items-center.gap-4');
    expect(flexContainer).toBeInTheDocument();

    // Check if the flex container contains the correct number of skeleton items
    const buttonSkeletons = flexContainer?.querySelectorAll('.bg-gray-500');
    expect(buttonSkeletons?.length).toBe(2);
  });

  /**
   * Test 8: Verify that the Skeleton function applies the correct classes
   *
   * This test ensures that:
   * - The Skeleton function applies the correct classes to the div
   */
  it('applies the correct classes to the Skeleton div', () => {
    const { container } = render(<Loading />);

    // Check if the Skeleton function applies the correct classes to the div
    const skeletons = container.querySelectorAll('.bg-gray-500');
    skeletons.forEach(skeleton => {
      expect(skeleton).toHaveClass('bg-clip-padding');
      expect(skeleton).toHaveClass('backdrop-filter');
      expect(skeleton).toHaveClass('backdrop-blur-sm');
      expect(skeleton).toHaveClass('bg-opacity-10');
      expect(skeleton).toHaveClass('rounded-lg');
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });
});