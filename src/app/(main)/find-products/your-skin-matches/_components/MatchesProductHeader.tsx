import BackButton from "@/components/common/BackButton";
import HeadingPrimary from "@/components/common/HeadingPrimary";

const MatchesProductHeader = () => {
  return (
    <div>
      <BackButton buttonProps={{ className: "mb-2" }} />
      <HeadingPrimary className="text-[28px] leading-[33.32px] lg:text-[42px] lg:leading-[49.98px] tracking-[-2%] font-semibold">
        Your skin matches
      </HeadingPrimary>
      <div className="flex items-center gap-2 mt-3">
        <div className="flex -space-x-4">
          <Avatar
            initials="NF"
            color="bg-pink-400"
            className="border-2 border-white"
          />
          <Avatar
            initials="SA"
            color="bg-emerald-400"
            className="border-2 border-white"
          />
          <Avatar
            initials="RK"
            color="bg-purple-400"
            className="border-2 border-white"
          />
        </div>
        <p className="text-[15px] lg:text-xl leading-[17.85px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal font-medium text-accent">
          We also found <strong>2,354 skin twins</strong>
        </p>
      </div>
    </div>
  );
};

export default MatchesProductHeader;

interface AvatarProps {
  initials: string;
  color: string;
  className?: string;
}

function Avatar({ initials, color, className = "" }: AvatarProps) {
  return (
    <div
      className={`h-[38px] w-[38px] rounded-full flex items-center justify-center text-white font-medium text-sm ${color} ${className}`}
    >
      {initials}
    </div>
  );
}
