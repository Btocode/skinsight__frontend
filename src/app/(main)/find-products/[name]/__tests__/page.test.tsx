import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Page, { generateStaticParams } from '../page';
import { notFound } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock the SelectLayout component
jest.mock('../../_components/SelectLayout', () => {
  return {
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid="select-layout" data-name={name}>Select Layout for {name}</div>,
  };
});

describe('Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Test 1: Verify that the component renders correctly with a valid name
   */
  it('renders correctly with a valid name', async () => {
    const params = Promise.resolve({ name: 'gender' });
    const { container } = render(await Page({ params }));

    // Check if the container is rendered
    expect(container.firstChild).toBeInTheDocument();

    // Check if the SelectLayout component is rendered with the correct name
    const selectLayout = screen.getByTestId('select-layout');
    expect(selectLayout).toBeInTheDocument();
    expect(selectLayout).toHaveAttribute('data-name', 'gender');
  });

  /**
   * Test 2: Verify that the component calls notFound() with an invalid name
   */
  it('calls notFound() with an invalid name', async () => {
    const params = Promise.resolve({ name: 'invalid-name' });

    await Page({ params });

    // Check if notFound() is called
    expect(notFound).toHaveBeenCalled();
  });

  /**
   * Test 3: Verify that the component renders the SelectLayout component with the correct name
   */
  it('renders the SelectLayout component with the correct name', async () => {
    const params = Promise.resolve({ name: 'skin-type' });
    render(await Page({ params }));

    // Check if the SelectLayout component is rendered with the correct name
    const selectLayout = screen.getByTestId('select-layout');
    expect(selectLayout).toBeInTheDocument();
    expect(selectLayout).toHaveAttribute('data-name', 'skin-type');
  });

  /**
   * Test 4: Verify that generateStaticParams returns the correct params
   */
  it('generateStaticParams returns the correct params', () => {
    const params = generateStaticParams();

    // Check if the params are correct
    expect(params).toEqual([
      { name: 'gender' },
      { name: 'skin-type' },
      { name: 'complexion' },
      { name: 'skin-concern' },
      { name: 'age' },
      { name: 'region' },
      { name: 'find-perfect-match' },
    ]);
  });

  /**
   * Test 5: Verify that the component works with all valid names
   */
  it('works with all valid names', async () => {
    const validNames = [
      'gender',
      'skin-type',
      'complexion',
      'skin-concern',
      'age',
      'region',
      'find-perfect-match',
    ];

    for (const name of validNames) {
      const params = Promise.resolve({ name });
      render(await Page({ params }));

      // Check if the SelectLayout component is rendered with the correct name
      const selectLayout = screen.getByTestId('select-layout');
      expect(selectLayout).toBeInTheDocument();
      expect(selectLayout).toHaveAttribute('data-name', name);

      // Clean up after each render
      cleanup();
    }
  });

  /**
   * Test 6: Verify that the component is exported correctly
   */
  it('is exported correctly', () => {
    // Check if the component is exported correctly
    expect(Page).toBeDefined();
    expect(typeof Page).toBe('function');
  });

  /**
   * Test 7: Verify that the component handles the params correctly
   */
  it('handles the params correctly', async () => {
    const params = Promise.resolve({ name: 'gender' });
    render(await Page({ params }));

    // Check if the SelectLayout component is rendered with the correct name
    const selectLayout = screen.getByTestId('select-layout');
    expect(selectLayout).toBeInTheDocument();
    expect(selectLayout).toHaveAttribute('data-name', 'gender');
  });
});