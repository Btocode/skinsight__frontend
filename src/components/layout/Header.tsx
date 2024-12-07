"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
};

const DesktopNavbar = () => {
  return (
    <nav className="hidden container py-6 lg:flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.png" alt="Skinsight Logo" width={180} height={40} />
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/recommend-products" className="menu-link">
          Recommend Products
        </Link>
        <Link href="/find-alternatives" className="menu-link">
          Find Alternatives
        </Link>
        <Link href="/build-regimen" className="menu-link">
          Build Regimen
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/about" className="menu-link">
          About
        </Link>
        <Link href="/help" className="menu-link">
          Help
        </Link>

        <Link href="/sign-up">
          <button className="text-base font-medium border-2 rounded-full px-6 py-2 text-foreground">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id="menu" className="container block lg:hidden">
      <div className=" py-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Skinsight Logo" width={100} height={40} />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl font-semibold -rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`h-0 overflow-hidden ${
          isOpen ? "h-[300px]" : ""
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-4 pt-2">
          <Link href="/recommend" className="menu-link">
            Recommend Products
          </Link>
          <Link href="/alternatives" className="menu-link">
            Find Alternatives
          </Link>
          <Link href="/regimen" className="menu-link">
            Build Regimen
          </Link>
          <Link href="/about" className="menu-link">
            About
          </Link>
          <Link href="/help" className="menu-link">
            Help
          </Link>
          <Link
            href="/signup"
            className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
