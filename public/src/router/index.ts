import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routeNames from "./routeNames";
import Home from "../views/Home/index.vue";
import NotFound from "../views/NotFound/index.vue";
import SignUp from "../views/SignUp/index.vue";
import Login from "../views/Login/index.vue";
import Profile from "../views/Profile/index.vue";
import Article from "../views/Article/index.vue";
import Writers from "../views/Writers/index.vue";
import Writer from "../views/Writer/index.vue";
import CreatePost from "../views/CreatePost/index.vue";
import Contact from "../views/Contact/index.vue";
import Shop from "../views/Shop/index.vue";
import RequestAccess from "../views/RequestAccess/index.vue";
import Admin from "../views/Admin/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: routeNames.Home,
    component: Home,
    props: { visibleArticles: true },
  },
  {
    path: "/invisibles",
    name: routeNames.Invisibles,
    component: Home,
    props: { visibleArticles: false },
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
    path: "/users/:writerId",
    name: routeNames.Writer,
    component: Writer,
  },
  {
    path: "/create-post",
    name: routeNames.CreatePost,
    component: CreatePost,
  },
  {
    path: "/contact",
    name: routeNames.Contact,
    component: Contact,
  },
  {
    path: "/shop",
    name: routeNames.Shop,
    component: Shop,
  },
  {
    path: "/about",
    name: routeNames.About,
    component: Shop,
  },
  {
    path: "/request-access",
    name: routeNames.RequestAccess,
    component: RequestAccess,
  },
  {
    path: "/admin",
    name: routeNames.Admin,
    component: Admin,
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
