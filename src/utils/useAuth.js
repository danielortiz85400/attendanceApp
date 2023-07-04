export const useAuthentication = (resp, self) => {
  const store = useAuth();
  if (resp?.error) return;
  let { ...authUser } = resp.success;

  store.$patch((state) => {
    state.authUser = { ...authUser };
  });

  const { [authUser.user.user_role]: route } = {
    ADMINISTRADOR: "/dash",
    MODERADOR: "/dash",
    USUARIO: "/user",
  };

  self.router.push(route);
};
