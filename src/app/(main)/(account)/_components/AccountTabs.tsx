"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "/my-profile", label: "My profile" },
  { id: "/saved-items", label: "Saved items" },
  { id: "/my-reviews", label: "My reviews" },
  { id: "/my-regimen", label: "My regimen" },
];

export default function AccountTabs() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b mb-12 overflow-auto">
      <nav
        className="flex justify-evenly space-x-4 lg:space-x-8"
        aria-label="Tabs"
      >
        {tabs.map((tab) => {
          const activeTab = pathname.startsWith(tab.id);
          return (
            <Link
              key={tab.id}
              href={tab.id}
              className={cn(
                "w-full text-center relative py-4 lg:px-1 text-sm lg:text-xl font-medium tracking-tight transition-colors hover:text-gray-900",
                {
                  "text-gray-900 font-semibold": activeTab,
                  "text-gray-500": !activeTab,
                }
              )}
            >
              <span className=" flex-shrink-0">{tab.label}</span>
              {activeTab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
