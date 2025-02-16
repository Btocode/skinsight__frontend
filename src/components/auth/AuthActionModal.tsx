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

  // Define the onSubmit function for ForgotPasswordForm
  const handleForgotPasswordSubmit = (data: { email: string }) => {
    console.log("Forgot password data:", data);
    // Handle the forgot password logic here
  };

  // Define the onSubmit function for CodeValidationForm
  const handleCodeValidationSubmit = (data: { code: string }) => {
    console.log("Code validation data:", data);
    // Handle the code validation logic here
  };

  // Define the onSubmit function for SetNewPasswordForm
  const handleSetNewPasswordSubmit = (data: { password: string; repeatPassword: string }) => {
    console.log("Set new password data:", data);
    // Handle the set new password logic here
  };

  const components: { [key: string]: JSX.Element } = {
    "sign-in": <SignInForm />,
    "sign-up": <SignUpForm />,
    "forgot-password": <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />, // Pass the onSubmit prop
    "code-validation": <CodeValidationForm onSubmit={handleCodeValidationSubmit} />, // Pass the onSubmit prop
    "set-new-password": <SetNewPasswordForm onSubmit={handleSetNewPasswordSubmit} />, // Pass the onSubmit prop
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
        <div className="w-full lg:max-w-[680px]">
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
