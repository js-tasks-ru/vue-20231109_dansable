<template>
  <UiCalendarView :events="meetups">
    <template #default="{date}">
      <UiCalendarEvent
        :key="meetup.id" v-for="meetup in meetupsMap[date.toLocaleDateString()]" tag="a" :href="`/meetups/${meetup.id}`"
      >
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsMap() {
      return this.meetups.reduce((acc, meetup) => {
        const date = new Date(meetup.date).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(meetup);

        return acc;
      }, {});
    },
  },
};
</script>

<style scoped></style>
