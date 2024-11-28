import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/globe.svg"
              alt="Skinsight Logo"
              width={40}
              height={40}
            />
          </Link>
          <nav className="ml-8">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/recommend-products"
                  className="hover:text-purple-600"
                >
                  Recommend Products
                </Link>
              </li>
              <li>
                <Link
                  href="/find-alternatives"
                  className="hover:text-purple-600"
                >
                  Find Alternatives
                </Link>
              </li>
              <li>
                <Link href="/build-regimen" className="hover:text-purple-600">
                  Build Regimen
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-purple-600">
                  Help
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Link
          href="/sign-up"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};
