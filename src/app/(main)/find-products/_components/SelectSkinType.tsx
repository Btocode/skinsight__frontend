import { RecommendationComponentProps } from "@/types/products";
import Card from "./Card";
import { skinTypes } from "@/utils/products";

const SelectSkinType = ({ value, onChange }: RecommendationComponentProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
      {skinTypes.map((item, index) => (
        <Card
          key={index}
          onClick={() => onChange("skin_type", item.toLowerCase())}
          checked={value === item.toLowerCase()}
        >
          <h3 className="text-xl font-semibold">
            {item === "unknown" ? "Not sure" : item || ""}
          </h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectSkinType;
