<template>
  <div class="input-group" :class="inputGroupClass()">
    <div v-if="hasLeftIcon()" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <textarea
      ref="input"
      v-if="multiline"
      class="form-control"
      :class="formControlClass"
      :value="modelValue"
      @[eventName]="updateValue"
      v-bind="$attrs"
    ></textarea>

    <input
      ref="input"
      v-else
      class="form-control"
      :class="formControlClass"
      :value="modelValue"
      @[eventName]="updateValue"
      v-bind="$attrs"
    />

    <div v-if="hasRightIcon()" class="input-group__icon">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',

  inheritAttrs: false,

  props: {
    modelValue: String,
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
  },

  expose: ['focus'],

  emits: {
    'update:modelValue': null,
  },

  computed: {
    /*what do you think about such approach?
   * Is extraction of logic out of the template is worth it? Or it's better to keep it in the template?
   * Based on preferences of the team this could increase the readability of the template.
   * But it could also make it harder to understand the component the start, because we mix the decalrative and imperative approaches.
   * */
    formControlClass() {
      return {
        'form-control_rounded': this.rounded,
        'form-control_sm': this.small,
      };
    },

    eventName() {
      return this.$attrs.modelModifiers?.lazy ? 'change' : 'input';
    },
  },


  methods: {
    focus() {
      this.$refs.input.focus();
    },
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    hasLeftIcon() {
      return !!this.$slots['left-icon'];
    },
    hasRightIcon() {
      return !!this.$slots['right-icon'];
    },
    /*what do you think about such approach?
    * Is extraction of logic out of the template is worth it? Or it's better to keep it in the template?
    * Based on preferences of the team this could increase the readability of the template.
    * But it could also make it harder to understand the component the start, because we mix the decalrative and imperative approaches.
    * */
    inputGroupClass() {
      return {
        'input-group_icon-left': this.hasLeftIcon(),
        'input-group_icon-right': this.hasRightIcon(),
        'input-group_icon': this.hasLeftIcon() || this.hasRightIcon(),
      };
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
