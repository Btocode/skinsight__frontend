import Button from "@/components/common/Button";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { cn } from "@/lib/utils";

const items = ["Add a cleanser", "Add a SPF", "Add a moisturiser"];

const UsingProductsSelection = () => {
  return (
    <div className="max-w-2xl w-full space-y-6">
      <article className="space-y-4">
        <h4 className="text-accent text-2xl font-semibold leading-[26px]">
          Build your personal
        </h4>
        <HeadingPrimary className="lg:text-[50px] leading-[52px]">
          Skin regimen
        </HeadingPrimary>
        <p className="text-accent text-lg font-normal leading-[27px] tracking-[-0.03em]">
          Fill out the products you use and let us generate your new regimen
          with missing products and let you know about the products not suited
          for your skin
        </p>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => {
          return (
            <label
              htmlFor={item}
              key={item}
              className={cn(
                "h-[250px] bg-[#8599FE26] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg flex items-center justify-center"
              )}
            >
              <input type="file" name="using-products" id={item} hidden />
              <div className="flex flex-col items-center gap-4">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
                    stroke="#8599FE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-base font-semibold leading-[23px] tracking-[-0.03em] text-primary">
                  {item}
                </p>
              </div>
            </label>
          );
        })}
      </div>
      <Button>Generate</Button>
      <GradientImage firstImage={{ className: "lg:left-96", width: 600 }} />
    </div>
  );
};

export default UsingProductsSelection;
