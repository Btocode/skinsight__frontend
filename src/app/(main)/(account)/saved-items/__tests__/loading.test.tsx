import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Loading Component', () => {
  it('renders 12 Skeleton components', () => {
    render(<Loading />);

    // Check for the Skeleton components by alt text
    const skeletons = screen.getAllByAltText('skeleton gif');
    expect(skeletons).toHaveLength(12);
  });
});