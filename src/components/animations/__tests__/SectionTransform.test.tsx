import React from 'react';
import { render } from '@testing-library/react';
import SectionTransform from '../SectionTransform';

interface MotionDivProps {
  children: React.ReactNode;
  initial: string;
  animate: string;
  variants: Record<string, unknown>;
  transition: Record<string, unknown>;
}

// Mock the motion component from framer-motion
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, initial, animate, variants, transition, ...props }: MotionDivProps) => (
      <div
        data-testid="motion-div"
        data-initial={initial}
        data-animate={animate}
        data-variants={variants ? JSON.stringify(variants) : undefined}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

describe('SectionTransform', () => {
  it('renders without crashing', () => {
    render(<SectionTransform type="down">Test content</SectionTransform>);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <SectionTransform type="down">
        <p>Test content</p>
      </SectionTransform>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct initial and animate values', () => {
    const { getByTestId } = render(
      <SectionTransform type="down">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');

    expect(motionDiv.getAttribute('data-initial')).toBe('initial');
    expect(motionDiv.getAttribute('data-animate')).toBe('animate');
  });

  it('applies correct transition properties', () => {
    const { getByTestId } = render(
      <SectionTransform type="down">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const transitionProps = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transitionProps).toEqual({
      duration: 0.5,
      ease: 'easeInOut',
    });
  });

  it('applies correct variants for "down" type', () => {
    const { getByTestId } = render(
      <SectionTransform type="down">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    expect(variants).toEqual({
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    });
  });

  it('applies correct variants for "up" type', () => {
    const { getByTestId } = render(
      <SectionTransform type="up">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    expect(variants).toEqual({
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    });
  });

  it('applies correct variants for "left" type', () => {
    const { getByTestId } = render(
      <SectionTransform type="left">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    expect(variants).toEqual({
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    });
  });

  it('applies correct variants for "right" type', () => {
    const { getByTestId } = render(
      <SectionTransform type="right">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    expect(variants).toEqual({
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    });
  });

  it('applies default variants for invalid type', () => {
    // @ts-expect-error - Testing invalid type
    const { getByTestId } = render(
      <SectionTransform type="invalid">Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    // Default is the same as "down"
    expect(variants).toEqual({
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    });
  });


  it('wraps complex children correctly', () => {
    const { getByText, getByTestId } = render(
      <SectionTransform type="down">
        <div>
          <h1>Heading</h1>
          <p>Paragraph</p>
        </div>
      </SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');

    expect(motionDiv).toContainElement(getByText('Heading'));
    expect(motionDiv).toContainElement(getByText('Paragraph'));
  });

  it('uses "down" as default type when not specified', () => {
    // @ts-expect-error - Testing missing required prop
    const { getByTestId } = render(
      <SectionTransform>Test content</SectionTransform>
    );

    const motionDiv = getByTestId('motion-div');
    const variants = JSON.parse(motionDiv.getAttribute('data-variants') || '{}');

    // Default is the same as "down"
    expect(variants).toEqual({
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    });
  });
});