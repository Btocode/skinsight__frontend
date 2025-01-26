"use client";

const SettingsBackButton = ({ onClick }: { onClick: () => void }) => {

  return (
    <button onClick={onClick} className="flex items-center gap-2 text-base font-medium text-accent justify-start">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12.5L8 17.5M3 12.5L8 7.5M3 12.5H21" stroke="#2C2C2C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  );
};

export default SettingsBackButton;
