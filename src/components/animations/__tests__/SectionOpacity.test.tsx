import React from 'react';
import { render } from '@testing-library/react';
import SectionOpacity from '../SectionOpacity';

interface MotionDivProps {
  children: React.ReactNode;
  initial: string;
  animate: string;
  transition: string;
}

// Mock the motion component from framer-motion
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, initial, animate, transition, ...props }: MotionDivProps) => (
      <div
        data-testid="motion-div"
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

describe('SectionOpacity', () => {
  it('renders without crashing', () => {
    render(<SectionOpacity>Test content</SectionOpacity>);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <SectionOpacity>
        <p>Test content</p>
      </SectionOpacity>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct initial animation properties', () => {
    const { getByTestId } = render(
      <SectionOpacity>Test content</SectionOpacity>
    );

    const motionDiv = getByTestId('motion-div');
    const initialProps = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');

    expect(initialProps).toEqual({ opacity: 0 });
  });

  it('applies correct animate properties', () => {
    const { getByTestId } = render(
      <SectionOpacity>Test content</SectionOpacity>
    );

    const motionDiv = getByTestId('motion-div');
    const animateProps = JSON.parse(motionDiv.getAttribute('data-animate') || '{}');

    expect(animateProps).toEqual({ opacity: 1 });
  });

  it('applies correct transition properties', () => {
    const { getByTestId } = render(
      <SectionOpacity>Test content</SectionOpacity>
    );

    const motionDiv = getByTestId('motion-div');
    const transitionProps = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transitionProps).toEqual({
      duration: 0.5,
      ease: 'easeInOut',
    });
  });


  it('wraps complex children correctly', () => {
    const { getByText, getByTestId } = render(
      <SectionOpacity>
        <div>
          <h1>Heading</h1>
          <p>Paragraph</p>
        </div>
      </SectionOpacity>
    );

    const motionDiv = getByTestId('motion-div');

    expect(motionDiv).toContainElement(getByText('Heading'));
    expect(motionDiv).toContainElement(getByText('Paragraph'));
  });
});