<template>
  <button @click="incrementCount">{{ internalCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      internalCount: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.internalCount = newValue;
      },
    }
  },

  emits: ['update:count'],

  methods: {
    incrementCount() {
      this.internalCount += 1;
      this.$emit('update:count', this.internalCount);
    },
  },

};
</script>
