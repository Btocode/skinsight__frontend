import BackButton from "@/components/common/BackButton";
import Spinner from "@/components/common/Spinner";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

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

const BuilderRegimen = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const name = (await params).name;

  if (!folderNames.includes(name)) {
    notFound();
  }

  const components: { [key: string]: JSX.Element } = {
    "comfortable-products-count": <ComfortableProductCount />,
    "using-products-selection": <UsingProductsSelection />,
  };

  return (
    <section className="container flex justify-center items-center min-h-[85svh] relative">
      <div className="flex flex-col  items-start gap-2">
        <BackButton />
        {components[name]}
      </div>
    </section>
  );
};

export default BuilderRegimen;
