import { Loading } from "quasar";
import { route } from "quasar/wrappers";

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const store = useAuth();

    const { authUser } = storeToRefs(store);
    const { auth } = to.meta;
    if (
      auth &&
      auth.some(
        (role) => !authUser.value?.user?.role_permissions.includes(role)
      )
    ) {
      next(false);
    } else {
      next();
    }
  });
  return Router;
});
