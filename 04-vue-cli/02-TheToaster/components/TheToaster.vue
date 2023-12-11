<template>
  <UiToasts :toasts="toasts">
    <template #default="{toast}">
      <UiToast
        :type="toast.type"
        :message="toast.message"
        :closable="toast.closable"
        @close="clearToast(toast)"
      />
    </template>
  </UiToasts>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from "./UiToast.vue";
import UiToasts from "./UiToasts.vue";
import { nanoid } from "nanoid";

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast, UiToasts },

  defaults: {
    duration: 5000,
    closable: false,
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    createToast(type, message, closable) {
      return {
        type,
        message,
        closable,
        id: nanoid()
      };
    },

    addToast(toast) {
      this.toasts.push(toast);
    },

    clearToast(toast) {
      const index = this.toasts.indexOf(toast);

      this.toasts.splice(index, 1);
    },

    scheduleClearToast(toast, duration) {
      const timerId = setTimeout(() => {
        this.clearToast(toast);
        clearTimeout(timerId);
      }, duration);
    },

    handleState(state, message, options) {
      options = { ...this.$options.defaults, ...options };

      const toast = this.createToast(state, message, options.closable);

      this.addToast(toast);
      this.scheduleClearToast(toast, options.duration);
    },

    success(message, options) {
      this.handleState('success', message, options);
    },

    error(message, options) {
      this.handleState('error', message, options);
    },

    info(message, options) {
      this.handleState('info', message, options);
    },
  },
};
</script>
