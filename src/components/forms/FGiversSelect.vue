<template>
  <VPopup v-model="isAdd">
    <FGiversCreate @close="isAdd = false" />
  </VPopup>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать получателя</legend>
      <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
      <VCards :col="'c2'">
        <VCardsItem v-for="giver in searched" :key="giver.id" :open="false" @click="select(giver)">
          <template v-slot:basic>
            {{ giver.name }}
          </template>
        </VCardsItem>
        <VAdd @click.stop="isAdd = true" />
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import Givers from '@/services/givers';
  import VAdd from '@/components/VAdd.vue';
  import FGiversCreate from '@/components/forms/FGiversCreate.vue';

  const emit = defineEmits(['close', 'select']);

  const isAdd = ref(false);

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Givers.arr.value;
    return Givers.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.name.toLowerCase().includes(v)),
    );
  });

  function select(giver) {
    emit('select', giver);
  }
</script>
