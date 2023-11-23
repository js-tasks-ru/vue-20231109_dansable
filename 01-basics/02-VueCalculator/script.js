import {createApp} from './vendor/vue.esm-browser.js';
import {defineComponent} from "./vendor/vue.esm-browser";

const operatorsMap = {
  sum: 'sum',
  subtract: 'subtract',
  multiply: 'multiply',
  divide: 'divide'
};

// Создайте Vue приложение
const App = defineComponent({
  operatorsMap: operatorsMap,

  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      operator: ''
    }
  },

  computed: {
    sum() {
      switch (this.operator) {
        case operatorsMap.sum:
          return this.firstNumber + this.secondNumber;
        case operatorsMap.subtract:
          return this.firstNumber - this.secondNumber;
        case operatorsMap.multiply:
          return this.firstNumber * this.secondNumber;
        case operatorsMap.divide:
          return this.firstNumber / this.secondNumber;
        default:
          return 0;
      }
    }
  }
});

createApp(App).mount('#app');
