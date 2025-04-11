"use client";
import { Accordion } from "@/components/common/Accordion";
import { useState } from "react";

const ProductAccordion = ({
  description,
  ingredients,
  benefits,
  targets,
  suitable_for,
}) => {
  const [activeId, setActiveId] = useState("1"); // Start with the first accordion open

  const handleToggle = (id: string) => {
    setActiveId(id === activeId ? "" : id); // Toggle the active accordion
  };

  return (
    <div className="max-w-[800px] flex flex-col gap-3 lg:gap-1 mt-6">
      <Accordion
        title="Formulation and Key Ingredients"
        content={ingredients}
        isActive={activeId === "1"}
        onToggle={() => handleToggle("1")}
      />
      <Accordion
        title="Benefits"
        content={benefits}
        isActive={activeId === "2"}
        onToggle={() => handleToggle("2")}
      />
      <Accordion
        title="Targets"
        content={targets}
        isActive={activeId === "3"}
        onToggle={() => handleToggle("3")}
      />
      <Accordion
        title="Suitable for"
        content={suitable_for}
        isActive={activeId === "4"}
        onToggle={() => handleToggle("4")}
      />
    </div>
  );
};

export default ProductAccordion;
