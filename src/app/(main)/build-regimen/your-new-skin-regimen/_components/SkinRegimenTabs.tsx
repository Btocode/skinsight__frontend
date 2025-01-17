"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "morning-routine", label: "Morning routine" },
  { id: "evening-routine", label: "Evening routine" },
];

export default function SkinRegimenTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || tabs[0].id);

  // Update active tab when URL changes
  useEffect(() => {
    const currentTab = searchParams.get("tab") || tabs[0].id;
    setActiveTab(currentTab);
  }, [searchParams]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/build-regimen/your-new-skin-regimen?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="max-w-md mx-auto w-full border-b mt-6 mb-[64px] overflow-auto">
      <ul
        className="flex justify-evenly space-x-4 lg:space-x-8"
        aria-label="Tabs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li
              key={tab.id}
              className={cn(
                "w-full text-center relative py-4 lg:px-1 cursor-pointer text-sm lg:text-xl font-medium tracking-tight transition-colors hover:text-gray-900",
                {
                  "text-gray-900 font-semibold": isActive,
                  "text-gray-500": !isActive,
                }
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
