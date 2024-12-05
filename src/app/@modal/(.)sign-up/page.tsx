"use client";
import SignUpForm from "@/app/(auth)/_components/SignUpForm";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page component that displays a modal for users to sign up.
 *
 * This component checks the current pathname to determine if the modal should be open.
 * If the pathname is "/sign-up", the modal is displayed, allowing the user
 * to enter their name, email address, and password to sign up.
 *
 * The modal contains the {@link SignUpForm} component which renders a form
 * for the user to enter the required information and submit.
 *
 * @returns A JSX element containing the sign up form in a modal.
 */
const SignUpPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen: boolean = pathname === "/sign-up";

  const onClose = useCallback(() => router.push("/"), [router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SignUpForm />
    </Modal>
  );
};

export default SignUpPage;
