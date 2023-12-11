<template>
  <fieldset class="agenda-item-form">
    <button
      type="button"
      class="agenda-item-form__remove-button"
      @click="$emit('remove')"
    >
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown
        title="Тип"
        :options="$options.agendaItemTypeOptions"
        name="type"
        v-model="internalAgendaItem.type"
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            type="time"
            placeholder="00:00"
            name="startsAt"
            v-model="internalAgendaItem.startsAt"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput
            type="time"
            placeholder="00:00"
            name="endsAt" v-model="internalAgendaItem.endsAt"
          />
        </UiFormGroup>
      </div>
    </div>

    <template v-if="internalAgendaItem.type === 'talk'">
      <UiFormGroup label="Тема">
        <UiInput name="title" v-model="internalAgendaItem.title" />
      </UiFormGroup>
      <UiFormGroup label="Докладчик">
        <UiInput name="speaker" v-model="internalAgendaItem.speaker" />
      </UiFormGroup>
      <UiFormGroup label="Описание">
        <UiInput multiline name="description" v-model="internalAgendaItem.description" />
      </UiFormGroup>
      <UiFormGroup label="Язык">
        <UiDropdown
          title="Язык"
          :options="$options.talkLanguageOptions"
          name="language"
          v-model="internalAgendaItem.language"
        />
      </UiFormGroup>
    </template>
    <template v-if="internalAgendaItem.type === 'other'">
      <UiFormGroup label="Заголовок">
        <UiInput name="title" v-model="internalAgendaItem.title" />
      </UiFormGroup>
      <UiFormGroup label="Описание">
        <UiInput multiline name="description" v-model="internalAgendaItem.description" />
      </UiFormGroup>
    </template>
    <template v-if="internalAgendaItem.type !== 'other' && internalAgendaItem.type !== 'talk'">
      <UiFormGroup label="Нестандартный текст (необязательно)">
        <UiInput name="title" v-model="internalAgendaItem.title" />
      </UiFormGroup>
    </template>


  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import { getTimeInMinutes, getTimeString } from "../utils/time";

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      internalAgendaItem: { ...this.agendaItem },
    };
  },

  watch: {
    internalAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.internalAgendaItem });
      },
    },
    'internalAgendaItem.startsAt': {
      handler(newValue, oldValue) {
        if (!oldValue) {
          return;
        }

        this.internalAgendaItem.endsAt = this.calculateNewEndDate(newValue, oldValue);
      }
    },
  },

  methods: {
    calculateNewEndDate(newStartValue, oldStartValue) {
      const oldStart = getTimeInMinutes(oldStartValue);
      const oldEnd = getTimeInMinutes(this.internalAgendaItem.endsAt);
      const duration = oldEnd - oldStart;

      const newStart = getTimeInMinutes(newStartValue);
      const newEnd = newStart + duration;

      return getTimeString(newEnd);
    }
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
