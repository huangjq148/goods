import { createRouter, createWebHistory } from "vue-router";
import Orders from "../views/Orders/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "orders",
      component: Orders,
    },
    {
      path: "/orders/create",
      name: "ordersCreate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Orders/Create.vue"),
    },
    {
      path: "/goods/create",
      name: "create",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Goods/Create.vue"),
    },
    {
      path: "/goods",
      name: "goods",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Goods/index.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Contact/index.vue"),
    },
  ],
});

export default router;
