import SectionOpacity from "@/components/animations/SectionOpacity";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import homePageImg from "../../../public/hero.png";
import HeartImg from "../../../public/heart.png";
import { cookies } from "next/headers";
const HomePage = async () => {
  // check cookie if user has performed questionnaire
  const cookieStore = await cookies();
  const hasPerformedQuestionnaire = cookieStore.get("recommendation") !== undefined;
  return (
    <SectionOpacity>
      <section className="container min-h-[85svh] lg:flex gap-[34px] items-center justify-between py-10 relative">
        <article className="flex-1 space-y-4 lg:space-y-[20px]">
          <div className="w-[199px] h-[48px] bg-[#8F80E829] rounded-lg flex items-center justify-center gap-[12px]">
            <Image src={HeartImg} alt="heart" width={26} height={26} />
            <p className="text-base font-medium leading-[24px] tracking-[-0.03em] text-[#111111]">
              Hi! this is skinsight
            </p>
          </div>
          <HeadingPrimary className="text-[38px] leading-[45.22px] lg:text-[42px] lg:leading-[49.98px] tracking-[-0.02em]">
            Your AI guide to finding your perfect skin match
          </HeadingPrimary>
          <p className="text-base text-accent leading-[24px] lg:text-2xl lg:leading-[36px] max-w-[390px] sm:max-w-[550px] tracking-[-0.03em]">
            Get product recommendations, find alternatives, personalized skin
            care routine and more with the help of AI
          </p>
          <div className="flex flex-row items-center gap-[12px]">
            <Link href={hasPerformedQuestionnaire ? "/find-products/your-skin-matches" : "/find-products"}>
              <Button className="w-[177px] lg:w-[200px] h-[60px] px-0 text-[18px] lg:text-xl font-medium rounded-xl leading-[26px]">
                {
                  hasPerformedQuestionnaire ? "Your products" : "Find my products"
                }
              </Button>
            </Link>
            <Link href="/find-alternatives">
              <Button
                variant={"outline"}
                className="w-[163px] lg:w-[184px] h-[60px] rounded-xl border border-[#E1E1E1] px-0 text-[18px] lg:text-xl font-medium leading-[26px]"
              >
                Find alternatives
              </Button>
            </Link>
          </div>
        </article>
        <Image
          src={homePageImg}
          alt="hero"
          width={632.38}
          height={615}
          className="mt-[60px] lg:mt-0"
        />

        <GradientImage />
      </section>
    </SectionOpacity>
  );
};

export default HomePage;
