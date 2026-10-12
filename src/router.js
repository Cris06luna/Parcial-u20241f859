import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import NewTelemetry from "./section/presentation/views/new-telemetry.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/telemetry/new", component: NewTelemetry },
    { path: "/:pathMatch(.*)*", redirect: "/home" },
  ],
});

export default router;