import {defineComponent} from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from "./MeetupAgendaItem";

export default defineComponent({
  name: 'MeetupAgenda',

  props: {
    agenda: {
      type: Array,
      required: true
    }
  },

  components: {
    MeetupAgendaItem
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item"
          v-for="agendaItem in agenda"
          :key="agendaItem.id">
        <MeetupAgendaItem :agendaItem="agendaItem"/>
      </li>
    </ul>`,
});
