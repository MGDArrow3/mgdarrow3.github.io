<template>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать товар</legend>
      <VCards :col="'c2'">
        <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
        <div v-for="(groupe, category) in groupes" :key="groupe.id" class="cards">
          <div class="cards__title">{{ category }}</div>
          <VCardsItem v-for="item in groupe" :key="item.id" :open="false" @click="select(item)">
            <template v-slot:basic>
              <div class="basic__info">
                <div class="basic__info-name">
                  {{ item.ITEMS.name }}
                </div>
                <div class="basic__info-count">
                  {{ item.count }} {{ Filter.getNumberCaseCi(item.ITEMS.ci, item.count) }}
                  <span v-if="item.ITEMS.isLoss && Day.isNotMissLoss(item.loss)">
                    || {{ Day.getFullText(item.loss) }}
                  </span>
                </div>
              </div>
            </template>
          </VCardsItem>
        </div>
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import Day from '@/services/date';
  import Storage from '@/services/storage';
  import Filter from '@/services/filter';

  const groupes = computed(() => {
    return Object.groupBy(searched.value, (item) => item.ITEMS.CATEGORIES?.name || 'Без категории');
  });

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Storage.arr.value;
    return Storage.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.ITEMS.name.toLowerCase().includes(v)),
    );
  });

  const emit = defineEmits(['close', 'select']);

  function select(item) {
    emit('select', item);
  }
</script>
