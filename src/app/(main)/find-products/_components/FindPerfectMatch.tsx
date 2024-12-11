import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FindPerfectMatch = () => {
  const router = useRouter();
  useEffect(() => {
    // redirect to /your-skin-matches page after 1 second
    const timer = setTimeout(() => {
      router.push("/find-products/your-skin-matches");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return <p className="-mt-6">This will only take a few seconds</p>;
};

export default FindPerfectMatch;
