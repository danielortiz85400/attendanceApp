import { Loading } from "quasar";
import { url } from "@/helpers/EndPoints";
import { requestOptions } from "@/helpers/RequestOptions";
import { toast } from "@/utils/useToast";

export const useAuth = defineStore("auth", {
  state: () => ({
    submitting: false,
    authUser: {},
  }),
  actions: {
    async signUp(email, password, confirmPassword, userRole) {
      this.submitting = true;
      const req = await fetch(
        url.signUp,
        requestOptions.signUp(email, password, confirmPassword, userRole)
      );
      const user = await req.json();
      toast(user);
      this.submitting = false;
    },
    async login(email, password) {
      Loading.show({
        message: "Iniciando sesión...",
      });
      const req = await fetch(url.signIn, requestOptions.post(email, password));
      const resp = await req.json();

      if (
        ["error", "validationError", "errorConexion"].some(
          (error) => resp?.[error] ?? false
        )
      ) {
        toast(resp);
        Loading.hide();
        return;
      }

      useAuthentication(resp, this);
      Loading.hide();
    },
    async jwtRefresh() {
      try {
        const req = await fetch(url.tokenRefresh, requestOptions.get());
        const resp = await req.json();

        if (resp?.error) {
          Loading.show();
          return setTimeout(() => {
            Loading.hide();
            this.router.push({ path: "/" });
          }, 3000);
        }
        useAuthentication(resp, this);
      } catch (error) {
        //user_role puede ser undefined al refrescar y expirar el token. Siendo el caso, cerrar sesión.
        Loading.show();
        return setTimeout(() => {
          Loading.hide();
          this.router.push({ path: "/" });
        }, 3000);
        console.log(error);
      }
    },
    logOut() {
      Loading.show({
        message: "Cerrando sesión",
      });

      setTimeout(async () => {
        await fetch(url.logout, requestOptions.get());
        Loading.hide();
        this.router.push({ path: "/" });
      }, 3000);
    },
  },
});
