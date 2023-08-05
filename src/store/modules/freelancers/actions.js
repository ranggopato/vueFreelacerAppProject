export default {
  async registerFreelancer(context, data) {
    const userId = context.rootGetters.userId;
    const freelancerData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-project-by-ranggo-default-rtdb.asia-southeast1.firebasedatabase.app/freelancers/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(freelancerData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerFreelancer", {
      ...freelancerData,
      id: userId,
    });
  },
  async loadFreelancers(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-project-by-ranggo-default-rtdb.asia-southeast1.firebasedatabase.app/freelancers.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const freelancers = [];

    for (const key in responseData) {
      const freelancer = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      freelancers.push(freelancer);
    }

    context.commit("setFreelancers", freelancers);
    context.commit("setFetchTimestamp");
  },
};
