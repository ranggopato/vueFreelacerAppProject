export default {
  freelancers(state) {
    return state.freelancers;
  },
  hasFreelancers(state) {
    return state.freelancers && state.freelancers.length > 0;
  },
  isFreelancer(_, getters, _2, rootGetters) {
    const freelancers = getters.freelancers;
    const userId = rootGetters.userId;
    return freelancers.some((freelancer) => freelancer.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
