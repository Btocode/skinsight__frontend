import Image from "next/image";

const HomePage = () => {
  return (
    <section className="container min-h-[90svh] lg:flex items-center justify-between py-10">
      <article className="flex-1 space-y-6">
        <div className="bg-[#8F80E829] px-2 py-1 rounded-lg flex items-center gap-2 max-w-max">
          <Image src={"/heart.png"} alt="heart" width={20} height={20} />
          <p>Hi! this is skinsight</p>
        </div>
        <h2 className="text-4xl lg:text-6xl leading-[70px] font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Your AI guide to finding your perfect skin match
        </h2>
        <p className="text-2xl leading-[36px] max-w-[600px] tracking-[-3%]">
          Get product recommendations, find alternatives, personalized skin care
          routine and more with the help of AI
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <button className="w-full text-base font-medium rounded-lg px-8 py-3 bg-primary text-white">
            Find alternatives
          </button>
          <button className="w-full text-base font-medium border-2 rounded-lg px-8 py-3 text-primary">
            Find alternatives
          </button>
        </div>
      </article>
      <div className="flex-1 relative h-[550px] mt-16 lg:mt-0">
        <Image
          src={"/hero.png"}
          alt="hero"
          fill
          priority
          sizes="(100vw, 100vh)"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default HomePage;
