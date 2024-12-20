"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  contentClassName,
}) => {
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

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        `fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none transition-opacity duration-300`,
        className,
        {
          "opacity-0 pointer-events-none": !isModalOpen,
          "opacity-100": isModalOpen,
        }
      )}
    >
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        style={{ opacity: isModalOpen ? 0.5 : 0 }}
      ></div>
      <div
        className={`relative w-auto max-w-3xl mx-auto my-6 transition-all duration-300 ease-in-out ${
          isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <button
            className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer z-20"
            onClick={onClose}
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
          <div className={cn("relative p-6 flex-auto", contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
