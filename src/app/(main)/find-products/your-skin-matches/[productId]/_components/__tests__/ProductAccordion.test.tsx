import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductAccordion from '../ProductAccordion';
import '@testing-library/jest-dom';

// Mock the Accordion component
jest.mock('@/components/common/Accordion', () => ({
  __esModule: true,
  Accordion: ({
    title,
    content,
    isActive,
    onToggle
  }: {
    title: string,
    content: string,
    isActive: boolean,
    onToggle: () => void
  }) => (
    <div
      data-testid={`accordion-${title.toLowerCase().replace(/\s+/g, '-')}`}
      data-active={isActive}
      onClick={onToggle}
    >
      <h3>{title}</h3>
      {isActive && <div data-testid={`content-${title.toLowerCase().replace(/\s+/g, '-')}`}>{content}</div>}
    </div>
  ),
}));

describe('ProductAccordion', () => {
  it('renders all accordions with correct titles', () => {
    render(<ProductAccordion />);

    // Check that all accordions are rendered with correct titles
    expect(screen.getByText('Formulation and Key Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Targets')).toBeInTheDocument();
    expect(screen.getByText('Suitable for')).toBeInTheDocument();
  });

  it('starts with the first accordion open', () => {
    render(<ProductAccordion />);

    // Check that the first accordion is active
    const firstAccordion = screen.getByTestId('accordion-formulation-and-key-ingredients');
    expect(firstAccordion).toHaveAttribute('data-active', 'true');

    // Check that the content of the first accordion is visible
    expect(screen.getByTestId('content-formulation-and-key-ingredients')).toBeInTheDocument();

    // Check that other accordions are not active
    expect(screen.getByTestId('accordion-benefits')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('accordion-targets')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('accordion-suitable-for')).toHaveAttribute('data-active', 'false');
  });

  it('toggles accordions when clicked', () => {
    render(<ProductAccordion />);

    // Click the second accordion
    fireEvent.click(screen.getByTestId('accordion-benefits'));

    // Check that the first accordion is now closed
    expect(screen.getByTestId('accordion-formulation-and-key-ingredients')).toHaveAttribute('data-active', 'false');

    // Check that the second accordion is now open
    expect(screen.getByTestId('accordion-benefits')).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('content-benefits')).toBeInTheDocument();

    // Check that other accordions are still closed
    expect(screen.getByTestId('accordion-targets')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('accordion-suitable-for')).toHaveAttribute('data-active', 'false');
  });

  it('closes an open accordion when clicked again', () => {
    render(<ProductAccordion />);

    // First accordion is open by default
    expect(screen.getByTestId('accordion-formulation-and-key-ingredients')).toHaveAttribute('data-active', 'true');

    // Click the first accordion to close it
    fireEvent.click(screen.getByTestId('accordion-formulation-and-key-ingredients'));

    // Check that the first accordion is now closed
    expect(screen.getByTestId('accordion-formulation-and-key-ingredients')).toHaveAttribute('data-active', 'false');

    // Check that no accordion is open
    expect(screen.queryByTestId('content-formulation-and-key-ingredients')).not.toBeInTheDocument();
    expect(screen.queryByTestId('content-benefits')).not.toBeInTheDocument();
    expect(screen.queryByTestId('content-targets')).not.toBeInTheDocument();
    expect(screen.queryByTestId('content-suitable-for')).not.toBeInTheDocument();
  });

  it('renders the correct content for each accordion', () => {
    render(<ProductAccordion />);

    // Check the content of the first accordion (open by default)
    expect(screen.getByTestId('content-formulation-and-key-ingredients')).toHaveTextContent(
      'Houttuynia Cordata Extract (77%), Water, 1,2- Hexanediol, Glycerin, Betaine, Panthenol, Saccha- rum Officinarum (Sugarcane) Extract'
    );

    // Click the second accordion
    fireEvent.click(screen.getByTestId('accordion-benefits'));

    // Check the content of the second accordion
    expect(screen.getByTestId('content-benefits')).toHaveTextContent(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    );

    // Click the third accordion
    fireEvent.click(screen.getByTestId('accordion-targets'));

    // Check the content of the third accordion
    expect(screen.getByTestId('content-targets')).toHaveTextContent(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    );

    // Click the fourth accordion
    fireEvent.click(screen.getByTestId('accordion-suitable-for'));

    // Check the content of the fourth accordion
    expect(screen.getByTestId('content-suitable-for')).toHaveTextContent(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    );
  });

  it('renders with the correct container classes', () => {
    const { container } = render(<ProductAccordion />);

    // Check the container classes
    const accordionContainer = container.firstChild;
    expect(accordionContainer).toHaveClass('max-w-[800px] flex flex-col gap-3 lg:gap-1 mt-6');
  });

  it('allows only one accordion to be open at a time', () => {
    render(<ProductAccordion />);

    // First accordion is open by default
    expect(screen.getByTestId('accordion-formulation-and-key-ingredients')).toHaveAttribute('data-active', 'true');

    // Click the second accordion
    fireEvent.click(screen.getByTestId('accordion-benefits'));

    // Check that the first accordion is now closed and the second is open
    expect(screen.getByTestId('accordion-formulation-and-key-ingredients')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('accordion-benefits')).toHaveAttribute('data-active', 'true');

    // Click the third accordion
    fireEvent.click(screen.getByTestId('accordion-targets'));

    // Check that the second accordion is now closed and the third is open
    expect(screen.getByTestId('accordion-benefits')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('accordion-targets')).toHaveAttribute('data-active', 'true');

    // Check that only one content is visible
    expect(screen.queryByTestId('content-formulation-and-key-ingredients')).not.toBeInTheDocument();
    expect(screen.queryByTestId('content-benefits')).not.toBeInTheDocument();
    expect(screen.getByTestId('content-targets')).toBeInTheDocument();
    expect(screen.queryByTestId('content-suitable-for')).not.toBeInTheDocument();
  });
});