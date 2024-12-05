"use client";
import SetNewPasswordForm from "@/app/(auth)/_components/SetNewPasswordForm";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page component that displays a modal for users to set a new password.
 *
 * This component checks the current pathname to determine if the modal should be open.
 * If the pathname is "/set-new-password", the modal is displayed, allowing the user
 * to enter and submit their new password.
 *
 * The modal contains the {@link SetNewPasswordForm} component which renders a form
 * for the user to input and confirm their new password.
 *
 * @returns A JSX element containing the set new password form in a modal.
 */
const SetNewPasswordPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen: boolean = pathname === "/set-new-password";

  const onClose = useCallback(() => router.push("/"), [router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SetNewPasswordForm />
    </Modal>
  );
};

export default SetNewPasswordPage;
