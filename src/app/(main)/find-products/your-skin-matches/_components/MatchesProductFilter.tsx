"use client";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/CheckBox";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";

const MatchesProductFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        className="w-[87px] lg:w-[102px] h-[40px] text-base lg:text-xl font-medium leading-[26px] p-0 border"
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
              className="w-4 h-4"
            />
          </svg>
        }
      >
        Filter
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="p-0 lg:p-0"
        isCloseIconVisible={false}
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
  children?: FilterOption[];
}

function FilterModal() {
  const [sortExpanded, setSortExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);

  const [sortOptions, setSortOptions] = useState<FilterOption[]>([
    {
      id: "perfect-match",
      label: "Perfect match",
      checked: true,
      children: [
        { id: "exact-match", label: "Exact match", checked: false },
        { id: "close-match", label: "Close match", checked: false },
      ],
    },
    { id: "best-rated", label: "Best rated", checked: false },
    {
      id: "most-popular",
      label: "Most popular",
      checked: false,
      children: [
        { id: "trending", label: "Trending", checked: false },
        { id: "all-time", label: "All-time favorites", checked: false },
      ],
    },
    { id: "price-low-high", label: "Price (Low to High)", checked: false },
  ]);

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      id: "all",
      label: "All",
      checked: false,
    },
    {
      id: "toners",
      label: "Toners",
      checked: false,
      children: [
        {
          id: "hydrating-toners",
          label: "Hydrating Toners",
          checked: false,
        },
        {
          id: "exfoliating-toners",
          label: "Exfoliating Toners",
          checked: false,
        },
      ],
    },
    {
      id: "treatments",
      label: "Treatments",
      checked: false,
    },
    {
      id: "moisturisers",
      label: "Moisturisers",
      checked: false,
      children: [
        {
          id: "day-creams",
          label: "Day Creams",
          checked: false,
        },
      ],
    },
    {
      id: "other",
      label: "Other",
      checked: false,
    },
  ]);

  const handleSortChange = (id: string, isChecked: boolean) => {
    const updatedOptions = updateCheckedState(sortOptions, id, isChecked);
    setSortOptions(updateParentState(updatedOptions)); // Ensure parent state consistency
  };

  const handleFilterChange = (id: string, isChecked: boolean) => {
    const updatedOptions = updateCheckedState(filterOptions, id, isChecked);
    setFilterOptions(updateParentState(updatedOptions)); // Ensure parent state consistency
  };

  const handleClear = () => {
    setSortOptions(
      sortOptions.map((option) => ({ ...option, checked: false }))
    );
    setFilterOptions(
      filterOptions.map((option) => ({ ...option, checked: false }))
    );
  };

  // Function to update the checked state for a specific node
  function updateCheckedState(
    options: FilterOption[],
    id: string,
    isChecked: boolean
  ): FilterOption[] {
    return options.map((option) => {
      // If this is the target node
      if (option.id === id) {
        return {
          ...option,
          checked: isChecked,
          children: option.children
            ? option.children.map((child) => ({
                ...child,
                checked: isChecked, // Check/uncheck all children when parent is changed
              }))
            : undefined,
        };
      }

      // If the node has children, recursively update them
      if (option.children) {
        const updatedChildren = updateCheckedState(
          option.children,
          id,
          isChecked
        );
        const isParentChecked = updatedChildren.some((child) => child.checked);

        return {
          ...option,
          checked: isParentChecked, // Parent stays checked if any child is checked
          children: updatedChildren,
        };
      }

      return option;
    });
  }

  // Function to propagate child state changes to the parent
  function updateParentState(options: FilterOption[]): FilterOption[] {
    return options.map((option) => {
      if (option.children) {
        const updatedChildren = updateParentState(option.children);
        const isParentChecked = updatedChildren.some((child) => child.checked);

        return {
          ...option,
          checked: isParentChecked, // Update parent based on children
          children: updatedChildren,
        };
      }
      return option;
    });
  }

  return (
    <div className="bg-white w-[380px]  overflow-hidden rounded-xl py-[18px]">
      {/* Sort Section */}
      <div className="w-full">
        <div className="pl-3 flex items-center justify-between">
          <h2 className="text-base font-semibold leading-[24px] tracking-[-0.03em] text-accent">
            Sort by
          </h2>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 stroke-accent w-6 h-6"
              />
            </svg>
          </Button>
        </div>
        <hr />

        <div
          className={cn(
            "space-y-4 pt-3 px-[29.5px] transition-all duration-200 ease-in-out h-[0px] overflow-auto -z-10 opacity-0",
            {
              "h-[160px] opacity-100": sortExpanded,
            }
          )}
        >
          {sortOptions.map((option) => (
            <Fragment key={option.id}>
              <Checkbox
                label={option.label}
                checked={option.checked}
                onChange={() => handleSortChange(option.id, !option.checked)}
                iconClassName="w-[18px] h-[18px] rounded flex items-center justify-center"
                labelClassName="text-base font-normal leading-[24px] tracking-[-0.03em] text-accent ml-[15px]"
              />
              {option.children &&
                option.children.map((child) => (
                  <Checkbox
                    key={child.id}
                    label={child.label}
                    checked={child.checked}
                    onChange={() => handleSortChange(child.id, !child.checked)}
                    className="ml-2 mt-2"
                    iconClassName="w-[18px] h-[18px] rounded flex items-center justify-center"
                    labelClassName="text-base font-normal leading-[24px] tracking-[-0.03em] text-accent ml-[15px]"
                  />
                ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full">
        <div className="pl-3 flex items-center justify-between">
          <h2 className="text-base font-semibold leading-[24px] tracking-[-0.03em] text-accent">
            Filter
          </h2>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 stroke-accent w-6 h-6"
              />
            </svg>
          </Button>
        </div>
        <hr />

        <div
          className={cn(
            "space-y-4 pt-3 px-[29.5px] transition-all duration-200 ease-in-out h-[0px] overflow-auto -z-10 opacity-0",
            {
              "h-[200px] opacity-100": filterExpanded,
            }
          )}
        >
          {filterOptions.map((option) => (
            <Fragment key={option.id}>
              <Checkbox
                label={option.label}
                checked={option.checked}
                onChange={() => handleFilterChange(option.id, !option.checked)}
                iconClassName="w-[18px] h-[18px] rounded flex items-center justify-center"
                labelClassName="text-base font-normal leading-[24px] tracking-[-0.03em] text-accent ml-[15px]"
              />
              {option.children &&
                option.children.map((child) => (
                  <Checkbox
                    key={child.id}
                    label={child.label}
                    checked={child.checked}
                    onChange={() =>
                      handleFilterChange(child.id, !child.checked)
                    }
                    className="ml-2 mt-2"
                    iconClassName="w-[18px] h-[18px] rounded flex items-center justify-center"
                    labelClassName="text-base font-normal leading-[24px] tracking-[-0.03em] text-accent ml-[15px]"
                  />
                ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-[18px] flex justify-start gap-3 mt-[25px]">
        <Button
          onClick={() =>
            console.log("Applied:", { sortOptions, filterOptions })
          }
          className="w-[101px] h-[44px] rounded-xl text-base font-medium leading-[26px]"
        >
          Apply
        </Button>
        <Button
          variant={"outline"}
          onClick={handleClear}
          className="w-[101px] h-[44px] rounded-xl border text-base font-medium leading-[26px]"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
