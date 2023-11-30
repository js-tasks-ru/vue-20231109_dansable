<template>
  <UiToasts :toasts="toasts">
    <template #toast="toast">
      <UiToast :message="toast.message"
               :closable="toast.closable"
               :cssClass="$options.cssClassMap[toast.type]"
               :icon="$options.iconMap[toast.type]"
               @close="clearToast(toast)"/>
    </template>
  </UiToasts>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from "./UiToast.vue";
import UiToasts from "./UiToasts.vue";
import {nanoid} from "nanoid";

export default {
  name: 'TheToaster',

  components: {UiIcon, UiToast, UiToasts},

  defaults: {
    duration: 5000,
    closable: false,
  },

  iconMap: {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'tv'
  },

  cssClassMap: {
    success: 'toast_success',
    error: 'toast_error',
    info: 'toast_info'
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
      options = {...this.$options.defaults, ...options};

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

<style scoped>
.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_info {
  color: var(--blue-2);
}
</style>
