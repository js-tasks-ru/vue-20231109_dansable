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
    }
  },

  render() {
    const component = defineComponent({
      props: {
        bindings: this.bindings,
      },
      components: this.components,
      render: this.renderFn,
    });

    return h(component, { bindings: this.bindings });
  },
};
</script>
