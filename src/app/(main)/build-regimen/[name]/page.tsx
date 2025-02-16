import SectionTransform from "@/components/animations/SectionTransform";
import BackButton from "@/components/common/BackButton";
import Spinner from "@/components/common/Spinner";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { use } from "react";

const ComfortableProductCount = dynamic(
  () => import("../_components/ComfortableProductCount"),
  { loading: () => <Spinner /> }
);

const UsingProductsSelection = dynamic(
  () => import("../_components/UsingProductsSelection"),
  { loading: () => <Spinner /> }
);

const folderNames = ["comfortable-products-count", "using-products-selection"];

export const generateStaticParams = () => {
  return folderNames.map((name) => ({ name }));
};

const BuilderRegimen = ({ params }: { params: Promise<{ name: string }> }) => {
  const name = use(params).name;

  if (!folderNames.includes(name)) {
    notFound();
  }

  const components: { [key: string]: JSX.Element } = {
    "comfortable-products-count": <ComfortableProductCount />,
    "using-products-selection": <UsingProductsSelection />,
  };

  return (
    <SectionTransform
      type={name === "using-products-selection" ? "left" : "up"}
    >
      <section
        className={cn(
          "container flex  lg:items-center min-h-[85svh] py-8 lg:py-10 relative",
          {
            "justify-center": name === "comfortable-products-count",
          }
        )}
      >
        <div>
          {name === "comfortable-products-count" && <BackButton />}
          {components[name]}
        </div>
      </section>
    </SectionTransform>
  );
};

export default BuilderRegimen;
