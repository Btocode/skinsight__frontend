"use client";

import { Combobox, Option } from "@/components/common/Combobox";
import Link from "next/link";
import { useState } from "react";

const countries = [
  { value: "af", label: "Afghanistan" },
  { value: "us", label: "America" },
  { value: "al", label: "Albania" },
  { value: "dz", label: "Algeria" },
  { value: "as", label: "American Samoa" },
  { value: "ao", label: "Angola" },
  { value: "ai", label: "Anguilla" },
  { value: "aq", label: "Antarctica" },
  { value: "ag", label: "Antigua and Barbuda" },
  { value: "ar", label: "Argentina" },
  { value: "am", label: "Armenia" },
  { value: "aw", label: "Aruba" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "az", label: "Azerbaijan" },
];

const SelectRegion = () => {
  const [value, setValue] = useState<Option>();
  return (
    <div className="flex flex-col gap-6">
      <Combobox
        options={countries}
        placeholder="Select"
        value={value}
        onChange={(value) => setValue(value)}
      />
      <div className="flex items-center gap-4">
        <Link href={"/find-products/find-perfect-match"}>
          <button className="btn-primary">Next</button>
        </Link>
        <Link href={"/find-products/find-perfect-match"}>
          <button className="outline-none border border-primary text-primary  px-8 py-3 rounded-lg">
            Skip
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectRegion;
