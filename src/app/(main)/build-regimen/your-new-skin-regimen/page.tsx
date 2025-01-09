import Advertisement from "@/components/common/Advertisement";
import BackButton from "@/components/common/BackButton";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddFavorite from "../../find-products/your-skin-matches/_components/AddFavorite";
import SkinRegimenTabs from "./_components/SkinRegimenTabs";

const getYourSkinRegimen = async () => {
  const response = await fetch("http://localhost:3000/api/build-regimen");
  return response.json();
};

const YourNewSkinRegimenPage = async () => {
  const skinRegimens = await getYourSkinRegimen();

  if (skinRegimens?.length === 0) {
    notFound();
  }
  return (
    <div className="container py-10 relative">
      <div className="space-y-4">
        <BackButton />
        <h4 className="text-2xl font-semibold leading-[26px]">
          Here&apos;s your new
        </h4>
        <HeadingPrimary className="lg:text-[48px] lg:leading-[57.12px] leading-[44px]">
          Skin regimen
        </HeadingPrimary>
        <p className="max-w-[720px] text-[#2C2C2C] text-lg font-normal leading-[27px] tracking-[-0.03em]">
          Fill out the products you use and let us generate your new regimen
          with missing products and let you know about the products not suited
          for your skin
        </p>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center gap-2 rounded-xl px-4  bg-violet-200 py-3 text-violet-600 transition-colors hover:bg-violet-200">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L8.10764 6.61227L8.10967 6.61396C8.78785 7.11128 9.12714 7.3601 9.49876 7.45621C9.82723 7.54117 10.1725 7.54117 10.501 7.45621C10.8729 7.36001 11.2132 7.11047 11.8926 6.61227C11.8926 6.61227 15.8101 3.60594 18 2M1 11.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40973 1.71547 1.71547 1.40973 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H15.8002C16.9203 1 17.4796 1 17.9074 1.21799C18.2837 1.40973 18.5905 1.71547 18.7822 2.0918C19 2.5192 19 3.07899 19 4.19691V11.8036C19 12.9215 19 13.4805 18.7822 13.9079C18.5905 14.2842 18.2837 14.5905 17.9074 14.7822C17.48 15 16.921 15 15.8031 15H4.19691C3.07899 15 2.5192 15 2.0918 14.7822C1.71547 14.5905 1.40973 14.2842 1.21799 13.9079C1 13.4801 1 12.9203 1 11.8002Z"
                stroke="#8F80E8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Email results</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl px-4  bg-pink-100 py-3 text-pink-500 transition-colors hover:bg-pink-200">
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 14H1.5V19M10.5 6H15.5V1M1.08301 7.0034C1.64369 5.61566 2.58244 4.41304 3.79255 3.53223C5.00266 2.65141 6.43686 2.12752 7.92975 2.02051C9.42265 1.9135 10.9147 2.2274 12.2381 2.92661C13.5615 3.62582 14.6612 4.68254 15.4141 5.97612M15.9176 12.9971C15.3569 14.3848 14.4181 15.5874 13.208 16.4682C11.9979 17.3491 10.5652 17.8723 9.07227 17.9793C7.57937 18.0863 6.08606 17.7725 4.7627 17.0732C3.43933 16.374 2.33882 15.3175 1.58594 14.0239"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Regenerate</span>
          </button>
        </div>
      </div>

      <SkinRegimenTabs />

      <div className="max-w-[1420px] mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {skinRegimens?.map((item, index) => (
          <div
            key={index}
            className="w-full rounded-xl bg-white p-6 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]"
          >
            <div className="flex flex-col gap-6 h-[450px]">
              <h5 className="text-[#575656] text-xl font-semibold leading-[30px] tracking-[-0.03em]">
                {item?.guide}
              </h5>
              <div className="h-60 w-48 relative mx-auto">
                <Image
                  src={item.productImage}
                  alt={item.productTitle}
                  fill
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Product Info */}
              <div className="flex-1 w-full space-y-2">
                <h2 className="text-xs font-normal leading-[18px] tracking-[-0.03em] text-accent">
                  {item.brand}
                </h2>
                <h3 className="text-base font-semibold leading-[24px] tracking-[-0.03em] text-accent">
                  {item.productTitle}
                </h3>
                <p className="text-xs font-normal leading-[18px] tracking-[-0.03em] text-accent">
                  {item?.desc}
                </p>
              </div>
              {/* Buttons */}
              <div className="flex w-full gap-4">
                <AddFavorite />
                <button
                  type="button"
                  id="buy-now"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-pink-100 py-4 text-pink-600 transition-colors hover:bg-pink-200"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M3.5 16.8002V7.2002C3.5 6.08009 3.5 5.51962 3.71799 5.0918C3.90973 4.71547 4.21547 4.40973 4.5918 4.21799C5.01962 4 5.58009 4 6.7002 4H18.3002C19.4203 4 19.9796 4 20.4074 4.21799C20.7837 4.40973 21.0905 4.71547 21.2822 5.0918C21.5 5.5192 21.5 6.07899 21.5 7.19691V16.8036C21.5 17.9215 21.5 18.4805 21.2822 18.9079C21.0905 19.2842 20.7837 19.5905 20.4074 19.7822C19.98 20 19.421 20 18.3031 20H6.69691C5.57899 20 5.0192 20 4.5918 19.7822C4.21547 19.5905 3.90973 19.2842 3.71799 18.9079C3.5 18.4801 3.5 17.9203 3.5 16.8002Z"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </svg>
                  <span>Buy now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Advertisement />
      <Footer />
      <GradientImage />
    </div>
  );
};

export default YourNewSkinRegimenPage;
