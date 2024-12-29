"use client";
import Advertisement from "@/components/common/Advertisement";
import Button from "@/components/common/Button";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import Modal from "@/components/common/Modal";
import { useCallback, useState } from "react";

const ContactUsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = useCallback(() => setOpen(false), []);
  return (
    <section className="container py-10">
      <div className="max-w-xl mx-auto lg:text-center lg:space-y-6 lg:py-10">
        <p className="uppercase text-[14px] leading-[26px] tracking-[2px] text-accent lg:text-[#15143966]">
          Get Started
        </p>
        <HeadingPrimary className="lg:text-4xl leading-[44px]">
          Get in Touch with Us
        </HeadingPrimary>
        <div className="hidden lg:block">
          <ContactForm />
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-20 items-center justify-between flex-wrap py-10">
        <div className="space-y-2 w-[260px] text-center">
          <p className="uppercase text-[14px] leading-[26px] tracking-[2px]">
            Write to us
          </p>

          <p className="text-[16px] leading-[26px] text-[#15143966]">
            Send us your queries or feedback to us
          </p>
          <Button onClick={() => setOpen(true)} className="px-10 rounded-full">
            Send
          </Button>
          <Modal isOpen={open} onClose={onClose}>
            <div className="w-[380px] py-10 px-4">
              <h2 className="text-left mb-4 uppercase text-lg font-semibold leading-[26px] tracking-[2px]">
                Email Us
              </h2>
              <ContactForm />
            </div>
          </Modal>
        </div>
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
    </section>
  );
};

export default ContactUsPage;

const ContactForm = () => {
  return (
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
  );
};
