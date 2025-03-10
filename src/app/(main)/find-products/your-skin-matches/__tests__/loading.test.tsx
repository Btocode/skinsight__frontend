import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonLoader from '../loading';

import '@testing-library/jest-dom';

// Mock the components
jest.mock('@/components/common/Skeleton', () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className}>
      Mock Skeleton
    </div>
  ),
}));

jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Mock Gradient Image</div>,
}));

describe('SkeletonLoader', () => {


  it('renders the correct number of skeleton elements', () => {
    render(<SkeletonLoader />);

    // There should be 11 skeleton elements in total:
    // 3 in the header section + 1 standalone + 6 in the grid + 1 more
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(11);
  });

  it('renders the header section with correct skeleton elements', () => {
    render(<SkeletonLoader />);

    // Get all skeletons
    const skeletons = screen.getAllByTestId('skeleton');

    // Check the header section skeletons
    expect(skeletons[0]).toHaveClass('w-[100px] h-[30px]');
    expect(skeletons[1]).toHaveClass('w-9/12 lg:w-[500px] h-[50px]');
    expect(skeletons[2]).toHaveClass('w-4/5 lg:w-[450px] h-[40px]');
    expect(skeletons[3]).toHaveClass('w-[100px] h-[40px]');
  });

  it('renders the standalone skeleton with correct classes', () => {
    render(<SkeletonLoader />);

    // Get all skeletons
    const skeletons = screen.getAllByTestId('skeleton');

    // Check the standalone skeleton
    expect(skeletons[4]).toHaveClass('w-[100px] h-[40px] ml-4 lg:ml-8');
  });

  it('renders the grid section with 6 skeleton elements', () => {
    render(<SkeletonLoader />);

    // Get all skeletons
    const skeletons = screen.getAllByTestId('skeleton');

    // Check the grid skeletons (last 6 elements)
    for (let i = 5; i < 11; i++) {
      expect(skeletons[i]).toHaveClass('w-full lg:w-[340px] h-[260px] lg:h-[410px]');
    }
  });

  it('renders the GradientImage component', () => {
    render(<SkeletonLoader />);

    // Check that the GradientImage component is rendered
    const gradientImage = screen.getByTestId('gradient-image');
    expect(gradientImage).toBeInTheDocument();
    expect(gradientImage).toHaveTextContent('Mock Gradient Image');
  });

  it('renders the grid with correct classes', () => {
    render(<SkeletonLoader />);

    // Get the grid container
    const gridContainer = screen.getAllByTestId('skeleton')[5].closest('.lg\\:px-\\[43px\\].grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-2 md:grid-cols-2 lg:grid-cols-3');
    expect(gridContainer).toHaveClass('gap-4 lg:gap-[40px]');
  });
});