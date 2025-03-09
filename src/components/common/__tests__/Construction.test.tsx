import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstructionPage from '../Construction';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} data-testid="construction-image" />;
  },
}));

jest.mock('next/link', () => {
  const MockedLink = ({ children, href, className }: any) => {
    return (
      <a href={href} className={className} data-testid="home-link">
        {children}
      </a>
    );
  };

  MockedLink.displayName = 'MockedLink';
  return { __esModule: true, default: MockedLink };
});

describe('UnderConstructionPage', () => {
  it('renders the construction image', () => {
    render(<UnderConstructionPage />);

    const image = screen.getByTestId('construction-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/icons/work-in-progress.png');
    expect(image).toHaveAttribute('alt', 'Under Construction');
    expect(image).toHaveAttribute('width', '130');
    expect(image).toHaveAttribute('height', '80');
  });

  it('displays the construction message', () => {
    render(<UnderConstructionPage />);

    const message = screen.getByText(/We're working hard to bring you an improved experience/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-gray-600');
  });

  it('renders a link back to the home page', () => {
    render(<UnderConstructionPage />);

    const link = screen.getByTestId('home-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('Please check back later');
    expect(link).toHaveClass('bg-purple-600');
    expect(link).toHaveClass('text-white');
  });

  it('has the correct layout structure', () => {
    render(<UnderConstructionPage />);

    // Main container
    const container = screen.getByText(/We're working hard/i).closest('div').parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('h-screen');

    // Content container
    const contentContainer = screen.getByText(/We're working hard/i).closest('div');
    expect(contentContainer).toHaveClass('bg-white');
    expect(contentContainer).toHaveClass('rounded-lg');
    expect(contentContainer).toHaveClass('shadow-lg');
    expect(contentContainer).toHaveClass('text-center');
  });

  it('renders all expected elements', () => {
    render(<UnderConstructionPage />);

    // Check all main elements are present
    expect(screen.getByTestId('construction-image')).toBeInTheDocument();
    expect(screen.getByText(/We're working hard/i)).toBeInTheDocument();
    expect(screen.getByText('Please check back later')).toBeInTheDocument();
  });
});