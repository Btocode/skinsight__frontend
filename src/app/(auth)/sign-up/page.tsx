import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("../_components/SignUpForm"), {
  loading: () => <Spinner />,
});

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create an account",
};

/**
 * A page for signing up. It displays a sign up form in the center of the screen.
 */
const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
