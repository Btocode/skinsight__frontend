import React from 'react';
import { render, screen } from '@testing-library/react';
import FindProductsPage from '../page';
import { ImageProps } from 'next/image';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionProps {
  children: React.ReactNode;
}

// Mock dependencies before any component definitions
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className, width, height }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      data-testid={`image-${(alt || '').replace(/\s+/g, '-').toLowerCase()}`}
    />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, className, children }: LinkProps) => (
    <a href={href} className={className} data-testid={`link-${href.replace(/\//g, '-')}`}>{children}</a>
  ),
}));

jest.mock('@/components/common/BackButton', () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

jest.mock('@/components/common/HeadingPrimary', () => ({
  __esModule: true,
  default: ({ children, className }: HeadingProps) => (
    <h1 data-testid="heading-primary" className={className}>{children}</h1>
  ),
}));

jest.mock('@/components/common/Button', () => ({
  __esModule: true,
  default: ({ children, className }: ButtonProps) => (
    <button data-testid="button" className={className}>{children}</button>
  ),
}));

jest.mock('@/components/common/GradientImage', () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-image">Gradient Image</div>,
}));

jest.mock('@/components/animations/SectionOpacity', () => ({
  __esModule: true,
  default: ({ children }: SectionProps) => (
    <div data-testid="section-opacity">{children}</div>
  ),
}));

describe('FindProductsPage Component', () => {
  /**
   * Test 1: Verify that the component renders the SectionOpacity wrapper
   */
  it('renders the SectionOpacity wrapper', () => {
    render(<FindProductsPage />);
    expect(screen.getByTestId('section-opacity')).toBeInTheDocument();
  });

  /**
   * Test 2: Verify that the component renders the heading
   */
  it('renders the heading with the correct text', () => {
    render(<FindProductsPage />);

    const headingElement = screen.getByTestId('heading-primary');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe('Find my products');
  });

  /**
   * Test 3: Verify that the component renders the back button
   */
  it('renders the back button', () => {
    render(<FindProductsPage />);
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  /**
   * Test 4: Verify that the component renders the description text
   */
  it('renders the description text', () => {
    render(<FindProductsPage />);

    const description = screen.getByText(
      'Take this small quiz to help us understand your skin and get matched with the products most suitable products for your skin'
    );
    expect(description).toBeInTheDocument();
  });

  /**
   * Test 5: Verify that the component renders the "Let's go" button
   */
  it('renders the "Let\'s go" button', () => {
    render(<FindProductsPage />);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Let\'s go');
  });

  /**
   * Test 6: Verify that the component renders the link to the gender page
   */
  it('renders the link to the gender page', () => {
    render(<FindProductsPage />);

    const link = screen.getByTestId('link--find-products-gender');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/find-products/gender');
  });

  /**
   * Test 7: Verify that the component renders the mobile image
   */
  it('renders the mobile image', () => {
    render(<FindProductsPage />);

    // Use getAllByTestId and find the one with lg:hidden class
    const images = screen.getAllByTestId('image-find-products');
    const mobileImage = images.find(img => img.className.includes('lg:hidden'));
    expect(mobileImage).toBeInTheDocument();
    expect(mobileImage).toHaveClass('lg:hidden');
  });

  /**
   * Test 8: Verify that the component renders the desktop image
   */
  it('renders the desktop image', () => {
    render(<FindProductsPage />);

    const desktopImage = screen.getAllByTestId('image-find-products')[1];
    expect(desktopImage).toBeInTheDocument();
    expect(desktopImage).toHaveClass('hidden');
    expect(desktopImage).toHaveClass('lg:block');
  });

  /**
   * Test 9: Verify that the component renders the GradientImage
   */
  it('renders the GradientImage', () => {
    render(<FindProductsPage />);
    expect(screen.getByTestId('gradient-image')).toBeInTheDocument();
  });

  /**
   * Test 10: Verify that the component renders the container with the correct classes
   */
  it('renders the container with the correct classes', () => {
    const { container } = render(<FindProductsPage />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('container');
    expect(section).toHaveClass('min-h-[85svh]');
    expect(section).toHaveClass('lg:flex');
  });
});