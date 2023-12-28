<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      sortedPanes: this.$slots.default?.()
      // Сейчас здесь массив ровно из трёх элементов, но решение должно быть универсальным для любого количества узлов
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const panes = this.sortedPanes;

      const temp = panes[i];
      panes[i] = panes[i - 1];
      panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const panes = this.sortedPanes;

      const temp = panes[i];
      panes[i] = panes[i + 1];
      panes[i + 1] = temp;
    },
  },

  render() {
    return (
      <div class="panes">
        {this.sortedPanes.map((vnode, i) => (
          <div class="pane">
            <div class="pane__content">{vnode}</div>
            <div class="pane__controls">
              <UiButton
                class={{ 'pane__disabled-button': i === 0 }}
                variant="secondary"
                block
                onClick={() => this.up(i)}
              > Up</UiButton>
              <UiButton
                class={{ 'pane__disabled-button': i === this.sortedPanes.length - 1 }}
                variant="danger"
                block
                onClick={() => this.down(i)}
              > Down</UiButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
