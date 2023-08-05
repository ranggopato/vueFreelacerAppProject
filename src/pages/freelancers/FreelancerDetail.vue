<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedFreelancer: null,
    };
  },
  computed: {
    fullName() {
      return (
        this.selectedFreelancer.firstName +
        " " +
        this.selectedFreelancer.lastName
      );
    },
    areas() {
      return this.selectedFreelancer.areas;
    },
    rate() {
      return this.selectedFreelancer.hourlyRate;
    },
    description() {
      return this.selectedFreelancer.description;
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
  },
  created() {
    this.selectedFreelancer = this.$store.getters[
      "freelancers/freelancers"
    ].find((freelancer) => freelancer.id === this.id);
  },
};
</script>
