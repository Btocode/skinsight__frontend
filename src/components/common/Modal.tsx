"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  closeBtnClassName?: string;
  id?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  contentClassName,
  closeBtnClassName,
  id,
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
    <div
      id={id}
      className={cn(
        `fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none transition-opacity duration-300`,
        className,
        {
          "opacity-0 pointer-events-none": !isModalOpen,
          "opacity-100": isModalOpen,
        }
      )}
    >
      <div
        className="fixed inset-0 bg-[#20293B8C] transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        style={{ opacity: isModalOpen ? 0.5 : 0 }}
        id="modal-backdrop"
      ></div>
      <div
        className={`relative w-auto  my-6 transition-all duration-300 ease-in-out ${
          isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <button
            className={cn(
              "absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer z-20",
              closeBtnClassName
            )}
            onClick={onClose}
          >
            <svg
              className="h-7 w-7 stroke-slate-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className={cn("relative p-2 lg:p-6 flex-auto", contentClassName)}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
