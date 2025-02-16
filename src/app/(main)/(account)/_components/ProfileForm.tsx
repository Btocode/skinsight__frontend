/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/lib/redux/hook";
import SettingsModal from "./SettingsModal";

export default function ProfileForm() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="max-w-3xl mx-auto p-10 bg-[#E1E1E14D] rounded-2xl relative">
      <SettingsModal />

      <form className="max-w-xl space-y-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-semibold text-[#2C2C2C]">
            Profile info
          </h2>
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="text"
            defaultValue={user?.display_name || ""}
            className="w-full px-3 py-4 rounded-xl bg-white text-[20px] font-normal text-[#2C2C2C]"
            placeholder="Display Name"
          />
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="email"
            defaultValue={user?.email || ""}
            className="w-full px-3 py-4 rounded-xl bg-[#E1E1E1] text-[20px] font-normal text-[#2C2C2C] cursor-not-allowed opacity-70"
            placeholder="Email"
            disabled
          />
        </div>
        <div className="w-full lg:w-[70%]">
          <input
            type="text"
            defaultValue={(user && (user as any)?.country) || "United States"}
            className="w-full px-3 py-4 rounded-xl bg-white text-[20px] font-normal text-[#2C2C2C]"
            placeholder="Country"
          />
        </div>
        <button
          type="submit"
          className="btn-primary text-[20px] font-normal w-[160px] lg:h-[58px]"
        >
          Save
        </button>
      </form>
    </div>
  );
}
