import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: 'App',

  data() {
    return {
      meetupId: 1,
      meetup: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(newId) {
        this.meetup = await fetchMeetupById(newId);
      },
    },
  }
});

// Требуется создать Vue приложение
createApp(App).mount('#app');
