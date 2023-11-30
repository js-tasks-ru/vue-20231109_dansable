<script>
import {defineComponent} from 'vue';
import UiIcon from './UiIcon.vue';

export default defineComponent({
  name: 'UiToast',

  components: {UiIcon},

  props: {
    icon: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    cssClass: {
      type: String,
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  methods: {
    close(event) {
      event.stopPropagation();

      this.$emit('close');
    },
  },
});
</script>

<template>
  <div class="toast" :class="cssClass">
    <UiIcon class="toast__icon" :icon="icon"/>
    <span>{{ message }}</span>
    <button v-if="closable"
            @click="close($event)"
            type="button"
            class="button toast-close">
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
</style>
