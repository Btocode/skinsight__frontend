import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Loading Component', () => {
  it('renders the correct number of Skeleton components', () => {
    render(<Loading />);

    // Adjust the selector based on the actual implementation
    const skeletons = screen.getAllByAltText('skeleton gif');
    expect(skeletons).toHaveLength(4);
  });
});
