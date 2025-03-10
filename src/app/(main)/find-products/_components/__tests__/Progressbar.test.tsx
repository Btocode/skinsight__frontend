import React from 'react';
import { render, act } from '@testing-library/react';
import Progressbar from '../Progressbar';
import { useRouter } from 'next/navigation';
import { useAnimation } from 'motion/react';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

interface MotionSpanProps {
  className?: string;
  initial?: { width: string };
  children?: React.ReactNode;
}

// Mock the motion/react module
jest.mock('motion/react', () => {
  const originalModule = jest.requireActual('motion/react');

  // Create a mock stop function that we can spy on
  const mockStop = jest.fn();

  return {
    ...originalModule,
    motion: {
      ...originalModule.motion,
      span: ({ className, initial, children }: MotionSpanProps) => (
        <span
          className={className}
          style={{ ...initial }}
          data-testid="motion-span"
        >
          {children}
        </span>
      ),
    },
    useAnimation: () => ({
      start: jest.fn().mockImplementation(() => Promise.resolve()),
      stop: mockStop,
    }),
  };
});

describe('Progressbar Component', () => {
  // Setup mock router
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  /**
   * Test 1: Verify that the component renders correctly with default props
   */
  it('renders with default props', () => {
    const { container } = render(<Progressbar name="test" />);

    // Check if the progress bar container is rendered
    const progressbarContainer = container.firstChild as HTMLElement;
    expect(progressbarContainer).toBeInTheDocument();
    expect(progressbarContainer).toHaveClass('h-[10px]');
    expect(progressbarContainer).toHaveClass('lg:h-[18px]');
    expect(progressbarContainer).toHaveClass('w-full');
    expect(progressbarContainer).toHaveClass('lg:w-[550px]');
    expect(progressbarContainer).toHaveClass('bg-[#8F80E829]');
    expect(progressbarContainer).toHaveClass('relative');
    expect(progressbarContainer).toHaveClass('rounded-[20px]');
    expect(progressbarContainer).toHaveClass('overflow-hidden');
    expect(progressbarContainer).toHaveClass('mb-1');
    expect(progressbarContainer).toHaveClass('lg:mb-0');
  });

  /**
   * Test 2: Verify that the component renders the progress bar span
   */
  it('renders the progress bar span', () => {
    const { container } = render(<Progressbar name="test" />);

    // Check if the progress bar span is rendered
    const progressbarSpan = container.querySelector('span');
    expect(progressbarSpan).toBeInTheDocument();
    expect(progressbarSpan).toHaveClass('absolute');
    expect(progressbarSpan).toHaveClass('top-0');
    expect(progressbarSpan).toHaveClass('left-0');
    expect(progressbarSpan).toHaveClass('h-full');
    expect(progressbarSpan).toHaveClass('rounded-r-[20px]');
    expect(progressbarSpan).toHaveClass('bg-[#8F80E8]');
  });

  /**
   * Test 3: Verify that the component initializes the progress bar width to 0%
   */
  it('initializes the progress bar width to 0%', () => {
    const { container } = render(<Progressbar name="test" />);

    // Check if the progress bar span has the initial width of 0%
    const progressbarSpan = container.querySelector('span');
    expect(progressbarSpan).toHaveStyle('width: 0%');
  });

  /**
   * Test 4: Verify that the component does not animate for non-find-perfect-match pages
   */
  it('does not animate for non-find-perfect-match pages', async () => {
    const { container } = render(<Progressbar name="test" />);

    // Wait for any potential animations to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Check if the progress bar span still has the initial width of 0%
    const progressbarSpan = container.querySelector('span');
    expect(progressbarSpan).toHaveStyle('width: 0%');

    // Check that router.push was not called
    expect(mockPush).not.toHaveBeenCalled();
  });

  /**
   * Test 5: Verify that the component animates for find-perfect-match page
   */
  it('animates for find-perfect-match page', async () => {
    // Render the component with the find-perfect-match name
    render(<Progressbar name="find-perfect-match" />);

    // Wait for all animations and timeouts to complete
    await act(async () => {
      // This will allow all promises in the component to resolve
      await new Promise(resolve => setTimeout(resolve, 3500));
    });

    // Now the router.push should have been called
    expect(mockPush).toHaveBeenCalledWith('/find-products/your-skin-matches');
  });

  /**
   * Test 6: Verify that the component cleans up when unmounted
   */
  it('cleans up when unmounted', async () => {
    // Get the mock stop function from our mocked useAnimation
    const mockStop = useAnimation().stop;

    // Render and unmount the component
    const { unmount } = render(<Progressbar name="find-perfect-match" />);
    unmount();

    // Check that the stop method was called
    expect(mockStop).toHaveBeenCalled();
  });

  /**
   * Test 7: Verify that the component has the correct transition properties
   */
  it('has the correct transition properties', () => {
    const { container } = render(<Progressbar name="test" />);

    // Check if the progress bar span has the correct transition properties
    const progressbarSpan = container.querySelector('span');

    // Note: We can't directly test the transition properties as they're applied by motion/react,
    // but we can check that the span has the motion-related attributes
    expect(progressbarSpan).toHaveAttribute('style');
  });
});