"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRef, useState } from "react";
import GalleryModal from "./GalleryModal";

const galleryItems = [
  { id: 1, image: "/actions/img1.png", label: "Review" },
  { id: 2, image: "/actions/img2.png", label: "How to use" },
  { id: 3, image: "/actions/img3.png", label: "Toner hacks" },
  { id: 4, image: "/actions/img4.png", label: "Toners" },
  { id: 5, image: "/actions/img5.png", label: "Review" },
  { id: 6, image: "/actions/img6.png", label: "How to use" },
  { id: 7, image: "/actions/img1.png", label: "Toner hacks" },
  { id: 8, image: "/actions/img2.png", label: "Toners" },
  { id: 9, image: "/actions/img3.png", label: "Review" },
  { id: 10, image: "/actions/img4.png", label: "How to use" },
  { id: 11, image: "/actions/img5.png", label: "Toner hacks" },
  { id: 12, image: "/actions/img6.png", label: "Toners" },
];

export default function ProductGallery() {
  const [galleryItem, setGalleryItem] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="max-w-[800px] pt-4">
        <h2 className="text-2xl font-semibold mb-6">See it in action</h2>

        <div className="relative flex items-center justify-between gap-2">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
          >
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div
                  onClick={() => setGalleryItem(item.image)}
                  className="w-[86px] h-[86px] rounded-full border-2 border-rose-300 flex items-center justify-center overflow-hidden mb-2"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-gray-50 overflow-hidden relative">
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

          <Button
            variant="icon"
            size="small"
            className="-rotate-90 p-3"
            onClick={scrollRight}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9.5L12 16.5L5 9.5"
                stroke="#2C2C2C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      <GalleryModal open={!!galleryItem} onClose={() => setGalleryItem("")} />
    </>
  );
}
