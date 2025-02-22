import api from "./services/api";

export const auth = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data?.isAuthenticated ?? false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
