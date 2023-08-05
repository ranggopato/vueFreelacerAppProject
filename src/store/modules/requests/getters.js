export default {
  requests(state, _, _2, rootGetters) {
    const freelancerId = rootGetters.userId;
    return state.requests.filter((req) => req.freelancerId === freelancerId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
