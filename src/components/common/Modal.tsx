// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "motion/react";
// import React, { useState, useEffect } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
//   contentClassName?: string;
//   closeBtnClassName?: string;
//   id?: string;
//   isCloseIconVisible?: boolean;
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className,
//   contentClassName,
//   closeBtnClassName,
//   isCloseIconVisible = true,
//   id,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(isOpen);

//   useEffect(() => {
//     setIsModalOpen(isOpen);
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("keydown", handleEscape);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isModalOpen, onClose]);

//   // disabled scrolling
//   useEffect(() => {
//     if (isOpen) {
//       console.log({ isOpen });
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpen]);

//   // if (!isOpen) return null;
//   function anim() {
//     return {
//       initial: {
//         opacity: 0,
//       },
//       animate: {
//         opacity: 1,
//       },
//       exit: {
//         opacity: 0,
//       },
//       transition: {
//         duration: 0.5,
//         ease: "easeInOut",
//       },
//     };
//   }

//   return (
//     <AnimatePresence>
//       {isModalOpen && (
//         <motion.div
//           id={id}
//           className={cn(
//             `fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none transition-opacity duration-300`,
//             className
//             // {
//             //   "opacity-0 pointer-events-none": !isModalOpen,
//             //   "opacity-100": isModalOpen,
//             // }
//           )}
//           {...anim()}
//         >
//           <motion.div
//             className="fixed inset-0 bg-[#20293B8C] transition-opacity duration-300 ease-in-out"
//             onClick={onClose}
//             // style={{ opacity: isModalOpen ? 0.5 : 0 }}
//             id="modal-backdrop"
//             {...anim()}
//           ></motion.div>
//           <motion.div
//             className={`relative w-auto  my-6 transition-all duration-300 ease-in-out ${
//               isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
//             }`}
//             {...anim()}
//           >
//             <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
//               {isCloseIconVisible && (
//                 <button
//                   className={cn(
//                     "absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer z-20",
//                     closeBtnClassName
//                   )}
//                   onClick={onClose}
//                 >
//                   <svg
//                     className="h-7 w-7 stroke-slate-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               )}
//               <div
//                 className={cn(
//                   "relative p-2 lg:p-6 flex-auto",
//                   contentClassName
//                 )}
//               >
//                 {children}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Modal;
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  closeBtnClassName?: string;
  id?: string;
  isCloseIconVisible?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  contentClassName,
  closeBtnClassName,
  isCloseIconVisible = true,
  id,
}) => {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]); // Dependency on `isOpen` ensures this runs when `isOpen` changes

  // Animation configuration
  const animationConfig = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none",
            className
          )}
          {...animationConfig}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#20293B8C] transition-opacity duration-300 ease-in-out"
            onClick={onClose}
            {...animationConfig}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className={cn(
              "relative w-auto my-6 transition-all duration-300 ease-in-out",
              isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            )}
            {...animationConfig}
          >
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Close Button */}
              {isCloseIconVisible && (
                <button
                  className={cn(
                    "absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer z-20",
                    closeBtnClassName
                  )}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    className="h-7 w-7 stroke-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* Modal Body */}
              <div
                className={cn(
                  "relative p-2 lg:p-6 flex-auto",
                  contentClassName
                )}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
