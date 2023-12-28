<template>
  <slot name="pending" v-if="pending" />
  <slot name="fulfilled" :result="result"  v-else-if="result" />
  <slot v-else name="rejected" :error="error" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      pending: true,
      result: undefined,
      error: undefined,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler(promise) {
        this.pending = true;
        this.result = undefined;
        this.error = undefined;

        promise
          .then((result) => {
            this.result = result;
          })
          .catch((error) => {
            this.error = error;
          })
          .finally(() => {
            this.pending = false;
          });
      },
    },
  },
};
</script>
