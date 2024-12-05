import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ForgotPasswordForm = dynamic(
  () => import("../_components/ForgotPasswordForm"),
  {
    loading: () => <Spinner />,
  }
);

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Enter your email to reset your password",
};

/**
 * A page for users to reset their password.
 *
 * This component renders a form for users to enter their email address and receive a password reset link.
 *
 * The form is styled to match the general UI of the application.
 *
 * @returns A JSX element containing the forgot password form.
 */
const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
