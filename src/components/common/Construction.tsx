import Image from "next/image";
import Link from "next/link";
import React from "react";

const UnderConstructionPage: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full flex flex-col items-center gap-2">
          <Image
            src="/icons/work-in-progress.png"
            alt="Under Construction"
            width={130}
            height={80}
          />
          <p className="text-gray-600 m-4">
            We're working hard to bring you an improved experience. Please check
            back soon.
          </p>
          <Link
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Please check back later
          </Link>
        </div>
      </div>
    );
}


export default UnderConstructionPage;