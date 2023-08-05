import { createStore } from "vuex";

import freelancersModule from "./modules/freelancers/index.js";
import requestsModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    freelancers: freelancersModule,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
