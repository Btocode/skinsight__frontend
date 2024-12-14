"use client";

import Image from "next/image";

export default function ProfileForm() {
  return (
    <div className="max-w-3xl mx-auto p-10 bg-gray-100 rounded-lg relative">
      <button
        className="absolute right-8 top-8 text-gray-500 hover:text-gray-700"
        aria-label="Settings"
      >
        <Image src={"/settings.svg"} alt="settings" width={30} height={30} />
      </button>

      <form className="max-w-xl space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile info</h2>
        </div>
        <div>
          <input
            type="text"
            defaultValue="Miranda Kelly"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div>
          <input
            type="email"
            defaultValue="miranda.kelly@gmail.com"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div>
          <input
            type="password"
            defaultValue="••••••••••"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div>
          <input
            type="text"
            defaultValue="United States"
            className="w-full px-3 py-4 rounded-md border border-gray-200 bg-white"
          />
        </div>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
