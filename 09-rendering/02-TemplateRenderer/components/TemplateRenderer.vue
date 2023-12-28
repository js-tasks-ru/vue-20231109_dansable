<script type="js">
import { compile, defineComponent, h } from "vue";

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderFn() {
      return compile(this.template);
    },
    component() {
      return defineComponent({
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
        components: this.components,
        render: this.renderFn,
      });
    }
  },

  render() {
    return h(this.component, { bindings: this.bindings });
  },
};
</script>
