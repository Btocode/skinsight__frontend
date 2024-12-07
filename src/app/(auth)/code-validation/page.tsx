import Spinner from "@/components/common/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const CodeValidationForm = dynamic(
  () => import("../_components/CodeValidationForm"),
  {
    loading: () => <Spinner />,
  }
);

export const metadata: Metadata = {
  title: "Code Validation",
  description: "Enter the code to validate that we sent to you",
};

/**
 * Page for validating a code that has been sent to the user.
 *
 * Displays the {@link CodeValidationForm} component which renders a form
 * for the user to enter the code and submit.
 *
 * @returns A JSX element containing the code validation form.
 */
const CodeValidationPage = () => {
  return <CodeValidationForm />;
};

export default CodeValidationPage;
