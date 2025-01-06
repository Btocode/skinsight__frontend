"use client";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import CodeValidationForm from "./CodeValidationForm";
import SetNewPasswordForm from "./SetNewPasswordForm";
import Drawer from "../common/Drawer";

const AuthActionModal = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authAction = useSearchParams().get("auth");
  const onClose = useCallback(() => router.push(pathname), [pathname, router]);

  const components: { [key: string]: JSX.Element } = {
    "sign-in": <SignInForm />,
    "sign-up": <SignUpForm />,
    "forgot-password": <ForgotPasswordForm />,
    "code-validation": <CodeValidationForm />,
    "set-new-password": <SetNewPasswordForm />,
  };

  const keys = Object.keys(components);

  const open = keys.includes(authAction as string);

  return (
    <>
      <Modal
        closeBtnClassName="top-7 right-7"
        className="hidden lg:flex"
        isOpen={open}
        onClose={onClose}
      >
        <div className="w-full lg:w-[680px] ">
          {components[authAction as string]}
        </div>
      </Modal>
      <Drawer isOpen={open} onClose={onClose}>
        {components[authAction as string]}
      </Drawer>
    </>
  );
};

export default AuthActionModal;
