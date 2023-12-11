<template>
  <component :is="tag" class="link">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object, Function],
      default: 'RouterLink',
      validator: function (value) {
        return ['a', 'RouterLink', 'router-link'].includes(value) || typeof value === 'object' || typeof value === 'function';
      }
    }
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
