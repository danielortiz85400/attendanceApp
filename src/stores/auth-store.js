import { Loading } from "quasar";
import { url } from "@/helpers/EndPoints";
import { toast } from "@/utils/useToast";

export const useAuth = defineStore("auth", {
  state: () => ({
    submitting: undefined,
    authUser: {},
  }),
  actions: {
    async login(user) {
      Loading.show({
        message: "Iniciando sesión...",
      });
      const { result } = await useFetch(url.signIn, "POST", { ...user });
      if (
        ["error", "validationError", "errorConexion"].some(
          (error) => result?.[error] ?? false
        )
      ) {
        toast(result);
        Loading.hide();
        return;
      }
      useAuthentication(result, this);
      Loading.hide();
    },
    async jwtRefresh() {
      const { result } = await useFetch(url.tokenRefresh, "GET");
      if (result?.error) return this.router.push({ path: "/" });
      useAuthentication(result, this);
    },
    logOut() {
      Loading.show({
        message: "Cerrando sesión",
      });

      setTimeout(async () => {
        await useFetch(url.logout, "GET");
        Loading.hide();
        this.router.push({ path: "/" });
      }, 2000);
    },
  },
});
