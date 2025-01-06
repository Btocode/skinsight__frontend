import BackButton from "@/components/common/BackButton";
import HeadingPrimary from "@/components/common/HeadingPrimary";

const MatchesProductHeader = () => {
  return (
    <div>
      <BackButton />
      <HeadingPrimary className="leading-[44px]">
        Your skin matches
      </HeadingPrimary>
      <div className="flex items-center gap-2">
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
        <p className="text-xl text-accent">
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
      className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-medium text-sm ${color} ${className}`}
    >
      {initials}
    </div>
  );
}
