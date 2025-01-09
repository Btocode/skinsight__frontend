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

const items = [
  { id: "cleanser", label: "Add a cleanser" },
  { id: "spf", label: "Add a SPF" },
  { id: "moisturiser", label: "Add a moisturiser" },
];

const UsingProductsSelection = () => {
  const [attachments, setAttachments] = useState<
    { id: string; label: string; value: File; preview: string }[]
  >([]);
  const router = useRouter();

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAttachments((prev) => {
        // Remove any existing attachment with the same id
        const filtered = prev.filter((a) => a.id !== itemId);
        return [
          ...filtered,
          { id: itemId, label: file.name, value: file, preview },
        ];
      });
    }
  };

  const onRemoveAttachment = (id: string) => {
    setAttachments((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      const attachment = prev.find((a) => a.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.preview);
      }
      return filtered;
    });
  };

  const onGenerateRegimen = () => {
    router.push("/build-regimen/your-new-skin-regimen");
  };

  return (
    <div className="max-w-2xl w-full space-y-6">
      <article className="lg:space-y-4">
        <BackButton buttonProps={{ className: "flex lg:hidden" }} />
        <h4 className="hidden lg:block text-accent text-2xl font-semibold leading-[26px]">
          Build your personal
        </h4>
        <HeadingPrimary className="lg:text-[50px] leading-[44px] lg:leading-[62px]">
          <span>Build your personal</span>{" "}
          <span className="text-[#8599FE]">Skin regimen</span>
        </HeadingPrimary>
        <p className="hidden lg:block text-accent text-lg font-normal leading-[27px] tracking-[-0.03em]">
          Fill out the products you use and let us generate your new regimen
          with missing products and let you know about the products not suited
          for your skin
        </p>
      </article>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => {
          const attachment = attachments.find((a) => a.id === item.id);

          return attachment ? (
            <div className="relative h-[224px] lg:h-[250px] rounded-lg flex items-center justify-center">
              <Image
                src={attachment.preview}
                alt={attachment.label}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRemoveAttachment(item.id);
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
            <label
              htmlFor={item.id}
              key={item.id}
              className={cn(
                "relative h-[224px] lg:h-[250px] rounded-lg flex items-center justify-center overflow-hidden",
                "bg-[#8599FE26] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
              )}
            >
              <input
                type="file"
                name="using-products"
                id={item.id}
                hidden
                accept="image/*"
                onChange={(e) => onFileChange(e, item.id)}
              />

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
                  {attachment ? "Missing something?" : item.label}
                </p>
              </div>
            </label>
          );
        })}
      </div>
      <Button
        onClick={onGenerateRegimen}
        disabled={attachments.length !== items.length}
      >
        Generate
      </Button>
      <GradientImage firstImage={{ className: "lg:left-96", width: 600 }} />
    </div>
  );
};

export default UsingProductsSelection;
