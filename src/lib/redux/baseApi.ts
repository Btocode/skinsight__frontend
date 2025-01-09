import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getStorageItem, setStorageItem } from "@/utils/storage";
import { Mutex } from "async-mutex";

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, {}) => {
    const token =
      typeof window !== "undefined" ? getStorageItem("token") : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json;charset=UTF-8");
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Unauthorized
        const refreshToken =
          typeof window !== "undefined" ? getStorageItem("refreshToken") : null;

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/auth/refresh-token",
              method: "POST",
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const newAccessToken = (
              refreshResult.data as { accessToken: string }
            ).accessToken;
            setStorageItem("token", newAccessToken);
            result = await baseQuery(args, api, extraOptions);
          } else {
            // call api to log out the user
            await baseQuery(
              {
                url: "/auth/logout",
                method: "POST",
              },
              api,
              extraOptions
            );
          }
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: (_) => ({}),
  tagTypes: ["Auth"],
});
