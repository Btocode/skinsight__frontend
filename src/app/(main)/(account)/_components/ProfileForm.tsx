"use client";

import SettingsModal from "./SettingsModal";

export default function ProfileForm() {
  return (
    <div className="max-w-3xl mx-auto p-10 bg-gray-100 rounded-lg relative">
      <SettingsModal />

      <form className="max-w-xl space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile info</h2>
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="text"
            defaultValue="Miranda Kelly"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="email"
            defaultValue="miranda.kelly@gmail.com"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="password"
            defaultValue="••••••••••"
            className="w-full px-3 py-4 rounded-md bg-white"
          />
        </div>
        <div className="w-full lg:w-[70%]">
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
