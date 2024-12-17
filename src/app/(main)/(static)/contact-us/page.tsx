import Advertisement from "@/components/common/Advertisement";
import Button from "@/components/common/Button";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import Image from "next/image";

const ContactUsPage = () => {
  return (
    <section className="container py-10">
      <div className="max-w-xl mx-auto text-center space-y-6 py-10">
        <p className="uppercase text-[14px] leading-[26px] tracking-[2px] text-[#15143966]">
          Get Started
        </p>
        <HeadingPrimary className="lg:text-4xl">
          Get in Touch with Us
        </HeadingPrimary>
        <form className="space-y-6">
          <textarea
            className="w-full p-2 rounded-xl bg-white border focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            placeholder="Your message"
            rows={5}
          ></textarea>
          <div className="flex items-center gap-4">
            <InputBox
              type="email"
              placeholder="Enter email address"
              id="email"
              containerClassName="w-full"
              className="w-full bg-white border rounded-full"
            />
            <Button>Send</Button>
          </div>
        </form>
      </div>
      <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap py-10">
        <div className="space-y-2 w-[260px] text-center">
          <p className="uppercase text-[14px] leading-[26px] tracking-[2px]">
            New York, NY
          </p>

          <p className="text-[16px] leading-[26px] text-[#15143966]">
            62 West 55th Street, Suite 302 New York, NY, 10230
          </p>
        </div>
        <div className="space-y-2 w-[260px] text-center">
          <p className="uppercase text-[14px] leading-[26px] tracking-[2px]">
            San Francisco, CA
          </p>

          <p className="text-[16px] leading-[26px] text-[#15143966]">
            560 Judah St & 15th Ave, Apt. 5 San Francisco, CA, 230903
          </p>
        </div>
        <div className="space-y-2 w-[260px] text-center">
          <p className="uppercase text-[14px] leading-[26px] tracking-[2px]">
            Dubai
          </p>

          <p className="text-[16px] leading-[26px] text-[#15143966]">
            U237-02, Gold Tower, Jumeirah Lakes Towers, Dubai, UAE
          </p>
        </div>
      </div>
      <Advertisement />
      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={700}
        height={500}
        className="fixed -left-20 -top-20 lg:top-10 -z-10"
      />
      <Image
        src={"/gradient3.png"}
        alt="gradient3"
        width={800}
        height={200}
        className="fixed top-[700px] lg:top-[500px] -right-32 -z-10"
      />
    </section>
  );
};

export default ContactUsPage;
