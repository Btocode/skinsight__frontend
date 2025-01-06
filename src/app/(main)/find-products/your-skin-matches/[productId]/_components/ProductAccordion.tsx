"use client";
import { Accordion } from "@/components/common/Accordion";
import { useState } from "react";

const ProductAccordion = () => {
  const [activeId, setActiveId] = useState("1"); // Start with the first accordion open

  const handleToggle = (id: string) => {
    setActiveId(id === activeId ? "" : id); // Toggle the active accordion
  };

  return (
    <div className="max-w-[800px] flex flex-col gap-4 py-4">
      <Accordion
        title="Formulation and Key Ingredients"
        content="Houttuynia Cordata Extract (77%), Water, 1,2- Hexanediol, Glycerin, Betaine, Panthenol, Saccha- rum Officinarum (Sugarcane) Extract, Portulaca Oleracea Extract, Butylene Glycol, Vitex Agnus -Castus Extract, Chamomilla Recutita (Matricar- ia) Flower Extract, Arctium Lappa Root Extract, Phellinus Linteus Extract, Vitis Vinifera (Grape) Fruit Extract, Pyrus Malus (Apple) Fruit Extract, Centella Asiatica Extract, Isopentyldiol, Methylpro- panediol, Acrylates/C10-30 AlkyI Acrylate Cross- polymer, Tromethamine, Disodium EDTA"
        isActive={activeId === "1"}
        onToggle={() => handleToggle("1")}
      />
      <Accordion
        title="Benefits"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum repellat qui deserunt facilis ullam perspiciatis quis. Maiores, nisi. Neque iste sed nulla similique a fugit reiciendis quaerat tenetur repellendus."
        isActive={activeId === "2"}
        onToggle={() => handleToggle("2")}
      />
      <Accordion
        title="Targets"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum repellat qui deserunt facilis ullam perspiciatis quis. Maiores, nisi. Neque iste sed nulla similique a fugit reiciendis quaerat tenetur repellendus."
        isActive={activeId === "3"}
        onToggle={() => handleToggle("3")}
      />
      <Accordion
        title="Suitable for"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum repellat qui deserunt facilis ullam perspiciatis quis. Maiores, nisi. Neque iste sed nulla similique a fugit reiciendis quaerat tenetur repellendus."
        isActive={activeId === "4"}
        onToggle={() => handleToggle("4")}
      />
    </div>
  );
};

export default ProductAccordion;
