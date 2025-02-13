"use client";
import CodeValidationForm from "@/app/(auth)/_components/CodeValidationForm";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page component that displays a modal for code validation.
 *
 * This component determines whether the modal should be open by checking the current
 * pathname. If the pathname is "/code-validation", the modal is displayed, allowing the user
 * to enter the code that was sent to them.
 *
 * The modal contains the {@link CodeValidationForm} component which renders a form
 * for the user to input the code and submit for validation.
 *
 * @returns A JSX element containing the code validation form in a modal.
 */
const CodeValidationPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen: boolean = pathname === "/code-validation";

  const onClose = useCallback(() => router.push("/"), [router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CodeValidationForm />
    </Modal>
  );
};

export default CodeValidationPage;
