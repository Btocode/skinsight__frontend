import { fetchClient } from "./fetch-client";

export const auth = async () => {
  let isAuthenticated = false;
  try {
    const response = await fetchClient("/users/me");
    if (!response.ok) {
      return isAuthenticated;
    }
    const data = await response.json();
    console.log(data);
    isAuthenticated = data.isAuthenticated;
  } catch (err) {
    console.error(err);
  } finally {
    return isAuthenticated;
  }
};
