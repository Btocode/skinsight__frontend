import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const SetNewPasswordForm = dynamic(
  () => import("../_components/SetNewPasswordForm"),
  {
    loading: () => <Spinner />,
  }
);

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set new password to sign into your account",
};

/**
 * A page that displays a form for setting a new password.
 *
 * This component renders the {@link SetNewPasswordForm} component,
 * which allows users to input and submit their new password to
 * update their account credentials.
 *
 * @returns A JSX element containing the set new password form.
 */
const SetNewPasswordPage = () => {
  return <SetNewPasswordForm />;
};

export default SetNewPasswordPage;
