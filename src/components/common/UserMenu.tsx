"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/redux/hook";

const MENU_ITEMS = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19C15 16.2386 12.7614 14 10 14C7.23858 14 5 16.2386 5 19M15 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2837 18.7822 17.9074C19 17.48 19 16.921 19 15.8031V4.19691C19 3.07899 19 2.5192 18.7822 2.0918C18.5905 1.71547 18.2837 1.40973 17.9074 1.21799C17.4796 1 16.9203 1 15.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.8002C1 16.9203 1 17.4796 1.21799 17.9074C1.40973 18.2837 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H5M15 19H5M10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8C13 9.65685 11.6569 11 10 11Z"
          stroke="#8599FE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "My profile",
    href: "/my-profile",
  },
  {
    icon: (
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2373 2.23731C18.7839 3.78395 18.8432 6.27268 17.3718 7.89114L9.99949 16.0001L2.62812 7.89111C1.15679 6.27265 1.21605 3.7839 2.76269 2.23726C4.48961 0.510338 7.33372 0.66814 8.85937 2.5752L10 4.00045L11.1396 2.57504C12.6653 0.667978 15.5104 0.510393 17.2373 2.23731Z"
          stroke="#8599FE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "Saved items",
    href: "/saved-items",
  },
  {
    icon: (
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1.00087C8.90451 1 8.79728 1 8.67471 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.51921 19 3.079 19 4.19694 19L11.8031 19C12.921 19 13.48 19 13.9074 18.7822C14.2837 18.5905 14.5905 18.2842 14.7822 17.9079C15 17.4805 15 16.9215 15 15.8036V7.32568C15 7.20296 15 7.09561 14.9991 7M9 1.00087C9.28564 1.00347 9.46634 1.01385 9.63884 1.05526C9.84291 1.10425 10.0379 1.18526 10.2168 1.29492C10.4186 1.41857 10.5918 1.59182 10.9375 1.9375L14.063 5.06298C14.4089 5.40889 14.5809 5.58136 14.7046 5.78319C14.8142 5.96214 14.8953 6.15726 14.9443 6.36133C14.9857 6.53376 14.9963 6.71451 14.9991 7M9 1.00087V3.8C9 4.9201 9 5.47977 9.21799 5.90759C9.40973 6.28392 9.71547 6.59048 10.0918 6.78223C10.5192 7 11.079 7 12.1969 7H14.9991M14.9991 7H15.0002"
          stroke="#8599FE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "My reviews",
    href: "/my-reviews",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 16.9991C9.90511 17 9.79863 17 9.67703 17H4.19691C3.07899 17 2.5192 17 2.0918 16.7822C1.71547 16.5905 1.40973 16.2842 1.21799 15.9079C1 15.4801 1 14.9203 1 13.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40973 1.71547 1.71547 1.40973 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H13.8002C14.9203 1 15.4796 1 15.9074 1.21799C16.2837 1.40973 16.5905 1.71547 16.7822 2.0918C17 2.5192 17 3.07899 17 4.19691V9.67471C17 9.79731 17 9.90453 16.9991 10M10 16.9991C10.2857 16.9966 10.4663 16.9862 10.6388 16.9448C10.8429 16.8958 11.0379 16.8147 11.2168 16.705C11.4186 16.5814 11.5916 16.4089 11.9375 16.063L16.063 11.9375C16.4089 11.5916 16.5809 11.4186 16.7046 11.2168C16.8142 11.0379 16.8953 10.8424 16.9443 10.6384C16.9857 10.4659 16.9964 10.2855 16.9991 10M10 16.9991V11.6001C10 11.04 10 10.7598 10.109 10.5459C10.2049 10.3577 10.3577 10.2049 10.5459 10.109C10.7598 10 11.0396 10 11.5996 10H16.9991"
          stroke="#8599FE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "My regimen",
    href: "/my-regimen",
  },
];

const UserMenu = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => (prev + 1) % MENU_ITEMS.length);
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(MENU_ITEMS.length - 1);
        } else {
          setActiveIndex((prev) =>
            prev <= 0 ? MENU_ITEMS.length - 1 : prev - 1
          );
        }
        break;

      case "Enter":
        event.preventDefault();
        if (isOpen && activeIndex >= 0) {
          menuItemsRef.current[activeIndex]?.click();
        } else {
          setIsOpen(true);
          setActiveIndex(0);
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        buttonRef.current?.focus();
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && menuItemsRef.current[activeIndex]) {
      menuItemsRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="user-menu"
        className="flex justify-between items-center gap-2 border-2 px-4 border-[#EBEAED] rounded-[100px] w-[168px] h-[40px]"
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 19C17 16.2386 13.4183 14 9 14C4.58172 14 1 16.2386 1 19M9 11C6.23858 11 4 8.76142 4 6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6C14 8.76142 11.7614 11 9 11Z"
            stroke="#8599FE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-base font-medium leading-[22px]">
          Hi, {user?.display_name || 'User'}
        </span>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "transition-transform duration-300 ease-in-out w-5 h-5",
            isOpen ? "rotate-180" : ""
          )}
        >
          <path
            d="M19 9.5L12 16.5L5 9.5"
            stroke="#2C2C2C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id="user-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        className={`absolute right-0 mt-2 w-[248px] h-[280px] origin-top-right transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="py-[40px] space-y-4">
          {MENU_ITEMS.map((item, index) => (
            <MenuItem
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              icon={item.icon}
              text={item.text as string}
              href={item.href as string}
              isActive={index === activeIndex}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setIsOpen(false);
                setActiveIndex(-1);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuItem = React.forwardRef<
  HTMLAnchorElement,
  {
    icon: React.ReactNode;
    text: string;
    href: string;
    isActive?: boolean;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onClick: () => void;
  }
>(({ icon, text, href, isActive, onKeyDown, onClick }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      className={`flex items-center flex-shrink-0 gap-4 pl-[40px] py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none `}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {icon}
      <span className="text-lg font-medium leading-[26px]">{text}</span>
    </Link>
  );
});

MenuItem.displayName = "MenuItem";

export default UserMenu;
