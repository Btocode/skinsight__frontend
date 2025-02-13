"use client";
import { ages } from "@/utils/products";
import Card from "./Card";
import { RecommendationComponentProps } from "@/types/products";

const SelectAge = ({ value, onChange }: RecommendationComponentProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
      {ages.map((item, index) => (
        <Card
          key={index}
          onClick={() =>
            onChange("age", Array.isArray(item) ? item.join(" ") : item)
          }
          checked={value === item}
          contentClassName="pr-4 lg:pr-0"
        >
          {Array.isArray(item) ? (
            <>
              <h3 className="text-xl font-semibold">{item[0]}</h3>
              <h3 className="text-xl font-semibold">{item[1]}</h3>
            </>
          ) : (
            <h3 className="text-xl font-semibold">{item}</h3>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SelectAge;
