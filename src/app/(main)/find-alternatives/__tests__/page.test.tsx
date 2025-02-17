import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FindAlternativesPage from "../page"; // Adjust the import path as necessary

describe("FindAlternativesPage", () => {
  it("renders the page correctly", () => {
    render(<FindAlternativesPage />);

    // Check if the main heading is rendered
    expect(screen.getByText(/Find alternatives/i)).toBeInTheDocument();
    expect(screen.getByText(/Select your target product/i)).toBeInTheDocument();

    // Check if the image is rendered in mobile view
    const mobileImage = screen.getByAltText("Find Products");
    expect(mobileImage).toBeInTheDocument();
    expect(mobileImage).toHaveClass("lg:hidden");

    // Check if the SelectYourTargetProduct component is rendered
    expect(
      screen.getByRole("button", { name: /select product/i })
    ).toBeInTheDocument(); // Adjust the button text as per your component

    // Check if the GradientImage component is rendered
    const gradientImage = screen.getByRole("img", { name: /gradient/i }); // Adjust the alt text as per your component
    expect(gradientImage).toBeInTheDocument();
  });

  it("renders the desktop image correctly", () => {
    render(<FindAlternativesPage />);

    // Check if the desktop image is rendered
    const desktopImage = screen.getByAltText("Find Products");
    expect(desktopImage).toBeInTheDocument();
    expect(desktopImage).toHaveClass("hidden lg:block");
  });
});
