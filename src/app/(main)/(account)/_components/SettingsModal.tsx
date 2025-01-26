"use client";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Image from "next/image";
import { useCallback, useState } from "react";
import MarketingPreference from "./MarketingPreference";
import ChangePassword from "./ChangePassword";
import DownloadData from "./DownloadData";
import DeleteAccount from "./DeleteAccount";
import AccountDeleteSuccess from "./AccountDeleteSuccess";

const SettingsModal = () => {
  const [state, setState] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onStateClose = () => setState(null);

  const onClose = useCallback(() => {
    setOpen(false);
    onStateClose();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute right-8 top-8 text-gray-500 hover:text-gray-700"
        aria-label="Settings"
      >
        <Image src={"/settings.svg"} alt="settings" width={30} height={30} />
      </button>
      <Modal isOpen={open} onClose={onClose}>
        {state === "marketing" ? (
          <MarketingPreference onClose={onStateClose} />
        ) : state === "password" ? (
          <ChangePassword onClose={onStateClose} />
        ) : state === "download" ? (
          <DownloadData onClose={onStateClose} />
        ) : state === "delete" ? (
          <DeleteAccount setState={setState} onClose={onStateClose} />
        ) : state === "delete-success" ? (
          <AccountDeleteSuccess onClose={onStateClose} />
        ) : (
          <div className="w-[380px] lg:w-[550px] lg:py-5 lg:px-2  ">
            <h2 className="text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111] mt-2 lg:mt-0">
              Account Settings
            </h2>
            <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
            <ul className="list-none m-0 space-y-10 mb-8">
              <Step
                onClick={() => setState("marketing")}
                label="Change my marketing preferences"
              />
              <Step
                onClick={() => setState("password")}
                label="Change my password"
              />
              <Step
                onClick={() => setState("download")}
                label="Download my data"
              />
              <Step
                onClick={() => setState("delete")}
                label="Delete my account"
              />
            </ul>
            <Button onClick={onClose} className="py-3 px-6 text-[20px] w-[150px]">Close</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SettingsModal;

const Step = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer"
    >
      <span className="text-base lg:text-xl font-semibold leading-[30px] tracking-[-0.03em] text-[#575656]">
        {label}
      </span>
      <span className="inline-block -rotate-90">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9.5L12 16.5L5 9.5"
            stroke="#8F80E8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </li>
  );
};
