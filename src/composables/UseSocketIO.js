import { io } from "socket.io-client";
import { storeToRefs } from "pinia";
import { useAuth } from "../stores/auth-store";

export const useSocket = () => {
  const authStore = useAuth();
  const { authUser } = storeToRefs(authStore);
  const socket = io("http://localhost:4000", {
    auth: { token: authUser.value?.jwt?.token },
  });
  return {
    socket,
  };
};
