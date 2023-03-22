import { useAuth } from "@/stores/auth-store";

export const requestOptions = {
  post: (email, password) => ({
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  }),
  signUp: (email, password, confirmPassword, userRole) => ({
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${useAuth().$state.authUser?.jwt?.token}`,
    },
    body: JSON.stringify({ email, password, confirmPassword, userRole }),
  }),

  get: () => ({
    method: "GET",
    credentials: "include",
  }),
  delete: (toDelete) => ({
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(toDelete),
  }),
  postSquad: (players) => ({
    method: "POST",
    body: JSON.stringify(players),
    headers: {
      "Content-type": "application/json",
    },
  }),
};
