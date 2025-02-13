import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("../_components/SignInForm"), {
  loading: () => <Spinner />,
  ssr: false, // Disable SSR for auth form
});

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

/**
 * A page for signing in. It displays a sign in form in the center of the screen.
 */
const SignInPage = () => {
  return (
    <main data-testid="sign-in-page">
      <SignInForm />
    </main>
  );
};

export default SignInPage;
