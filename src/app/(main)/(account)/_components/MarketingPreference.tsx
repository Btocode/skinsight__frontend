import Button from "@/components/common/Button";
import { Switch } from "@/components/common/Switch";

const MarketingPreference = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[380px] lg:w-[550px]">
      <Button
        variant={"back"}
        onClick={onClose}
        icon={
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12.5L8 17.5M3 12.5L8 7.5M3 12.5H21"
              stroke="#2C2C2C"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        Back
      </Button>
      <h2 className="text-base lg:text-xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Marketing preferences
      </h2>
      <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
      <ul className="list-none m-0 space-y-6 mb-8">
        <Step enabled label="Send me marketing emails" />
        <Step enabled={false} label="Send me new updates about Skinsight" />
        <Step enabled label="Use my data to improve Skinsight algorithms" />
      </ul>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default MarketingPreference;

const Step = ({ label, enabled }: { label: string; enabled: boolean }) => {
  return (
    <li className="flex items-center justify-between cursor-pointer">
      <span className="text-base lg:text-xl font-semibold leading-[30px] tracking-[-0.03em] text-[#575656]">
        {label}
      </span>
      <Switch enabled={enabled} onToggle={() => {}} />
    </li>
  );
};
