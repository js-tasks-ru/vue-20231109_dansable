<template>
  <UiInput ref="input" v-model="modelProxy" :type="type" :step="step">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>

  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: {
      type: Number,
      default: null
    },

    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },

    step: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  expose: ['focus'],

  formatMap: {
    date: (date) => date.toISOString().slice(0, 10),
    time: (date) => date.toISOString().slice(11, 16),
    'datetime-local': (date) => date.toISOString().slice(0, 19),
  },

  computed: {
    modelProxy: {
      get() {
        if (!this.modelValue) {
          return null;
        }

        const date = new Date(this.modelValue);

        return this.$options.formatMap[this.type](date);
      },

      set() {
        const inputElement = this.$refs.input.getInput();

        this.$emit('update:modelValue', inputElement.valueAsNumber || null);
      },
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    }
  },
};
</script>
