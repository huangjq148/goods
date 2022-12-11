import { createRouter, createWebHashHistory } from "vue-router";
import Orders from "../views/Orders/index.vue";
import Login from "../views/Login/index.vue"
import HomeLayout from "../Layout/Home.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "homeLayout",
      component: HomeLayout,
      children: [
        {
          path: "/",
          name: "orders",
          component: Orders,
        },
        {
          path: "/orders/create",
          name: "ordersCreate",
          component: () => import("../views/Orders/Create.vue"),
        },
        {
          path: "/orders/overview",
          name: "ordersOverview",
          component: () => import("../views/Orders/Overview.vue"),
        },
        {
          path: "/goods/create",
          name: "goodsCreate",
          component: () => import("../views/Goods/Create.vue"),
        },
        {
          path: "/goods",
          name: "goods",
          component: () => import("../views/Goods/index.vue"),
        },
        {
          path: "/contact/create",
          name: "contactCreate",
          component: () => import("../views/Contact/Create.vue"),
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("../views/Contact/index.vue"),
        },
        {
          path: "/me",
          name: "me",
          component: () => import("../views/Me/index.vue"),
        },

      ]
    }
  ],
});

export default router;
