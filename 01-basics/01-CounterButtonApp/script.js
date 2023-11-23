import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',

  data() {
    return {
      count: 0
    };
  },

  methods: {
    increment() {
      this.count++;
    }
  },
});

createApp(App).mount('#app');
