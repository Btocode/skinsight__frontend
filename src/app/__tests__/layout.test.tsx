import { render, screen } from "@testing-library/react";
import RootLayout from "../layout";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { AuthCheck } from "@/components/auth/AuthCheck";

// Mock next/font/google
jest.mock('next/font/google', () => ({
  DM_Sans: () => ({
    variable: 'mock-font-variable',
    subsets: ['latin'],
  }),
}));

// Mock ReduxProvider
jest.mock('@/lib/redux/ReduxProvider', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));

// Mock AuthCheck
jest.mock('@/components/auth/AuthCheck', () => ({
  AuthCheck: () => <div data-testid="auth-check">Auth Check</div>,
}));

describe("RootLayout", () => {
  // Suppress console.error before all tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Restore console.error after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly with children and modal", () => {
    render(
      <RootLayout modal={<div data-testid="modal">Modal Content</div>}>
        <div data-testid="child">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("redux-provider")).toBeInTheDocument();
    expect(screen.getByTestId("auth-check")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(document.querySelector(".font-dm-sans")).toBeTruthy();
  });
});