"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import AuthActionModal from "../auth/AuthActionModal";
import UserMenu from "../common/UserMenu";
import { useAppSelector } from "@/lib/redux/hook";

const menuItems = [
  {
    label: "Recommend Products",
    href: "/recommend-products",
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

  const onOpenAuthModal = useCallback(() => {
    router.push(`${pathname}?auth=sign-in`);
  }, [pathname, router]);
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <DesktopNavbar onOpenAuthModal={onOpenAuthModal} />
      <MobileNavbar onOpenAuthModal={onOpenAuthModal} />
      <AuthActionModal />
    </header>
  );
};

const DesktopNavbar = ({
  onOpenAuthModal,
}: {
  onOpenAuthModal: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null or loading state on initial render
  if (!mounted) {
    return (
      <nav className="hidden container py-6 lg:flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Skinsight Logo" width={180} height={40} />
        </Link>
        <div className="flex items-center gap-8">
          {menuItems.slice(0, 3).map((item) => (
            <Link href={item.href} key={item.href} className="menu-link">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-8">
          {menuItems.slice(3).map((item) => (
            <Link href={item.href} key={item.href} className="menu-link">
              {item.label}
            </Link>
          ))}
          <div className="w-[168px] h-[40px]" /> {/* Placeholder */}
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden container py-6 lg:flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.png" alt="Skinsight Logo" width={180} height={40} />
      </Link>
      <div className="flex items-center gap-8">
        {menuItems.slice(0, 3).map((item) => (
          <Link href={item.href} key={item.href} className="menu-link">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-8">
        {menuItems.slice(3).map((item) => (
          <Link href={item.href} key={item.href} className="menu-link">
            {item.label}
          </Link>
        ))}

        {mounted && isAuthenticated ? (
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
    </nav>
  );
};

const MobileNavbar = ({ onOpenAuthModal }: { onOpenAuthModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const isAuthenticated = useAppSelector((state) => state.auth.token);

  const authenticatedUserMenu = [
    {
      label: "My Profile",
      href: "/my-profile",
    },
    {
      label: "Saved Items",
      href: "/saved-items",
    },
    {
      label: "My Reviews",
      href: "/my-reviews",
    },
    {
      label: "My Regimen",
      href: "/my-regimen",
    },
  ];

  return (
    <nav id="menu" className="container block lg:hidden">
      <div className=" py-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Skinsight Logo" width={140} height={60} />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border-2 border-gray-200 w-[100px] h-[40px] flex items-center justify-center rounded-full"
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
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300 ease-in-out",
          {
            "translate-y-0": isOpen,
            "translate-y-full": !isOpen,
          }
        )}
        onClick={onClose}
        style={{ opacity: isOpen ? 0.5 : 0 }}
      ></div>
      <div
        className={cn(
          `fixed inset-0 mt-4 rounded-t-lg overflow-hidden bg-white z-50 transition-transform duration-300 ease-in-out`,
          {
            "translate-y-0": isOpen,
            "translate-y-full": !isOpen,
          }
        )}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Skinsight Logo"
                width={180}
                height={80}
              />
            </Link>
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
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 flex-1">
            <ul className="space-y-5">
              {[
                { label: "Home", href: "/" },
                ...menuItems,
                ...(isAuthenticated ? authenticatedUserMenu : []),
              ].map((item) => (
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
              {isAuthenticated ? null : (
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

          {/* Sign Up Button */}
          <p className=" text-accent text-sm">
            Skinsight 2024 • All rights reserved.
          </p>
        </div>
      </div>
    </nav>
  );
};
