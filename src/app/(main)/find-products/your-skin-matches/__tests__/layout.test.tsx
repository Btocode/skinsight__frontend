import React from 'react';
import { render, screen } from '@testing-library/react';
import YourSkinMatchesLayout from '../layout';
import Footer from '@/components/layout/Footer';
import '@testing-library/jest-dom';

// Mock the Footer component
jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="mock-footer">Mock Footer</footer>
}));

describe('YourSkinMatchesLayout', () => {
  it('renders the layout with children', () => {
    render(
      <YourSkinMatchesLayout>
        <div data-testid="test-content">Test Content</div>
      </YourSkinMatchesLayout>
    );

    // Check that the children are rendered
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toBeInTheDocument();
    expect(testContent).toHaveTextContent('Test Content');
  });

  it('renders the Footer component', () => {
    render(
      <YourSkinMatchesLayout>
        <div>Test Content</div>
      </YourSkinMatchesLayout>
    );

    // Check that the Footer component is rendered
    const footer = screen.getByTestId('mock-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Mock Footer');
  });

  it('renders multiple children correctly', () => {
    render(
      <YourSkinMatchesLayout>
        <div data-testid="test-content-1">Test Content 1</div>
        <div data-testid="test-content-2">Test Content 2</div>
      </YourSkinMatchesLayout>
    );

    // Check that all children are rendered
    expect(screen.getByTestId('test-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-content-2')).toBeInTheDocument();
  });

  it('renders with nested components', () => {
    const NestedComponent = () => <span data-testid="nested">Nested Component</span>;

    render(
      <YourSkinMatchesLayout>
        <div>
          <NestedComponent />
        </div>
      </YourSkinMatchesLayout>
    );

    // Check that nested components render correctly
    expect(screen.getByTestId('nested')).toBeInTheDocument();
    expect(screen.getByTestId('nested')).toHaveTextContent('Nested Component');
  });

  it('renders with the correct structure', () => {
    render(
      <YourSkinMatchesLayout>
        <div data-testid="test-content">Test Content</div>
      </YourSkinMatchesLayout>
    );

    // Get the root div element
    const rootDiv = screen.getByTestId('test-content').parentElement;

    // Check that the structure is correct: div > (children + Footer)
    expect(rootDiv).toBeInTheDocument();
    expect(rootDiv?.childNodes.length).toBe(2); // children + Footer
    expect(rootDiv?.childNodes[0]).toBe(screen.getByTestId('test-content'));
    expect(rootDiv?.childNodes[1]).toBe(screen.getByTestId('mock-footer'));
  });
});