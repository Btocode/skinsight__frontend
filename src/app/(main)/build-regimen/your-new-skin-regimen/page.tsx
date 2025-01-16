import Advertisement from "@/components/common/Advertisement";
import BackButton from "@/components/common/BackButton";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import SkinRegimenTabs from "./_components/SkinRegimenTabs";
import { RegimenProduct } from "@/types/regimen";

const getYourSkinRegimen = async (): Promise<RegimenProduct[]> => {
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
        <h4 className="text-2xl font-semibold leading-[26px] text-accent">
          Here&apos;s your new
        </h4>
        <HeadingPrimary className="lg:text-[48px] lg:leading-[57.12px] tracking-[-0.02em] leading-[44px]">
          Skin regimen
        </HeadingPrimary>
        <p className="max-w-[755px] text-accent text-lg font-normal leading-[27px] tracking-[-3%]">
          Fill out the products you use and let us generate your new regimen
          with missing products and let you know about the products not suited
          for your skin
        </p>
        <div className="flex items-center gap-4">
          <button className="w-[141px] h-[48px] flex items-center justify-center gap-[10px] rounded-xl bg-[#8F80E833]">
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
            <span className="text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#8F80E8]">
              Email results
            </span>
          </button>
          <button className="w-[141px] h-[48px] flex items-center justify-center gap-[10px] rounded-xl bg-[#EDAFDF4D]">
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 14H1.5V19M10.5 6H15.5V1M1.08301 7.0034C1.64369 5.61566 2.58244 4.41304 3.79255 3.53223C5.00266 2.65141 6.43686 2.12752 7.92975 2.02051C9.42265 1.9135 10.9147 2.2274 12.2381 2.92661C13.5615 3.62582 14.6612 4.68254 15.4141 5.97612M15.9176 12.9971C15.3569 14.3848 14.4181 15.5874 13.208 16.4682C11.9979 17.3491 10.5652 17.8723 9.07227 17.9793C7.57937 18.0863 6.08606 17.7725 4.7627 17.0732C3.43933 16.374 2.33882 15.3175 1.58594 14.0239"
                stroke="#E77CCF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#E77CCF]">
              Regenerate
            </span>
          </button>
        </div>
      </div>
      <SkinRegimenTabs />
      <div className="max-w-[1116px] mx-auto  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skinRegimens?.map((item, index) => (
          <div
            key={index}
            className="w-full lg:w-[340px] lg:h-[397px] rounded-xl bg-white p-[9px] lg:p-5 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]"
          >
            <div className="flex flex-col">
              <h5 className="text-[#575656] text-base lg:text-xl font-semibold leading-[24px] lg:leading-[30px] tracking-[-0.03em]">
                {item?.guide}
              </h5>
              <div className="w-[108px] lg:w-[300px] h-[100px] lg:h-[204px] relative mx-auto">
                <Image
                  src={item.productImage}
                  alt={item.productTitle}
                  fill
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Product Info */}
              <div className="w-full space-y-[2px]">
                <h2 className="text-xs lg:text-[11.54px] font-normal leading-[18px] lg:leading-[17.31px] tracking-[-0.03em] text-[#575656]">
                  {item.brand}
                </h2>
                <h3 className="text-[15px] lg:text-[15.39px] font-semibold leading-[22.5px] lg:leading-[23.08px] tracking-[-0.03em] text-[#575656]">
                  {item.productTitle}
                </h3>
                <p className="text-xs lg:text-[11.54px] font-normal leading-[18px] lg:leading-[17.31px] tracking-[-0.03em] text-accent">
                  {item?.desc}
                </p>
              </div>
              {/* Buttons */}
              <div className="flex w-full mt-2 gap-3">
                <button
                  id="add-favorite"
                  type="button"
                  className="w-[50px] lg:w-[141px] h-[48px] flex items-center justify-center gap-[10px] rounded-[10px] lg:rounded-xl bg-[#8F80E833]"
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    className="w-[24px] h-[24px]"
                  >
                    <path
                      d="M6.5 7.2002V16.6854C6.5 18.0464 6.5 18.7268 6.70412 19.1433C7.08245 19.9151 7.91157 20.3588 8.76367 20.2454C9.2234 20.1842 9.78964 19.8067 10.9221 19.0518L10.9248 19.0499C11.3737 18.7507 11.5981 18.6011 11.833 18.5181C12.2642 18.3656 12.7348 18.3656 13.166 18.5181C13.4013 18.6012 13.6266 18.7515 14.0773 19.0519C15.2098 19.8069 15.7767 20.1841 16.2364 20.2452C17.0885 20.3586 17.9176 19.9151 18.2959 19.1433C18.5 18.7269 18.5 18.0462 18.5 16.6854V7.19691C18.5 6.07899 18.5 5.5192 18.2822 5.0918C18.0905 4.71547 17.7837 4.40973 17.4074 4.21799C16.9796 4 16.4203 4 15.3002 4H9.7002C8.58009 4 8.01962 4 7.5918 4.21799C7.21547 4.40973 6.90973 4.71547 6.71799 5.0918C6.5 5.51962 6.5 6.08009 6.5 7.2002Z"
                      stroke="#8F80E8"
                      strokeWidth={2}
                    />
                  </svg>
                  <span className="hidden lg:block text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#8F80E8]">
                    Add to routine
                  </span>
                </button>
                <button
                  type="button"
                  id="buy-now"
                  className="w-[112px] lg:w-[141px] h-[48px] flex items-center justify-center gap-[10px] rounded-[10px] lg:rounded-xl bg-[#EDAFDF4D]"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M3.5 16.8002V7.2002C3.5 6.08009 3.5 5.51962 3.71799 5.0918C3.90973 4.71547 4.21547 4.40973 4.5918 4.21799C5.01962 4 5.58009 4 6.7002 4H18.3002C19.4203 4 19.9796 4 20.4074 4.21799C20.7837 4.40973 21.0905 4.71547 21.2822 5.0918C21.5 5.5192 21.5 6.07899 21.5 7.19691V16.8036C21.5 17.9215 21.5 18.4805 21.2822 18.9079C21.0905 19.2842 20.7837 19.5905 20.4074 19.7822C19.98 20 19.421 20 18.3031 20H6.69691C5.57899 20 5.0192 20 4.5918 19.7822C4.21547 19.5905 3.90973 19.2842 3.71799 18.9079C3.5 18.4801 3.5 17.9203 3.5 16.8002Z"
                      stroke="#E77CCF"
                      strokeWidth={2}
                    />
                  </svg>
                  <span className="text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#E77CCF]">
                    Buy now
                  </span>
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
