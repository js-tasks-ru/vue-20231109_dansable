<template>
  <Transition name="fade" mode="out-in">
    <slot/>
  </Transition>
</template>

<script>
export default {
  name: 'UiTransitionFade',
};
</script>

<style scoped>
@import url('../../../src/assets/styles/_transitions.css');
</style>
