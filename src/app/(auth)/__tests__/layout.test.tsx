import { render, screen } from '@testing-library/react';
import AuthLayout from '../layout';

describe('AuthLayout', () => {
  // 1. Rendering Tests
  it('renders without crashing', () => {
    render(<AuthLayout>Test</AuthLayout>);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    render(
      <AuthLayout>
        <TestChild />
      </AuthLayout>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  // 2. Styling Tests
  it('has correct layout styles', () => {
    render(<AuthLayout>Test</AuthLayout>);
    const section = screen.getByRole('region');
    expect(section).toHaveClass('flex justify-center items-center h-svh');
  });

  // 3. Accessibility Tests
  it('has correct ARIA attributes', () => {
    render(<AuthLayout>Test</AuthLayout>);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('role', 'region');
  });

  // 4. Content Tests
  it('renders multiple children', () => {
    render(
      <AuthLayout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </AuthLayout>
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  // 5. Edge Cases
  it('renders with empty children', () => {
    render(<AuthLayout>{}</AuthLayout>);
    const section = screen.getByRole('region');
    expect(section).toBeEmptyDOMElement();
  });
});
