"use client";

import { useEffect } from "react";
import { useCheckAuthQuery } from "@/lib/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "@/redux/slices/authSlice";

export const AuthCheck = () => {
  const dispatch = useDispatch();
  const { data, error } = useCheckAuthQuery(undefined, {
    // Polling every 5 minutes to keep the session alive
    pollingInterval: 5 * 60 * 1000,
    // Refetch on window focus
    refetchOnFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    } else if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return null;
};
