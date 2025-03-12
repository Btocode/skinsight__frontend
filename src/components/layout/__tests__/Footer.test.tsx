import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import '@testing-library/jest-dom';
import { ImageProps } from 'next/image';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, width, height } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt} width={width} height={height} data-testid={`image-${alt.replace(/\s+/g, '-').toLowerCase()}`} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
    <a href={href} className={className} data-testid={`link-${href.replace(/\//g, '')}`}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  beforeEach(() => {
    // Mock Date.getFullYear to return a consistent year for testing
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the footer with correct structure', () => {
    render(<Footer />);

    // Check that the footer exists with correct classes
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('py-12 mt-10 flex flex-col');
  });

  it('renders the logo with correct attributes', () => {
    render(<Footer />);

    // Check the logo
    const logo = screen.getByTestId('image-skinsight-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
    expect(logo).toHaveAttribute('alt', 'Skinsight Logo');
    expect(logo).toHaveAttribute('width', '180');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('renders all navigation links with correct hrefs', () => {
    render(<Footer />);

    // Check all navigation links
    const homeLink = screen.getByTestId('link-');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const recommendProductsLink = screen.getByTestId('link-recommend-products');
    expect(recommendProductsLink).toBeInTheDocument();
    expect(recommendProductsLink).toHaveAttribute('href', '/recommend-products');
    expect(recommendProductsLink).toHaveTextContent('Recommend Products');

    const findAlternativesLink = screen.getByTestId('link-find-alternatives');
    expect(findAlternativesLink).toBeInTheDocument();
    expect(findAlternativesLink).toHaveAttribute('href', '/find-alternatives');
    expect(findAlternativesLink).toHaveTextContent('Find Alternatives');

    const buildRegimenLink = screen.getByTestId('link-build-regimen');
    expect(buildRegimenLink).toBeInTheDocument();
    expect(buildRegimenLink).toHaveAttribute('href', '/build-regimen');
    expect(buildRegimenLink).toHaveTextContent('Build Regimen');

    const aboutLink = screen.getByTestId('link-about');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(aboutLink).toHaveTextContent('About');

    const helpLink = screen.getByTestId('link-help');
    expect(helpLink).toBeInTheDocument();
    expect(helpLink).toHaveAttribute('href', '/help');
    expect(helpLink).toHaveTextContent('Help');
  });

  it('renders the copyright text with current year', () => {
    render(<Footer />);

    // Check the copyright text
    const copyright = screen.getByText('© 2024 Skinsight. All rights reserved');
    expect(copyright).toBeInTheDocument();
  });

  it('renders all social media icons with correct attributes', () => {
    render(<Footer />);

    // Check all social media icons
    const instagramIcon = screen.getByTestId('image-instagram');
    expect(instagramIcon).toBeInTheDocument();
    expect(instagramIcon).toHaveAttribute('src', '/icons/instagram.svg');
    expect(instagramIcon).toHaveAttribute('width', '25');
    expect(instagramIcon).toHaveAttribute('height', '25');

    const tiktokIcon = screen.getByTestId('image-tiktok');
    expect(tiktokIcon).toBeInTheDocument();
    expect(tiktokIcon).toHaveAttribute('src', '/icons/tiktok.svg');
    expect(tiktokIcon).toHaveAttribute('width', '25');
    expect(tiktokIcon).toHaveAttribute('height', '25');

    const xIcon = screen.getByTestId('image-x');
    expect(xIcon).toBeInTheDocument();
    expect(xIcon).toHaveAttribute('src', '/icons/x.svg');
    expect(xIcon).toHaveAttribute('width', '25');
    expect(xIcon).toHaveAttribute('height', '25');

    const snapchatIcon = screen.getByTestId('image-snapchat');
    expect(snapchatIcon).toBeInTheDocument();
    expect(snapchatIcon).toHaveAttribute('src', '/icons/snapchat.svg');
    expect(snapchatIcon).toHaveAttribute('width', '25');
    expect(snapchatIcon).toHaveAttribute('height', '25');
  });

  it('renders social media links with correct hrefs', () => {
    render(<Footer />);

    // Check all social media links
    const socialLinks = screen.getAllByTestId((id) => id.startsWith('link-#'));
    expect(socialLinks).toHaveLength(4);

    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#');
    });
  });

  it('renders the divider with correct classes', () => {
    render(<Footer />);

    // Check the divider
    const divider = screen.getByRole('contentinfo').children[1];
    expect(divider).toHaveClass('container my-9 w-full h-px bg-[#EBEAED]');
  });

  it('renders the navigation links with menu-link class', () => {
    render(<Footer />);

    // Check that all navigation links have the menu-link class
    const menuLinks = [
      screen.getByTestId('link-recommend-products'),
      screen.getByTestId('link-find-alternatives'),
      screen.getByTestId('link-build-regimen'),
      screen.getByTestId('link-about'),
      screen.getByTestId('link-help')
    ];

    menuLinks.forEach(link => {
      expect(link).toHaveClass('menu-link');
    });
  });
});