import {createApp} from './vendor/vue.esm-browser.js';
import {defineComponent} from "../02-VueCalculator/vendor/vue.esm-browser";

// From https://jsonplaceholder.typicode.com/comments
const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

const App = defineComponent({
  name: 'App',

  data() {
    return {
      emails: emails,
      search: ''
    }
  },

  computed: {
    //data-driven approach
    markedEmails() {
      return this.emails.map(email => {
        return {
          name: email,
          marked: this.isMarked(email)
        };
      });
    },
  },

  methods: {
    isMarked(string) {
      return this.search != null && this.search != '' && string?.toLocaleLowerCase().includes(this.search.toLowerCase());
    }
  }
});

// Требуется создать Vue приложение
createApp(App).mount('#app');
