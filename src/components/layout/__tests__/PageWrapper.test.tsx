import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import '@testing-library/jest-dom';

describe('PageWrapper', () => {
  it('renders the wrapper with correct structure', () => {
    render(
      <PageWrapper>
        <div data-testid="test-content">Test Content</div>
      </PageWrapper>
    );

    // Check that the main container exists
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('flex-grow container mx-auto px-4 py-8');

    // Check that the footer exists
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-gray-100 p-4 text-center');

    // Check that the wrapper has the min-h-screen class
    const wrapper = mainContainer.parentElement;
    expect(wrapper).toHaveClass('min-h-screen flex flex-col');
  });

  it('renders children correctly', () => {
    render(
      <PageWrapper>
        <div data-testid="test-content">Test Content</div>
      </PageWrapper>
    );

    // Check that the children are rendered
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toBeInTheDocument();
    expect(testContent).toHaveTextContent('Test Content');
  });

  it('renders multiple children correctly', () => {
    render(
      <PageWrapper>
        <div data-testid="test-content-1">Test Content 1</div>
        <div data-testid="test-content-2">Test Content 2</div>
      </PageWrapper>
    );

    // Check that all children are rendered
    expect(screen.getByTestId('test-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-content-2')).toBeInTheDocument();
  });

  it('renders the footer with correct copyright text', () => {
    render(
      <PageWrapper>
        <div>Test Content</div>
      </PageWrapper>
    );

    // Check the footer content
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('© 2024 My Next.js Project. All rights reserved.');
  });

  it('renders with nested components', () => {
    const NestedComponent = () => <span data-testid="nested">Nested Component</span>;

    render(
      <PageWrapper>
        <div>
          <NestedComponent />
        </div>
      </PageWrapper>
    );

    // Check that nested components render correctly
    expect(screen.getByTestId('nested')).toBeInTheDocument();
    expect(screen.getByTestId('nested')).toHaveTextContent('Nested Component');
  });
});