"use client";
import ForgotPasswordForm from "@/app/(auth)/_components/ForgotPasswordForm";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page component that displays a modal for resetting a password if the current pathname is "/forgot-password".
 *
 * This component renders a {@link Modal} component with the {@link ForgotPasswordForm} as its children.
 * The modal is displayed if the current pathname is "/forgot-password".
 * When the modal is closed, the user is redirected to the home page.
 */
const ForgotPasswordPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen: boolean = pathname === "/forgot-password";

  const onClose = useCallback(() => router.push("/"), [router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ForgotPasswordForm />
    </Modal>
  );
};

export default ForgotPasswordPage;
