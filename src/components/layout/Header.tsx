"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import AuthActionModal from "../auth/AuthActionModal";
import UserMenu, { MENU_ITEMS } from "../common/UserMenu";
import { useAppSelector } from "@/lib/redux/hook";

const menuItems = [
  {
    label: "Recommend Products",
    href: "/find-products",
  },
  {
    label: "Find Alternatives",
    href: "/find-alternatives",
  },
  {
    label: "Build Regimen",
    href: "/build-regimen",
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Help",
    href: "/help",
  },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onOpenAuthModal = useCallback(() => {
    router.push(`${pathname}?auth=sign-in`);
  }, [pathname, router]);

  return (
    <header className="bg-white border-b border-[#E1E1E1] sticky top-0 z-50">
      <DesktopNavbar
        onOpenAuthModal={onOpenAuthModal}
        isAuthenticated={mounted && isAuthenticated}
      />
      <MobileNavbar
        onOpenAuthModal={onOpenAuthModal}
        isAuthenticated={mounted && isAuthenticated}
      />
      <AuthActionModal />
    </header>
  );
};

const DesktopNavbar = ({
  onOpenAuthModal,
  isAuthenticated,
}: {
  onOpenAuthModal: () => void;
  isAuthenticated: boolean;
}) => {
  return (
    <nav className="hidden container py-6 lg:flex items-center justify-between">
      <Link href="/">
        <div className="relative w-[180px] h-[47px]">
          <Image
            src="/logo.png"
            alt="Skinsight Logo"
            fill
            sizes="180px"
            priority
            className="object-contain"
          />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        {menuItems.slice(0, 3).map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="text-base leading-[26px] font-normal text-foreground hover:opacity-70 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-8">
        {menuItems.slice(3).map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="text-base leading-[26px] font-normal text-foreground hover:opacity-70 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
        <div className="min-w-[100px]">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <button
              onClick={onOpenAuthModal}
              type="button"
              className="text-base font-medium border-2 rounded-full px-6 py-2 text-foreground"
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const MobileNavbar = ({
  onOpenAuthModal,
  isAuthenticated,
}: {
  onOpenAuthModal: () => void;
  isAuthenticated: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <nav id="menu" className="container block lg:hidden">
      <div className="py-6 flex items-center justify-between">
        <Link href="/">
          <div className="relative w-[162px] h-[48px]">
            <Image
              src="/logo.png"
              alt="Skinsight Logo"
              fill
              sizes="162px"
              priority
              className="object-contain"
            />
          </div>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border-2 border-[#EBEAED] w-[100px] h-[40px] flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 stroke-primary"
          >
            <path d="M3 12h18" />
            <path d="M3 18h18" />
            <path d="M3 6h18" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300 ease-in-out",
          {
            "opacity-50 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-0 mt-4 rounded-t-lg overflow-hidden bg-white z-50 transition-transform duration-300 ease-in-out",
          {
            "translate-y-0": isOpen,
            "translate-y-full": !isOpen,
          }
        )}
      >
        {/* Mobile menu content remains the same */}
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="relative w-[180px] h-[40px]">
                <Image
                  src="/logo.png"
                  alt="Skinsight Logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </Link>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
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
          </div>

          <nav className="mt-10 flex-1">
            <ul className="space-y-5">
              <li>
                <Link
                  href="/"
                  onClick={onClose}
                  className="text-accent text-xl hover:opacity-70 transition-opacity"
                >
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <li className="text-accent text-xl hover:opacity-70 transition-opacity relative">
                  <div
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Account
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn("w-5 h-5 transition-transform", {
                        "rotate-180": isAccountOpen,
                      })}
                    >
                      <path
                        d="M19 9.5L12 16.5L5 9.5"
                        stroke="#2C2C2C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <ul
                    className={cn(
                      "pl-2 space-y-5 overflow-hidden transition-all duration-300 ease-in-out",
                      {
                        "mt-4 max-h-[200px]": isAccountOpen,
                        "max-h-0": !isAccountOpen,
                      }
                    )}
                  >
                    {MENU_ITEMS.map((item) => (
                      <li key={item.href} className="flex items-center gap-4">
                        {item.icon}
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-accent text-xl hover:opacity-70 transition-opacity"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}

              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-accent text-xl hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {!isAuthenticated && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuthModal();
                    }}
                    className="py-3 px-6 rounded-full border border-[#1E0B4B] text-[#1E0B4B] hover:bg-gray-50 transition-colors"
                  >
                    Sign Up or Sign in
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <p className="text-accent text-sm">
            Skinsight 2024 • All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  );
};