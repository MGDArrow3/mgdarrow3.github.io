<template>
  <form @submit.prevent="select">
    <fieldset>
      <legend>Выбрать дату</legend>
      <div v-if="!year" class="year">
        <div class="date">
          <div v-for="y in years" :key="y" class="year__point" @click="year = y">{{ y }}</div>
        </div>
      </div>
      <div v-if="year && month === false" class="month">
        <div class="date">
          <div v-for="(m, i) in months" :key="m" class="month__point" @click="month = i">{{ m }}</div>
        </div>
      </div>
      <div v-if="year && month !== false && !day" class="day">
        <div class="date">
          <div v-for="d in days" :key="d" class="day__point" @click="day = d">{{ d }}</div>
        </div>
      </div>
      <VButton v-if="year && month !== false && day">{{ dateText }}</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import Day from '@/services/date';

  const emit = defineEmits(['close', 'select']);

  const year = ref(false);
  const month = ref(false);
  const day = ref(false);

  const yearNow = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, index) => index + yearNow);
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const monthsGen = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  const days = computed(() =>
    Array.from({ length: Day.getDaysInMonth(year.value, month.value) }, (_, index) => index + 1),
  );

  const date = computed(() => `${year.value}-${month.value}-${day.value}`);
  const dateText = computed(() => `${day.value} ${monthsGen[month.value]} ${year.value}`);

  function select() {
    emit('select', date.value);
  }
</script>

<style lang="scss">
  .date {
    display: flex;
    flex-wrap: wrap;
    gap: 1dvh;
    width: 100%;
    margin: 1dvh 0;
    & div {
      display: flex;
      flex-grow: 1;
      flex-shrink: 0;
      width: calc((100% - 2dvh) / 3);
      padding: 1dvh;
      color: $col-revers;
      font-weight: 400;
      font-size: 1.3em;
      background: $col-main-dark;
      border: 0.3dvh solid $col-text;
      border-radius: 1dvh;
      place-content: center center;
    }
  }
</style>
