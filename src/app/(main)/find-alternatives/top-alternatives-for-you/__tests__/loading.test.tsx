import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonLoader from '../loading';

// Mock the GradientImage component
jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

describe('SkeletonLoader Component', () => {
  /**
   * Test 1: Verify that the component renders the container
   *
   * This test ensures that:
   * - The container div is rendered with the correct classes
   */
  it('renders the container with correct classes', () => {
    const { container } = render(<SkeletonLoader />);

    // Check if the container div is rendered with the correct classes
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('w-full');
    expect(containerDiv).toHaveClass('py-10');
    expect(containerDiv).toHaveClass('space-y-10');
    expect(containerDiv).toHaveClass('relative');
  });

  /**
   * Test 2: Verify that the component renders the header skeletons
   *
   * This test ensures that:
   * - The header skeletons are rendered with the correct classes
   */
  it('renders the header skeletons with correct classes', () => {
    const { container } = render(<SkeletonLoader />);

    // Check if the header skeletons are rendered
    const headerSkeletons = container.querySelectorAll('.space-y-4 > div');
    expect(headerSkeletons.length).toBe(3);

    // Check classes by finding elements and verifying they have the expected classes
    const allSkeletons = container.querySelectorAll('.bg-gray-500');

    // Find the first header skeleton (should be the first small one)
    const firstHeaderSkeleton = Array.from(allSkeletons).find(el =>
      el.classList.contains('h-[30px]')
    );
    expect(firstHeaderSkeleton).toBeInTheDocument();
    expect(firstHeaderSkeleton).toHaveClass('w-[100px]');

    // Find the second header skeleton (should be the one with height 50px)
    const secondHeaderSkeleton = Array.from(allSkeletons).find(el =>
      el.classList.contains('h-[50px]')
    );
    expect(secondHeaderSkeleton).toBeInTheDocument();
    expect(secondHeaderSkeleton).toHaveClass('w-[500px]');

    // Find the third header skeleton (should be the one with height 40px)
    const thirdHeaderSkeleton = Array.from(allSkeletons).find(el =>
      el.classList.contains('h-[40px]')
    );
    expect(thirdHeaderSkeleton).toBeInTheDocument();
    expect(thirdHeaderSkeleton).toHaveClass('w-[450px]');
  });

  /**
   * Test 3: Verify that the component renders the image skeleton
   *
   * This test ensures that:
   * - The image skeleton is rendered with the correct classes
   */
  it('renders the image skeleton with correct classes', () => {
    const { container } = render(<SkeletonLoader />);

    // Find all skeletons
    const allSkeletons = container.querySelectorAll('.bg-gray-500');

    // Find the image skeleton (should be the one with height 240px)
    const imageSkeleton = Array.from(allSkeletons).find(el =>
      el.classList.contains('h-[240px]')
    );

    expect(imageSkeleton).toBeInTheDocument();
    expect(imageSkeleton).toHaveClass('mx-auto');
    expect(imageSkeleton).toHaveClass('w-[250px]');
  });

  /**
   * Test 4: Verify that the component renders the grid of skeletons
   *
   * This test ensures that:
   * - The grid of skeletons is rendered with the correct classes
   */
  it('renders the grid of skeletons with correct classes', () => {
    const { container } = render(<SkeletonLoader />);

    // Check if the grid of skeletons is rendered with the correct classes
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-2');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
    expect(gridContainer).toHaveClass('gap-4');
    expect(gridContainer).toHaveClass('lg:gap-[40px]');
    expect(gridContainer).toHaveClass('lg:px-[43px]');
  });

  /**
   * Test 5: Verify that the component renders the correct number of grid skeletons
   *
   * This test ensures that:
   * - The component renders 6 grid skeletons
   */
  it('renders 6 grid skeletons', () => {
    const { container } = render(<SkeletonLoader />);

    // Check if the component renders 6 grid skeletons
    const gridSkeletons = container.querySelectorAll('.grid > div');
    expect(gridSkeletons.length).toBe(6);

    // Check if each grid skeleton has the correct classes
    gridSkeletons.forEach(skeleton => {
      expect(skeleton).toHaveClass('w-full');
      expect(skeleton).toHaveClass('lg:w-[340px]');
      expect(skeleton).toHaveClass('h-[260px]');
      expect(skeleton).toHaveClass('lg:h-[420px]');
    });
  });

  /**
   * Test 6: Verify that the component renders the GradientImage
   *
   * This test ensures that:
   * - The GradientImage component is rendered
   */
  it('renders the GradientImage', () => {
    render(<SkeletonLoader />);

    // Check if the GradientImage component is rendered
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the Skeleton function applies the correct classes
   *
   * This test ensures that:
   * - The Skeleton function applies the correct classes to the div
   */
  it('applies the correct classes to the Skeleton div', () => {
    const { container } = render(<SkeletonLoader />);

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

  /**
   * Test 8: Verify that the component renders the correct total number of skeletons
   *
   * This test ensures that:
   * - The component renders a total of 10 skeletons (3 header + 1 image + 6 grid)
   */
  it('renders a total of 10 skeletons', () => {
    const { container } = render(<SkeletonLoader />);

    // Check if the component renders a total of 10 skeletons
    const skeletons = container.querySelectorAll('.bg-gray-500');
    expect(skeletons.length).toBe(10);
  });
});