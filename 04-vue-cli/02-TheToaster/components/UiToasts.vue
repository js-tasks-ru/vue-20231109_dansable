<script>
import { defineComponent } from 'vue';
import UiToast from './UiToast.vue';

export default defineComponent({
  name: 'UiToasts',

  components: { UiToast },

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <div class="toasts" v-if="toasts.length">
    <slot v-for="toast in toasts"
          :key="toast.id"
          name="toast"
          v-bind="toast"/>
  </div>
</template>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
