import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import '@testing-library/jest-dom';

// Mock the components
jest.mock('@/components/animations/SectionOpacity', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="section-opacity">{children}</div>,
}));

jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }) => (
    <h1 data-testid="heading-primary" className={className}>
      {children}
    </h1>
  ),
}));

jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, variant, className }) => (
    <button data-testid={`button-${variant || 'primary'}`} className={className}>
      {children}
    </button>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => (
    <img
      src={typeof src === 'object' ? '/mock-path.jpg' : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid={`image-${alt.replace(/\s+/g, '-')}`}
    />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => (
    <a href={href} data-testid={`link-to-${href.toString().replace(/\//g, '-')}`}>
      {children}
    </a>
  ),
}));

// Mock the cookies
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

import { cookies } from 'next/headers';

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the homepage with correct structure when user has not completed questionnaire', async () => {
    // Mock cookies to return undefined for recommendation
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookies);

    const Component = await HomePage();
    const { container } = render(Component);

    // Check that SectionOpacity is rendered
    expect(screen.getByTestId('section-opacity')).toBeInTheDocument();

    // Check the main section
    const mainSection = screen.getByTestId('section-opacity').firstChild;
    expect(mainSection).toHaveClass('container min-h-[85svh] lg:flex gap-[34px] items-center justify-between py-10 relative');

    // Check the heading
    expect(screen.getByTestId('heading-primary')).toBeInTheDocument();
    expect(screen.getByTestId('heading-primary')).toHaveTextContent('Your AI guide to finding your perfect skin match');

    // Check the description text
    expect(screen.getByText(/Get product recommendations, find alternatives/)).toBeInTheDocument();

    // Check the buttons
    expect(screen.getByTestId('button-primary')).toBeInTheDocument();
    expect(screen.getByTestId('button-primary')).toHaveTextContent('Find my products');

    expect(screen.getByTestId('button-outline')).toBeInTheDocument();
    expect(screen.getByTestId('button-outline')).toHaveTextContent('Find alternatives');

    // Check the links
    expect(screen.getByTestId('link-to--find-products')).toBeInTheDocument();
    expect(screen.getByTestId('link-to--find-alternatives')).toBeInTheDocument();

    // Check the images
    expect(screen.getByTestId('image-hero')).toBeInTheDocument();
    expect(screen.getByTestId('image-heart')).toBeInTheDocument();
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  it('renders the homepage with "Your products" button when user has completed questionnaire', async () => {
    // Mock cookies to return a value for recommendation
    const mockCookies = {
      get: jest.fn().mockReturnValue({ value: 'some-value' }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookies);

    const Component = await HomePage();
    render(Component);

    // Check that the button text is "Your products"
    expect(screen.getByTestId('button-primary')).toHaveTextContent('Your products');

    // Check that the link points to the skin matches page
    expect(screen.getByTestId('link-to--find-products-your-skin-matches')).toBeInTheDocument();
  });

  it('renders the welcome message correctly', async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookies);

    const Component = await HomePage();
    render(Component);

    // Check the welcome message
    expect(screen.getByText('Hi! this is skinsight')).toBeInTheDocument();
  });

  it('renders the description text correctly', async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookies);

    const Component = await HomePage();
    render(Component);

    // Check the description text
    const description = screen.getByText(/Get product recommendations/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-base text-accent leading-[24px] lg:text-2xl lg:leading-[36px] max-w-[390px] sm:max-w-[550px] tracking-[-0.03em]');
  });
});