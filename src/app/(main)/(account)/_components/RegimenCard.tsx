import Image from "next/image";

const RegimenCard = () => {
  return (
    <section className="w-full lg:min-h-[500px]">

    <div className="w-full rounded-xl bg-white p-6 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="space-y-5">
          <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-[#575656]">My Skincare</h2>
          <p className="text-[14px] text-[#575656]">Saved on November 11, 2024</p>
          </div>
          {/* Product Image */}
          <div className="flex items-center">
            <div className="h-16 w-16 -ml-5 relative">
              <Image
                src={"/products/product1.png"}
                alt={"Product 1"}
                fill
                className="object-contain"
              />
            </div>
            <div className="h-16 w-16 -ml-5 relative">
              <Image
                src={"/products/product2.png"}
                alt={"Product 2"}
                fill
                className="object-contain"
              />
            </div>
            <div className="h-16 w-16 -ml-5 relative">
              <Image
                src={"/products/product3.png"}
                alt={"Product 3"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-100 p-3 text-[#8F80E8] transition-colors hover:bg-violet-200">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M6.5 7.2002V16.6854C6.5 18.0464 6.5 18.7268 6.70412 19.1433C7.08245 19.9151 7.91157 20.3588 8.76367 20.2454C9.2234 20.1842 9.78964 19.8067 10.9221 19.0518L10.9248 19.0499C11.3737 18.7507 11.5981 18.6011 11.833 18.5181C12.2642 18.3656 12.7348 18.3656 13.166 18.5181C13.4013 18.6012 13.6266 18.7515 14.0773 19.0519C15.2098 19.8069 15.7767 20.1841 16.2364 20.2452C17.0885 20.3586 17.9176 19.9151 18.2959 19.1433C18.5 18.7269 18.5 18.0462 18.5 16.6854V7.19691C18.5 6.07899 18.5 5.5192 18.2822 5.0918C18.0905 4.71547 17.7837 4.40973 17.4074 4.21799C16.9796 4 16.4203 4 15.3002 4H9.7002C8.58009 4 8.01962 4 7.5918 4.21799C7.21547 4.40973 6.90973 4.71547 6.71799 5.0918C6.5 5.51962 6.5 6.08009 6.5 7.2002Z"
                stroke="currentColor"
                strokeWidth={2}
              />
            </svg>

            <span className="tracking-tighter">View regimen</span>
          </button>
        </div>
      </div>
    </div>
    </section>

  );
};

export default RegimenCard;
