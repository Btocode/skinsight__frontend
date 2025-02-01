"use client";

import { useEffect } from "react";
import { useCheckAuthQuery } from "@/lib/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const AuthCheck = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error } = useCheckAuthQuery(undefined, {
    // Polling every 5 minutes to keep the session alive
    pollingInterval: 5 * 60 * 1000,
    // Refetch on window focus
    refetchOnFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      // The setCredentials reducer will handle the mapping
      dispatch(setCredentials({ user: data }));
    } else if (error) {
      // Clear auth state
      // dispatch(logout());
      // Close any open modals/navbars by removing auth param
      // router.replace(window.location.pathname);
    }
  }, [data, error, dispatch, router]);

  return null;
};
