import GradientImage from "@/components/common/GradientImage";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="container min-h-[85svh] lg:flex items-center justify-between py-10 relative">
      <article className="flex-1 space-y-4 lg:space-y-6">
        <div className="bg-[#8F80E829] px-4 py-3 rounded-lg flex items-center gap-2 max-w-max">
          <Image src={"/heart.png"} alt="heart" width={25} height={25} />
          <p className="font-medium">Hi! this is skinsight</p>
        </div>
        <h2 className="text-4xl lg:text-6xl leading-[50px] lg:leading-[70px] font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Your AI guide to finding your perfect skin match
        </h2>
        <p className="text-base leading-[24px] lg:text-2xl lg:leading-[36px] max-w-[390px] sm:max-w-[550px]  lg:max-w-[600px] tracking-[-3%]">
          Get product recommendations, find alternatives, personalized skin care
          routine and more with the help of AI
        </p>
        <div className="flex flex-row items-center gap-4">
          <Link href="/find-products" className="w-full lg:w-auto">
            <button className="w-full lg:w-auto text-base font-medium rounded-lg px-2 lg:px-10 py-4 bg-primary text-white">
              Find my products
            </button>
          </Link>
          <Link href="/find-alternatives" className="w-full lg:w-auto">
            <button className="w-full lg:w-auto text-base font-medium border-2 rounded-lg px-2 lg:px-10 py-4 text-primary">
              Find alternatives
            </button>
          </Link>
        </div>
      </article>
      <div className="flex-1 relative h-[450px] lg:h-[620px] mt-[60px] lg:mt-0">
        <Image
          src={"/hero.png"}
          alt="hero"
          fill
          priority
          sizes="(100vw, 100vh)"
          className="object-contain"
        />
      </div>

      <GradientImage />
    </section>
  );
};

export default HomePage;
