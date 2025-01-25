// "use client";
// import Button from "@/components/common/Button";
// import GradientImage from "@/components/common/GradientImage";
// import HeadingPrimary from "@/components/common/HeadingPrimary";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// const items = ["Add a cleanser", "Add a SPF", "Add a moisturiser"];

// const UsingProductsSelection = () => {
//   const [attachments, setAttachments] = useState<
//     { label: string; value: File }[]
//   >([]);

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const newAttachments = Array.from(files).map((file) => ({
//         label: file.name,
//         value: file,
//       }));
//       setAttachments((prevAttachments) => [
//         ...prevAttachments,
//         ...newAttachments,
//       ]);
//     }
//   };

//   const onRemoveAttachment = (index: number) => {
//     setAttachments((prevAttachments) =>
//       prevAttachments.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <div className="max-w-2xl w-full space-y-6">
//       <article className="lg:space-y-4">
//         <h4 className="hidden lg:block text-accent text-2xl font-semibold leading-[26px]">
//           Build your personal
//         </h4>
//         <HeadingPrimary className="lg:text-[50px] leading-[44px] lg:leading-[62px]">
//           <span>Build your personal</span> Skin regimen
//         </HeadingPrimary>
//         <p className="hidden lg:block text-accent text-lg font-normal leading-[27px] tracking-[-0.03em]">
//           Fill out the products you use and let us generate your new regimen
//           with missing products and let you know about the products not suited
//           for your skin
//         </p>
//       </article>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//         {items.map((item) => {
//           return (
//             <label
//               htmlFor={item}
//               key={item}
//               className={cn(
//                 "h-[250px] bg-[#8599FE26] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg flex items-center justify-center"
//               )}
//             >
//               <input
//                 type="file"
//                 name="using-products"
//                 id={item}
//                 hidden
//                 onChange={onFileChange}
//               />
//               <div className="flex flex-col items-center gap-4">
//                 <svg
//                   width="41"
//                   height="40"
//                   viewBox="0 0 41 40"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
//                     stroke="#8599FE"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//                 <p className="text-base font-semibold leading-[23px] tracking-[-0.03em] text-primary">
//                   {item}
//                 </p>
//               </div>
//             </label>
//           );
//         })}
//       </div>
//       <Button disabled>Generate</Button>
//       <GradientImage firstImage={{ className: "lg:left-96", width: 600 }} />
//     </div>
//   );
// };

// export default UsingProductsSelection;

"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { useRouter } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import SelectProductForSkinRegimen from "./SelectProductForSkinRegimen";
import { onClearPersonalRegimen } from "@/redux/slices/regimenSlice";

const items = [
  { id: "cleanser", label: "Add a cleanser" },
  { id: "spf", label: "Add a SPF" },
  { id: "moisturiser", label: "Add a moisturiser" },
];

const UsingProductsSelection = () => {
  const [regimenType, setRegimenType] = useState<string | null>(null);
  const router = useRouter();
  const selectedRegimens = useAppSelector(
    (regimen) => regimen.regimen.personalRegimen
  );
  const dispatch = useAppDispatch();

  const onGenerateRegimen = () => {
    router.push("/build-regimen/your-new-skin-regimen");
  };

  console.log(Object.keys(selectedRegimens).length >= 3);

  return (
    <div className="lg:container space-y-8">
      <article className="lg:space-y-2">
        <BackButton />
        <h4 className="hidden lg:block text-accent text-2xl font-semibold leading-[26px]">
          Build your personal
        </h4>
        <HeadingPrimary className="hidden lg:block lg:text-[48px] lg:leading-[57.12px] font-semibold tracking-[-0.02em]">
          Skin regimen
        </HeadingPrimary>
        <HeadingPrimary className="block lg:hidden text-[38px] font-semibold leading-[45.22px] tracking-[-0.02em]">
          Build your <br /> personal skin regimen
        </HeadingPrimary>
        <p className="hidden lg:block max-w-[755px] text-accent text-lg font-normal leading-[27px] tracking-[-0.03em]">
          Fill out the products you use and let us generate your new regimen
          with missing products and let you know about the products not suited
          for your skin
        </p>
      </article>

      <div className="max-w-max grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-9">
        {items.map((item) => {
          const attachment = selectedRegimens[item.id];

          return attachment ? (
            <div
              key={item.id}
              className="relative w-[182px] h-[224px] rounded-xl border border-[#E1E1E1] flex items-center justify-center"
            >
              <Image
                src={attachment.productImage}
                alt={attachment.productId}
                fill
                className="object-cover p-2"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(onClearPersonalRegimen(item.id));
                }}
                className="absolute -top-2 -right-2 w-[23px] h-[23px] cursor-pointer rounded-[6px] bg-[#E1E1E1] flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 opacity-50"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              key={item.id}
              className={cn(
                "relative inset-0 w-[182px] h-[224px] rounded-lg flex items-center justify-center overflow-hidden",
                "bg-[#8599FE26] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
              )}
              onClick={() => setRegimenType(item.id)}
            >
              <div className="flex flex-col items-center gap-4">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
                    stroke="#8599FE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base font-semibold leading-[23px] tracking-[-0.03em] text-primary">
                  {item.label && item.label}
                </p>
              </div>
            </button>
          );
        })}

        {Object.keys(selectedRegimens).length < 3 ? null : selectedRegimens[
            "missing-something"
          ] ? (
          <div className="relative w-[182px] h-[224px] rounded-xl border border-[#E1E1E1] flex items-center justify-center">
            <Image
              src={selectedRegimens["missing-something"]?.productImage}
              alt={selectedRegimens["missing-something"]?.productId}
              fill
              className="object-cover p-2"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(onClearPersonalRegimen("missing-something"));
              }}
              className="absolute -top-2 -right-2 w-[23px] h-[23px] cursor-pointer rounded-[6px] bg-[#E1E1E1] flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 opacity-50"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            className={cn(
              "relative inset-0 w-[182px] h-[224px] rounded-lg flex items-center justify-center overflow-hidden px-[18px]",
              "bg-[#8599FE26] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
            )}
            onClick={() => setRegimenType("missing-something")}
          >
            <div className="flex flex-col items-center gap-4">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
                  stroke="#8599FE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h4 className="text-[15.39px] font-semibold leading-[23.08px] tracking-[-0.03em] text-primary">
                Missing something?
              </h4>
              <p className="text-sm font-normal leading-[21px] tracking-[-0.03em] text-primary">
                Add another category in your routine
              </p>
            </div>
          </button>
        )}
      </div>
      <Button
        onClick={onGenerateRegimen}
        disabled={Object.keys(selectedRegimens).length === 0}
      >
        Generate
      </Button>
      {regimenType && (
        <SelectProductForSkinRegimen
          regimenType={regimenType}
          onClose={() => setRegimenType(null)}
        />
      )}
      <GradientImage firstImage={{ className: "lg:left-96", width: 600 }} />
    </div>
  );
};

export default UsingProductsSelection;
