<script>
import { defineComponent } from 'vue';
import UiIcon from './UiIcon.vue';

const iconMap = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'tv'
};

const cssClassMap = {
  success: 'toast_success',
  error: 'toast_error',
  info: 'toast_info'
};

export default defineComponent({
  name: 'UiToast',

  components: { UiIcon },

  props: {
    message: {
      type: String,
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      validator: (type) => Object.keys(cssClassMap).includes(type),
    },
  },

  emits: ['close'],

  computed: {
    icon() {
      return iconMap[this.type];
    },
    typeClass() {
      return cssClassMap[this.type];
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>

<template>
  <div class="toast" :class="typeClass">
    <UiIcon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
    <button
      v-if="closable"
      @click.stop="close($event)"
      type="button"
      class="button toast-close"
    >
      &times;
    </button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast-close {
  padding: 0;
  margin-left: 10px;
  border: 0;
}

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
