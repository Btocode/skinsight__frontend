import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../loading';
import '@testing-library/jest-dom';

// Mock the Spinner component
jest.mock('@/components/common/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading Spinner</div>
}));

describe('Loading', () => {
  it('renders the Spinner component', () => {
    const { getByTestId } = render(<Loading />);

    // Check that the Spinner component is rendered
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent('Loading Spinner');
  });

  it('renders without crashing', () => {
    // This test just verifies that the component renders without throwing an error
    expect(() => render(<Loading />)).not.toThrow();
  });

  it('returns a single element', () => {
    const { container } = render(<Loading />);

    // Check that the component returns a single root element
    expect(container.childNodes.length).toBe(1);
  });
});