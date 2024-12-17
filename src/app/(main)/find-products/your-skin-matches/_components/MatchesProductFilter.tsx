"use client";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/CheckBox";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MatchesProductFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        icon={
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 2.6001C17 2.04005 16.9996 1.75981 16.8906 1.5459C16.7948 1.35774 16.6423 1.20487 16.4542 1.10899C16.2403 1 15.9597 1 15.3996 1H2.59961C2.03956 1 1.75981 1 1.5459 1.10899C1.35774 1.20487 1.20487 1.35774 1.10899 1.5459C1 1.75981 1 2.04005 1 2.6001V3.33736C1 3.58195 1 3.70433 1.02763 3.81942C1.05213 3.92146 1.09263 4.01893 1.14746 4.1084C1.20928 4.20928 1.29591 4.29591 1.46875 4.46875L6.53149 9.53149C6.70443 9.70443 6.79044 9.79044 6.85228 9.89135C6.90711 9.98082 6.94816 10.0786 6.97266 10.1807C7 10.2946 7 10.4155 7 10.6552V15.411C7 16.2682 7 16.6971 7.18054 16.9552C7.33819 17.1806 7.5814 17.331 7.85352 17.3712C8.16514 17.4172 8.54871 17.2257 9.31543 16.8424L10.1154 16.4424C10.4365 16.2819 10.5966 16.2013 10.7139 16.0815C10.8176 15.9756 10.897 15.8485 10.9453 15.7084C11 15.5499 11 15.37 11 15.011V10.6626C11 10.418 11 10.2958 11.0276 10.1807C11.0521 10.0786 11.0926 9.98082 11.1475 9.89135C11.2089 9.79111 11.2947 9.70533 11.4653 9.53469L11.4688 9.53149L16.5315 4.46875C16.7044 4.2958 16.7904 4.20932 16.8523 4.1084C16.9071 4.01893 16.9482 3.92146 16.9727 3.81942C17 3.70551 17 3.58444 17 3.3448V2.6001Z"
              stroke="#8599FE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        Filter
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="px-0"
      >
        <FilterModal />
      </Modal>
    </div>
  );
};

export default MatchesProductFilter;

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

function FilterModal() {
  const [sortExpanded, setSortExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);

  const [sortOptions, setSortOptions] = useState<FilterOption[]>([
    { id: "perfect-match", label: "Perfect match", checked: true },
    { id: "best-rated", label: "Best rated", checked: false },
    { id: "most-popular", label: "Most popular", checked: false },
    { id: "price-low-high", label: "Price (Low to High)", checked: false },
  ]);

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: "all", label: "All", checked: false },
    { id: "toners", label: "Toners", checked: true },
    { id: "treatments", label: "Treatments", checked: false },
    { id: "moisturisers", label: "Moisturisers", checked: false },
    { id: "other", label: "Other", checked: false },
  ]);

  const handleSortChange = (id: string) => {
    setSortOptions(
      sortOptions.map((option) => ({
        ...option,
        checked: option.id === id,
      }))
    );
  };

  const handleFilterChange = (id: string) => {
    setFilterOptions(
      filterOptions.map((option) => ({
        ...option,
        checked: option.id === id ? !option.checked : option.checked,
      }))
    );
  };

  const handleClear = () => {
    setSortOptions(
      sortOptions.map((option) => ({ ...option, checked: false }))
    );
    setFilterOptions(
      filterOptions.map((option) => ({ ...option, checked: false }))
    );
  };

  return (
    <div className="bg-white w-[500px] py-4 mt-2 overflow-hidden space-y-4">
      {/* Sort Section */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-6">
          <h2 className="text-2xl font-medium text-gray-900">Sort by</h2>

          <Button
            variant={"ghost"}
            onClick={() => setSortExpanded(!sortExpanded)}
            className={cn(
              "z-10 transition-transform duration-300 ease-in-out",
              {
                "rotate-180": sortExpanded,
              }
            )}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9.5L12 16.5L5 9.5"
                stroke="#2C2C2C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <hr />

        <div
          className={cn(
            "space-y-3 px-8 py-2 transition-all duration-200 ease-in-out h-[0px] -z-10 opacity-0",
            {
              "h-[150px] opacity-100": sortExpanded,
            }
          )}
        >
          {sortOptions.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={option.checked}
              onChange={() => handleSortChange(option.id)}
            />
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center px-6">
          <h2 className="text-2xl font-medium text-gray-900">Filter</h2>
          <Button
            variant={"ghost"}
            onClick={() => setFilterExpanded(!filterExpanded)}
            className={cn(
              "z-10 transition-transform duration-300 ease-in-out",
              {
                "rotate-180": filterExpanded,
              }
            )}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9.5L12 16.5L5 9.5"
                stroke="#2C2C2C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <hr />

        <div
          className={cn(
            "space-y-3 px-8 py-2 transition-all duration-200 ease-in-out h-[0px] -z-10 opacity-0",
            {
              "h-[200px] opacity-100": filterExpanded,
            }
          )}
        >
          {filterOptions.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={option.checked}
              onChange={() => handleFilterChange(option.id)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-8 flex gap-4">
        <Button
          onClick={() =>
            console.log("Applied:", { sortOptions, filterOptions })
          }
          className="flex-1 rounded-full"
        >
          Apply
        </Button>
        <Button
          variant={"outline"}
          onClick={handleClear}
          className="flex-1 rounded-full"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
