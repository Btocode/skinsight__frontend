"use client";
import Card from "./Card";
import { genders } from "@/utils/products";
import { RecommendationComponentProps } from "@/types/products";

const SelectGender = ({ value, onChange }: RecommendationComponentProps) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
      {genders.map((item, index) => (
        <Card
          key={index}
          onClick={() => onChange("gender", item)}
          checked={value === item}
        >
          <h3 className="text-xl font-semibold">{item}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectGender;
