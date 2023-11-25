import {defineComponent} from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import {fetchMeetupById} from '../meetupService.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      loading: false,
      error: null,
    }
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(newId) {
        this.meetup = null;
        this.loading = true;

        try {
          this.meetup = await fetchMeetupById(newId);
          this.error = null;
        } catch (e) {
          this.error = e.message;
        }

        this.loading = false;
      },
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView :meetup="meetup" v-if="meetup"/>
      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <UiContainer v-if="error && !loading">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
