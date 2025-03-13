import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '../layout';
import '@testing-library/jest-dom';

// Mock the Header component
jest.mock('@/components/layout/Header', () => ({
  Header: () => <div data-testid="header">Header Component</div>,
}));

describe('MainLayout', () => {
  it('renders the layout with header and children', () => {
    const { container } = render(
      <MainLayout>
        <div data-testid="child-content">Child Content</div>
      </MainLayout>
    );

    // Check that the container div exists
    expect(container.firstChild).toBeInTheDocument();

    // Check that the Header component is rendered
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Header Component');

    // Check that the children are rendered
    const childContent = screen.getByTestId('child-content');
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent('Child Content');
  });

  it('renders multiple children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="first-child">First Child</div>
        <div data-testid="second-child">Second Child</div>
      </MainLayout>
    );

    // Check that both children are rendered
    expect(screen.getByTestId('first-child')).toBeInTheDocument();
    expect(screen.getByTestId('second-child')).toBeInTheDocument();
  });

  it('maintains the correct DOM structure', () => {
    const { container } = render(
      <MainLayout>
        <div data-testid="child-content">Child Content</div>
      </MainLayout>
    );

    // The structure should be:
    // <div>
    //   <Header />
    //   {children}
    // </div>

    const rootElement = container.firstChild;
    expect(rootElement).toBeInTheDocument();

    // First child of the root should be the Header
    const headerElement = rootElement?.firstChild;
    expect(headerElement).toHaveAttribute('data-testid', 'header');

    // Second child of the root should be the children content
    const childElement = headerElement?.nextSibling;
    expect(childElement).toHaveAttribute('data-testid', 'child-content');
  });
});