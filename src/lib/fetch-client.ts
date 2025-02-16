export const fetchClient = (url: string, options?: RequestInit) => {
  const request = new Request(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

  return fetch(request);
};
