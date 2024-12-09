import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 mt-10 flex flex-col">
      <div className="container flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-2 justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Skinsight Logo" width={180} height={40} />
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 ">
          <Link href="/recommend-products" className="menu-link">
            Recommend Products
          </Link>
          <Link href="/find-alternatives" className="menu-link">
            Find Alternatives
          </Link>
          <Link href="/build-regimen" className="menu-link">
            Build Regimen
          </Link>
          <Link href="/about" className="menu-link">
            About
          </Link>
          <Link href="/help" className="menu-link">
            Help
          </Link>
        </div>
      </div>
      <div className="container my-9 w-full h-px bg-[#EBEAED]" />
      <div className="container flex flex-col lg:flex-row gap-8 lg:gap-4 lg:items-center justify-between">
        <p>© {new Date().getFullYear()} Skinsight. All rights reserved</p>
        <div className="flex items-center gap-8">
          <Link href={"#"}>
            <Image
              src={"/icons/instagram.svg"}
              alt="Instagram"
              width={25}
              height={25}
            />
          </Link>
          <Link href={"#"}>
            <Image
              src={"/icons/tiktok.svg"}
              alt="Tiktok"
              width={25}
              height={25}
            />
          </Link>
          <Link href={"#"}>
            <Image src={"/icons/x.svg"} alt="X" width={25} height={25} />
          </Link>
          <Link href={"#"}>
            <Image
              src={"/icons/snapchat.svg"}
              alt="Snapchat"
              width={25}
              height={25}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
