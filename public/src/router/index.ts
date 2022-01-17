import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routeNames from "./routeNames";
import Home from "../views/Home/index.vue";
import NotFound from "../views/NotFound/index.vue";
import SignUp from "../views/SignUp/index.vue";
import Login from "../views/Login/index.vue";
import Profile from "../views/Profile/index.vue";
import Article from "../views/Article/index.vue";
import Writers from "../views/Writers/index.vue";
import Writer from "../views/Writer/index.vue"; //TODO

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: routeNames.Home,
    component: Home,
  },
  {
    path: "/signup",
    name: routeNames.SignUp,
    component: SignUp,
  },
  {
    path: "/login",
    name: routeNames.Login,
    component: Login,
  },
  {
    path: "/profile",
    name: routeNames.Profile,
    component: Profile,
  },
  {
    path: "/articles/:articleId",
    name: routeNames.Article,
    component: Article,
  },
  {
    path: "/writers",
    name: routeNames.Writers,
    component: Writers,
  },
  {
    path: "/writers/:writerId",
    name: routeNames.Writer,
    component: Writer,
  },
  // Catch All Routes
  {
    path: "/not-found",
    name: routeNames.NotFound,
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: routeNames.NotFound,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  },
});

export default router;
