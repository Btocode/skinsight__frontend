"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  logo,
}: DrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, onClose]);

  // disabled scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`block lg:hidden fixed inset-0 bg-[#20293B8C] transform transition-transform duration-300 ease-in-out ${
          isModalOpen ? "translate-y-0 z-50" : "translate-y-full"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`block lg:hidden fixed inset-x-0 bottom-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out rounded-t-2xl ${
          isModalOpen ? "translate-y-0 z-50" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4">
            {logo && (
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Skinsight Logo"
                  width={180}
                  height={80}
                  priority
                />
              </Link>
            )}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
              onClick={onClose}
              aria-label="Close drawer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto px-6 py-4">{children}</div>
        </div>
      </div>
    </>
  );
}
