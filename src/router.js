import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// import FreelancerDetail from './pages/freelancers/FreelancerDetail.vue';
import FreelancersList from "./pages/freelancers/FreelancersList.vue";
// import FreelancerRegistration from './pages/freelancers/FreelancerRegistration.vue';
// import ContactFreelancer from './pages/requests/ContactFreelancer.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from "./pages/NotFound.vue";
// import UserAuth from './pages/auth/UserAuth.vue';
import store from "./store/index.js";

const FreelancerDetail = defineAsyncComponent(() =>
  import("./pages/freelancers/FreelancerDetail.vue")
);
const FreelancerRegistration = defineAsyncComponent(() =>
  import("./pages/freelancers/FreelancerRegistration.vue")
);
const ContactFreelancer = defineAsyncComponent(() =>
  import("./pages/requests/ContactFreelancer.vue")
);
const RequestsReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestsReceived.vue")
);
const UserAuth = defineAsyncComponent(() =>
  import("./pages/auth/UserAuth.vue")
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/freelancers" },
    { path: "/freelancers", component: FreelancersList },
    {
      path: "/freelancers/:id",
      component: FreelancerDetail,
      props: true,
      children: [
        { path: "contact", component: ContactFreelancer }, // /freelancers/c1/contact
      ],
    },
    {
      path: "/register",
      component: FreelancerRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/freelancers");
  } else {
    next();
  }
});

export default router;
