import Button from "@/components/common/Button";
import { Switch } from "@/components/common/Switch";
import SettingsBackButton from "@/components/common/SettingsBackButton";
const MarketingPreference = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[380px] lg:w-[580px] py-5 px-3">
      <SettingsBackButton onClick={onClose} />
      <h2 className="text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Marketing preferences
      </h2>
      <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
      <ul className="list-none m-0 space-y-10 mb-8">
        <Step enabled label="Send me marketing emails" />
        <Step enabled={false} label="Send me new updates about Skinsight" />
        <Step enabled label="Use my data to improve Skinsight algorithms" />
      </ul>
      <Button onClick={onClose} className="py-3 px-6 text-[20px] w-[150px]">Close</Button>
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
