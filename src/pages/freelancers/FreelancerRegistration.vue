<template>
  <section>
    <base-card>
      <h2>Register as a freelancer now!</h2>
      <freelancer-form @save-data="saveData"></freelancer-form>
    </base-card>
  </section>
</template>

<script>
import FreelancerForm from "../../components/freelancers/FreelancerForm.vue";

export default {
  components: {
    FreelancerForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("freelancers/registerFreelancer", data);
      this.$router.replace("/freelancers");
    },
  },
};
</script>
