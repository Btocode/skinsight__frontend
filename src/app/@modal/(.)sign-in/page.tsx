"use client";
import SignInForm from "@/app/(auth)/_components/SignInForm";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page component that displays a modal for sign in.
 *
 * This component determines whether the modal should be open by checking the current
 * pathname. If the pathname is "/sign-in", the modal is displayed, allowing the user
 * to sign in.
 *
 * The modal contains the {@link SignInForm} component which renders a form
 * for the user to input the email and password and submit for sign in.
 *
 * @returns A JSX element containing the sign in form in a modal.
 */
const SignInPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen: boolean = pathname === "/sign-in";

  const onClose = useCallback(() => router.push("/"), [router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SignInForm />
    </Modal>
  );
};

export default SignInPage;
