const roles = {
  administrador: "ADMINISTRADOR",
  usuario: "USUARIO",
};
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/user",
        meta: { auth: [roles.usuario] },
        component: () => import("pages/UserPage.vue"),
      },
      {
        path: "/dash",
        meta: { auth: [roles.administrador, roles.usuario] },
        component: () => import("pages/DashboardPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
