const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/inicio",
        name: "inicio",
        component: () => import("../pages/IndexPage.vue"),
      },
      {
        path: "/registro",
        name: "registro",
        component: () => import("../modulos/registro/pages/IndexPage.vue"),
      },
      {
        path: "/historial_sustituciones",
        name: "historial_sustituciones",
        component: () => import("../modulos/sustituciones/pages/IndexPage.vue"),
      },
      {
        path: "/aprobacion_candidaturas",
        name: "aprobacion_candidaturas",
        component: () => import("../modulos/aprobar/pages/IndexPage.vue"),
      },
      {
        path: "/acuses",
        name: "acuses",
        component: () => import("../modulos/acuse/pages/IndexPage.vue"),
      },
      {
        path: "/genero",
        name: "genero",
        component: () => import("../modulos/genero/pages/IndexPage.vue"),
      },
      {
        path: "/observaciones",
        name: "observaciones",
        component: () => import("../modulos/observaciones/pages/IndexPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
