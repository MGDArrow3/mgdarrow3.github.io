<template>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать единицу измерения</legend>
      <VCards :col="'c2'">
        <VCardsItem v-for="ci in cies" :key="ci.id" :open="false" @click="select(ci)">
          <template v-slot:basic>
            {{ ci.one }}
          </template>
        </VCardsItem>
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  const emit = defineEmits(['close', 'select']);

  const cies = [
    {
      one: 'банка',
      two: 'банки',
      five: 'банок',
    },
    {
      one: 'бутылка',
      two: 'бутылки',
      five: 'бутылок',
    },
    {
      one: 'килограмм',
      two: 'килограмма',
      five: 'килограммов',
    },
    {
      one: 'коробка',
      two: 'коробки',
      five: 'коробок',
    },
    {
      one: 'лист',
      two: 'листа',
      five: 'листов',
    },
    {
      one: 'метр',
      two: 'метра',
      five: 'метров',
    },
    {
      one: 'мешок',
      two: 'мешка',
      five: 'мешков',
    },
    {
      one: 'набор',
      two: 'набора',
      five: 'наборов',
    },
    {
      one: 'пачка',
      two: 'пачки',
      five: 'пачек',
    },
    {
      one: 'штука',
      two: 'штуки',
      five: 'штук',
    },
    {
      one: 'ящик',
      two: 'ящика',
      five: 'ящиков',
    },
  ];

  function select(ci) {
    emit('select', ci);
  }
</script>
