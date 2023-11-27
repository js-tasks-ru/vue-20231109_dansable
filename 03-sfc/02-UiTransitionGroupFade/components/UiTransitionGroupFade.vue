<template>
  <TransitionGroup :tag="tag" name="fade-list" class="fade-list">
    <slot/>
  </TransitionGroup>
</template>

<script>
export default {
  name: 'UiTransitionGroupFade',

  props: {
    tag: {
      type: [String, Object, Function],
      default: 'div',
    },
  },
};
</script>

<style scoped>
@import url('../../../src/assets/styles/_transitions.css');
</style>
