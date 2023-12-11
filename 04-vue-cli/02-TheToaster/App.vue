<template>
  <TheToaster ref="toaster"/>
  <p>
    <button type="button" @click="handleSuccessClick">Add Success Message</button>
    <button type="button" @click="handleErrorClick">Add Error Message</button>
    <button type="button" @click="handleInfoClick">Add Info Message</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster.vue';

export default {
  name: 'App',

  components: {TheToaster},

  methods: {
    handleSuccessClick() {
      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString(), {
        duration: 6000,
        closable: true
      });
    },

    handleErrorClick() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString(), {
        duration: 2000
      });
    },

    handleInfoClick() {
      this.$refs.toaster.info('Info ' + new Date().toLocaleTimeString());
    },
  },
};
</script>
