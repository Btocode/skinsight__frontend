"use client";
import BackButton from "@/components/common/BackButton";
import Modal from "@/components/common/Modal";
import Image from "next/image";
const galleryItems = [
  { id: 1, image: "/actions/img1.png", label: "Review" },
  { id: 2, image: "/actions/img2.png", label: "How to use" },
  { id: 3, image: "/actions/img3.png", label: "Toner hacks" },
  { id: 4, image: "/actions/img4.png", label: "Toners" },
  { id: 5, image: "/actions/img5.png", label: "Review" },
  { id: 6, image: "/actions/img6.png", label: "How to use" },
  { id: 7, image: "/actions/img1.png", label: "Toner hacks" },
];

const GalleryModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const embedUrl = `https://www.youtube.com/embed/kbVhf9q1AZM`;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <BackButton buttonProps={{ className: "hidden lg:flex" }} />
      <div className="w-[380px] lg:w-[800px]">
        <h2 className="hidden lg:block text-[32px] font-semibold leading-[32px] tracking-[-0.02em] lg:text-center">
          Watermelon Glow PHA+BHA
        </h2>
        <div className="mt-10 lg:mt-8 mb-4 lg:mb-0 w-full lg:max-w-2xl mx-auto h-[360px] overflow-hidden rounded-md">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clip
board-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg lg:text-[32px] font-semibold leading-[26px] lg:leading-[32px] tracking-[-0.02em] lg:text-center">
          Watermelon Glow PHA+BHA
        </h2>
        <div className="mt-8 pb-2 max-w-2xl mx-auto  flex  justify-between gap-4 overflow-x-auto scroll-smooth hide-scrollbar">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div className="w-[70px] h-[70px] rounded-full border-2 border-rose-300 flex items-center justify-center overflow-hidden mb-2">
                <div className="w-[64px] h-[64px] rounded-full border-2 border-gray-50 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;
