import { notFound } from "next/navigation";
import SelectLayout from "../_components/SelectLayout";

const folderNames = [
  "gender",
  "skin-type",
  "complexion",
  "skin-concern",
  "age",
  "region",
  "find-perfect-match",
];
export function generateStaticParams() {
  return folderNames.map((name) => ({ name }));
}

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const name = (await params).name;

  if (!folderNames.includes(name)) {
    notFound();
  }

  return <SelectLayout name={name} />;
};

export default Page;
