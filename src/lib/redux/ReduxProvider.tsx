// src/lib/redux/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import useIsClient from "@/hooks/useIsClient";
import Spinner from "@/components/common/Spinner";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  if (!isClient) {
    return <Spinner />;
  }

  return <Provider store={store}>{children}</Provider>;
}
