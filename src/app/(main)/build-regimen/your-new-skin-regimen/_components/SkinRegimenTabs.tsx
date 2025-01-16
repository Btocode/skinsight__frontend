"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

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
  const selectedTab = searchParams.get("tab") || tabs[0].id;

  return (
    <div className="max-w-md mx-auto w-full border-b mt-6 mb-[64px] overflow-auto">
      <ul
        className="flex justify-evenly space-x-4 lg:space-x-8"
        aria-label="Tabs"
      >
        {tabs.map((tab) => {
          const activeTab = selectedTab?.startsWith(tab.id);
          return (
            <li
              key={tab.id}
              className={cn(
                "w-full text-center relative py-4 lg:px-1 cursor-pointer text-sm lg:text-xl font-medium tracking-tight transition-colors hover:text-gray-900",
                {
                  "text-gray-900 font-semibold": activeTab,
                  "text-gray-500": !activeTab,
                }
              )}
              onClick={() => {
                router.replace(
                  `/build-regimen/your-new-skin-regimen?tab=${tab.id}`
                );
              }}
            >
              {tab.label}
              {activeTab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
