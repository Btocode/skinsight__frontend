import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import SelectLayout from '../SelectLayout';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { updateUserSkinProfile } from '@/redux/slices/productSlice';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the redux hooks
jest.mock('@/lib/redux/hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the redux action
jest.mock('@/redux/slices/productSlice', () => ({
  updateUserSkinProfile: jest.fn(),
}));

// Mock the components
jest.mock('@/components/common/BackButton', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="back-button">Back Button</div>,
  };
});

jest.mock('@/components/common/GradientImage', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="gradient-image">Gradient Image</div>,
  };
});

interface HeadingPrimaryProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionTransformProps {
  children: React.ReactNode;
  type: 'left' | 'up';
}

interface SelectComponentProps {
  value: string | string[];
  onChange: (key: string, value: string | string[]) => void;
}

interface ProgressbarProps {
  name: string;
}

// Update the mocks
jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: HeadingPrimaryProps) => (
    <h1 data-testid="heading-primary" className={className}>{children}</h1>
  ),
}));

jest.mock('@/components/animations/SectionTransform', () => ({
  __esModule: true,
  default: ({ children, type }: SectionTransformProps) => (
    <div data-testid="section-transform" data-type={type}>{children}</div>
  ),
}));

// Update capturedOnChange type
let capturedOnChange: ((key: string, value: string | string[]) => void) | null = null;

// Update the select component mocks to use SelectComponentProps
jest.mock('../SelectGender', () => ({
  __esModule: true,
  default: ({ value, onChange }: SelectComponentProps) => {
    capturedOnChange = onChange;
    return <div data-testid="select-gender" data-value={value}>Select Gender Component</div>;
  },
}));

jest.mock('../SelectSkinType', () => {
  return {
    __esModule: true,
    default: ({ value, onChange }: SelectComponentProps) => {
      capturedOnChange = onChange;
      return (
        <div data-testid="select-skin-type" data-value={value}>
          Select Skin Type Component
        </div>
      );
    },
  };
});

jest.mock('../SelectComplexion', () => {
  return {
    __esModule: true,
    default: ({ value, onChange }: SelectComponentProps) => {
      capturedOnChange = onChange;
      return (
        <div data-testid="select-complexion" data-value={value}>
          Select Complexion Component
        </div>
      );
    },
  };
});

jest.mock('../SelectSkinConcern', () => {
  return {
    __esModule: true,
    default: ({ value, onChange }: SelectComponentProps) => {
      capturedOnChange = onChange;
      return (
        <div data-testid="select-skin-concern" data-value={value}>
          Select Skin Concern Component
        </div>
      );
    },
  };
});

jest.mock('../SelectAge', () => {
  return {
    __esModule: true,
    default: ({ value, onChange }: SelectComponentProps) => {
      capturedOnChange = onChange;
      return (
        <div data-testid="select-age" data-value={value}>
          Select Age Component
        </div>
      );
    },
  };
});

jest.mock('../SelectRegion', () => {
  return {
    __esModule: true,
    default: ({ value, onChange }: SelectComponentProps) => {
      capturedOnChange = onChange;
      return (
        <div data-testid="select-region" data-value={value}>
          Select Region Component
        </div>
      );
    },
  };
});

jest.mock('../Progressbar', () => ({
  __esModule: true,
  default: ({ name }: ProgressbarProps) => (
    <div data-testid="progressbar" data-name={name}>Progressbar Component</div>
  ),
}));

