import "@testing-library/jest-dom";


// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

// Mock next/font
jest.mock('next/font/google', () => ({
  DM_Sans: () => ({
    variable: 'mock-font-variable',
    subsets: ['latin'],
  }),
}));