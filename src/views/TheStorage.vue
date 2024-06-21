<template>
  <main class="storage">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="storage" />Склад</h1>
    </router-link>
    <VCardsBtn v-model="col" />
    <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
    <VCards :col="col">
      <div v-for="(groupe, category) in groupes" :key="groupe.id" class="cards">
        <div class="cards__title">{{ category }}</div>
        <VCardsItem v-for="item in getItems(groupe)" :key="item.id" :open="item.isLoss">
          <template v-slot:basic>
            <div class="basic__info">
              <div v-if="item.expired" class="basic__info-expired"><VIcon name="expired" /></div>
              <div class="basic__info-name">
                {{ item.name }}
              </div>
              <div class="basic__info-count">
                {{ item.countAll }} {{ Filter.getNumberCaseCi(item.ci, item.countAll) }}
              </div>
            </div>
          </template>
          <template v-slot:open>
            <div class="info">
              <div v-for="date in item.items" :key="date.id" class="info__row">
                {{ date.count }} {{ Filter.getNumberCaseCi(item.ci, date.count) }}
                <span v-if="Day.isNotMissLoss(date.loss)">|| {{ Day.getFullText(date.loss) }}</span>
              </div>
            </div>
          </template>
        </VCardsItem>
      </div>
    </VCards>
  </main>
</template>

<script setup>
  import Day from '@/services/date';
  import Storage from '@/services/storage';
  import { computed, ref } from 'vue';
  import Filter from '@/services/filter';

  const groupes = computed(() => {
    return Object.groupBy(searched.value, (item) => item.ITEMS.CATEGORIES?.name || 'Без категории');
  });

  // ! Вот он говнокод :)
  function getItems(arr) {
    let i = Object.groupBy(arr, (item) => item.ITEMS.id);
    const obj = [];
    for (let item in i) {
      obj.push(i[item]);
    }
    const end = [];

    obj.forEach((it) => {
      end.push({
        name: it[0].ITEMS.name,
        countAll: it.reduce((acc, date) => acc + date.count, 0),
        ci: it[0].ITEMS.ci,
        items: it,
        isLoss: it[0].ITEMS.isLoss,
        expired: !!it.filter((i) => Day.comparisonStorageExpired(i)).length,
      });
    });

    return end;
  }

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

  const col = ref('c1');
</script>
