"use client";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/CheckBox";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";

interface ProductsByCategory {
  [key: string]: any[];
}

interface ProductsBySubcategory {
  [key: string]: any[];
}

interface Categories {
  [key: string]: string[];
}

const MatchesProductFilter = ({ productsByCategory, categories, productsBySubcategory }: { productsByCategory: ProductsByCategory, categories: Categories, productsBySubcategory: ProductsBySubcategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"outline"}
        className="w-[60px] lg:w-[102px] h-[40px] text-base lg:text-xl font-medium leading-[26px] p-0 border"
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
        iconClassName="mr-0 lg:mr-2"
      >
        <span className="hidden lg:inline-block">Filter</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="p-0 lg:p-0 max-w-md w-full"
        isCloseIconVisible={false}
      >
        <FilterModal
          productsByCategory={productsByCategory}
          categories={categories}
          productsBySubcategory={productsBySubcategory}
        />
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

// Map category IDs to their corresponding filter option IDs
const categoryToFilterMap = {
  Cleansing: "cleansing",
  Hydration_And_Moisturiser: "moisturisers",
  Sunscreens: "sunscreens",
  Treatment: "treatments",
  Exfoliation: "exfoliation",
  Masks: "masks",
  EyeCare: "eye-care",
  LipCare: "lip-care"
};

// Map subcategories to their filter option IDs
const subcategoryToFilterMap = {
  "cleansing_gel_foam": "cleansing-gel-foam",
  "cleansing_oil_balm": "cleansing-oil-balm",
  "micellar_water": "micellar-water",
  "moisturiser": "moisturisers",
  "chemical_sunscreen": "chemical-sunscreen",
  "physical_sunscreen": "physical-sunscreen",
  "serum": "serum",
  "toner": "toner",
  "physical_scrub": "physical-scrub",
  "chemical_exfoliator": "chemical-exfoliator",
  "enzyme_peel": "enzyme-peel",
  "mask": "mask",
  "eye_care": "eye-care",
  "lip_care": "lip-care"
};

function FilterModal({ productsByCategory, categories, productsBySubcategory }: {
  productsByCategory: ProductsByCategory,
  categories: Categories,
  productsBySubcategory: ProductsBySubcategory
}) {
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
    },
    { id: "price-low-high", label: "Price: Low to High", checked: false },
    { id: "price-high-low", label: "Price: High to Low", checked: false },
  ]);

  // Initialize filter options based on available subcategories
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(() => {
    // Create parent category options
    const parentOptions: FilterOption[] = Object.keys(categoryToFilterMap).map(category => {
      const filterId = categoryToFilterMap[category as keyof typeof categoryToFilterMap];

      // Special handling for categories with only one subcategory
      if (category === 'Masks' || category === 'EyeCare' || category === 'LipCare' || categories[category]?.length === 1) {
        // For these categories, we don't show subcategories
        const subcategory = categories[category]?.[0] || '';
        const hasProducts = productsByCategory[category]?.all?.length > 0;

        return {
          id: filterId,
          label: category.replace(/_/g, ' '),
          checked: hasProducts
          // No children for these categories
        };
      }

      // For categories with multiple subcategories
      const children = (categories[category] || []).map(subcategory => {
        const subFilterId = subcategoryToFilterMap[subcategory as keyof typeof subcategoryToFilterMap];

        // Check if this subcategory has any products
        const hasSubProducts = productsBySubcategory &&
                              productsBySubcategory[subcategory] &&
                              productsBySubcategory[subcategory].length > 0;

        return {
          id: subFilterId || subcategory,
          label: subcategory.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          checked: hasSubProducts // Pre-check if there are products
        };
      });

      // Check if all subcategories are checked
      const allChildrenChecked = children.every(child => child.checked);

      return {
        id: filterId,
        label: category.replace(/_/g, ' '),
        checked: allChildrenChecked,
        children: children
      };
    });

    return parentOptions;
  });

  const handleSortChange = (id: string, checked: boolean) => {
    setSortOptions((prev) =>
      prev.map((option) => {
        if (option.id === id) {
          return { ...option, checked };
        } else if (option.children) {
          const updatedChildren = option.children.map((child) => {
            if (child.id === id) {
              return { ...child, checked };
            }
            return child;
          });
          return { ...option, children: updatedChildren };
        }
        return option;
      })
    );
  };

  const handleFilterChange = (id: string, checked: boolean) => {
    setFilterOptions((prev) =>
      prev.map((option) => {
        if (option.id === id) {
          // If parent is checked/unchecked, update all children
          if (option.children) {
            return {
              ...option,
              checked,
              children: option.children.map(child => ({
                ...child,
                checked
              }))
            };
          }
          return { ...option, checked };
        } else if (option.children) {
          const updatedChildren = option.children.map((child) => {
            if (child.id === id) {
              return { ...child, checked };
            }
            return child;
          });

          // Check if all children are checked, then check parent too
          const allChildrenChecked = updatedChildren.every(child => child.checked);

          return {
            ...option,
            checked: allChildrenChecked,
            children: updatedChildren
          };
        }
        return option;
      })
    );
  };

  const handleClear = () => {
    setSortOptions((prev) =>
      prev.map((option) => {
        if (option.children) {
          return {
            ...option,
            checked: false,
            children: option.children.map((child) => ({
              ...child,
              checked: false,
            })),
          };
        }
        return { ...option, checked: false };
      })
    );

    setFilterOptions((prev) =>
      prev.map((option) => {
        if (option.children) {
          return {
            ...option,
            checked: false,
            children: option.children.map((child) => ({
              ...child,
              checked: false,
            })),
          };
        }
        return { ...option, checked: false };
      })
    );
  };

  return (
    <div className="bg-white rounded-3xl p-[20px] w-[340px]">
      {/* Sort Section */}
      <div className="w-full">
        <div className=" flex items-center justify-between">
          <h2 className="text-base font-semibold leading-[24px] tracking-[-0.03em] text-accent">
            Sort
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
            "space-y-4 pt-3 px-[9.5px] transition-all duration-200 ease-in-out h-[0px] overflow-auto -z-10 opacity-0",
            {
              "h-[200px] opacity-100": sortExpanded,
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
        <div className=" flex items-center justify-between">
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
            "space-y-4 pt-3 px-[9.5px] transition-all duration-200 ease-in-out h-[0px] overflow-auto -z-10 opacity-0",
            {
              "h-[350px] opacity-100": filterExpanded,
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
      <div className="px-[5px] flex justify-start gap-3 mt-[25px]">
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