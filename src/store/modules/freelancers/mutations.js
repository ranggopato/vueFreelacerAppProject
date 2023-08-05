export default {
  registerFreelancer(state, payload) {
    state.freelancers.push(payload);
  },
  setFreelancers(state, payload) {
    state.freelancers = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
