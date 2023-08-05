<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <freelancer-filter @change-filter="setFilters"></freelancer-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadFreelancers(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Freelancer</base-button
          >
          <base-button
            v-if="isLoggedIn && !isFreelancer && !isLoading"
            link
            to="/register"
            >Register as Freelancer</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasFreelancers">
          <freelancer-item
            v-for="freelancer in filteredFreelancers"
            :key="freelancer.id"
            :id="freelancer.id"
            :first-name="freelancer.firstName"
            :last-name="freelancer.lastName"
            :rate="freelancer.hourlyRate"
            :areas="freelancer.areas"
          ></freelancer-item>
        </ul>
        <h3 v-else>No freelancers found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import FreelancerItem from "../../components/freelancers/FreelancerItem.vue";
import FreelancerFilter from "../../components/freelancers/FreelancerFilter.vue";

export default {
  components: {
    FreelancerItem,
    FreelancerFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        fullstack: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isFreelancer() {
      return this.$store.getters["freelancers/isFreelancer"];
    },
    filteredFreelancers() {
      const freelancers = this.$store.getters["freelancers/freelancers"];
      return freelancers.filter((freelancer) => {
        if (
          this.activeFilters.frontend &&
          freelancer.areas.includes("frontend")
        ) {
          return true;
        }
        if (
          this.activeFilters.backend &&
          freelancer.areas.includes("backend")
        ) {
          return true;
        }
        if (
          this.activeFilters.fullstack &&
          freelancer.areas.includes("fullstack")
        ) {
          return true;
        }
        return false;
      });
    },
    hasFreelancers() {
      return (
        !this.isLoading && this.$store.getters["freelancers/hasFreelancers"]
      );
    },
  },
  created() {
    this.loadFreelancers();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadFreelancers(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("freelancers/loadFreelancers", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