describe('SelectLayout Component', () => {
  // Setup mock router, dispatch, and selector
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockUpdateUserSkinProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    capturedOnChange = null;
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      gender: '',
      skinType: '',
      complexion: '',
      skinConcern: [],
      age: '',
      region: '',
    });
    (updateUserSkinProfile as jest.Mock).mockReturnValue(mockUpdateUserSkinProfile);

    // Reset timers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup(); // Clean up after each test
  });

  /**
   * Test 1: Verify that the component renders correctly with gender name
   */
  it('renders correctly with gender name', () => {
    render(<SelectLayout name="gender" />);

    // Check if the common components are rendered
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
    expect(screen.getByTestId('heading-primary')).toBeInTheDocument();
    expect(screen.getByTestId('section-transform')).toBeInTheDocument();

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("What’s your gender?");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-gender')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders correctly with skin-type name
   */
  it('renders correctly with skin-type name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="skin-type" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("What’s your skin type?");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-skin-type')).toBeInTheDocument();
  });

  /**
   * Test 3: Verify that the component renders correctly with complexion name
   */
  it('renders correctly with complexion name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="complexion" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("What’s your complexion?");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-complexion')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders correctly with skin-concern name
   */
  it('renders correctly with skin-concern name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="skin-concern" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("What's your skin concerns?");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-skin-concern')).toBeInTheDocument();

    // Check if the additional text is displayed
    expect(screen.getByText('Select two from the options')).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders correctly with age name
   */
  it('renders correctly with age name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="age" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("What’s your age?");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-age')).toBeInTheDocument();
  });

  /**
   * Test 6: Verify that the component renders correctly with region name
   */
  it('renders correctly with region name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="region" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement.textContent).toEqual("Select your region");

    // Check if the correct select component is rendered
    expect(screen.getByTestId('select-region')).toBeInTheDocument();
  });

  /**
   * Test 7: Verify that the component renders correctly with find-perfect-match name
   */
  it('renders correctly with find-perfect-match name', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="find-perfect-match" />);

    // Check if the correct heading text is displayed
    const headingElement = screen.getByTestId('heading-primary');
    // The text includes a <br> tag, so we need to check differently
    expect(headingElement.textContent).toContain("Finding your perfect");
    expect(headingElement.textContent).toContain("match");

    // Check if the progressbar is rendered
    expect(screen.getByTestId('progressbar')).toBeInTheDocument();

    // Check if the additional text is displayed
    expect(screen.getByText('This will only take a few seconds')).toBeInTheDocument();
  });

  /**
   * Test 8: Verify that the component uses the correct SectionTransform type
   */
  it('uses the correct SectionTransform type', () => {
    cleanup(); // Clean up previous test

    // For gender, it should use 'left'
    const { unmount } = render(<SelectLayout name="gender" />);
    const leftTransform = screen.getByTestId('section-transform');
    expect(leftTransform).toHaveAttribute('data-type', 'left');

    unmount();

    // For other names, it should use 'up'
    render(<SelectLayout name="skin-type" />);
    const upTransform = screen.getByTestId('section-transform');
    expect(upTransform).toHaveAttribute('data-type', 'up');
  });

  /**
   * Test 9: Verify that the onChange function updates the user skin profile and navigates correctly
   */
  it('updates the user skin profile and navigates correctly when onChange is called', () => {
    cleanup(); // Clean up previous test
    render(<SelectLayout name="gender" />);

    // Ensure the onChange function was captured
    expect(capturedOnChange).not.toBeNull();

    // Call the captured onChange function
    capturedOnChange('gender', 'Male');

    // Check if the dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(mockUpdateUserSkinProfile);
    expect(updateUserSkinProfile).toHaveBeenCalledWith({ key: 'gender', value: 'Male' });

    // Fast-forward the timer to trigger the navigation
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check if the router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/find-products/skin-type');
  });

  /**
   * Test 10: Verify that the onChange function navigates to the correct path for different keys
   */
  it('navigates to the correct path for different keys', () => {
    cleanup(); // Clean up previous test

    // Test navigation for gender
    render(<SelectLayout name="gender" />);
    capturedOnChange('gender', 'Male');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockPush).toHaveBeenCalledWith('/find-products/skin-type');
    cleanup();

    // Test navigation for skinType
    render(<SelectLayout name="skin-type" />);
    capturedOnChange('skinType', 'Dry');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockPush).toHaveBeenCalledWith('/find-products/complexion');
    cleanup();

    // Test navigation for complexion
    render(<SelectLayout name="complexion" />);
    capturedOnChange('complexion', 'Fair');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockPush).toHaveBeenCalledWith('/find-products/skin-concern');
    cleanup();

    // Test navigation for age
    render(<SelectLayout name="age" />);
    capturedOnChange('age', '25-34');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockPush).toHaveBeenCalledWith('/find-products/region');
    cleanup();

    // Test that skinConcern doesn't navigate
    mockPush.mockClear(); // Clear previous calls
    render(<SelectLayout name="skin-concern" />);
    capturedOnChange('skinConcern', ['Acne', 'Wrinkles']);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // The router.push should not be called for skinConcern
    expect(mockPush).not.toHaveBeenCalled();
    cleanup();

    // Test that region doesn't navigate
    mockPush.mockClear(); // Clear previous calls
    render(<SelectLayout name="region" />);
    capturedOnChange('region', 'North America');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // The router.push should not be called for region
    expect(mockPush).not.toHaveBeenCalled();
  });
});