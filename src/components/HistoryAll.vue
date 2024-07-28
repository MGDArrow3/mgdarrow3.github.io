<template>
  <div ref="listEl" class="history__all">
    <VCards :col="'c1'">
      <div v-for="(groupe, date) in groupes" :key="groupe.id" class="cards">
        <div class="cards__title">{{ date }}</div>
        <VCardsItem v-for="item in groupe" :key="item.id" :class="{ borderGreen: item.DONORS, borderRed: item.GIVERS }">
          <template v-slot:basic>
            <div class="basic__info">
              <div class="basic__info-man">{{ item.DONORS?.name }} {{ item.GIVERS?.name }}</div>
              <div class="basic__info-name">
                {{ item.ITEMS.name }}
              </div>
              <div class="basic__info-count">{{ countText(item) }}</div>
            </div>
          </template>
          <template v-slot:open>
            <div class="info">
              <div v-if="item.DONORS" class="info__name">Принял:</div>
              <div v-else class="info__name">Отдал:</div>
              <div class="info__data">{{ item.created_user }}</div>
              <div v-if="item.DONORS" class="info__name">От кого:</div>
              <div v-if="item.DONORS" class="info__data">{{ item.DONORS.name }}</div>
              <div v-if="item.GIVERS" class="info__name">Кому:</div>
              <div v-if="item.GIVERS" class="info__data">{{ item.GIVERS.name }}</div>
              <div class="info__name">Время:</div>
              <div class="info__data">{{ Day.getFullTextWithTime(item.created_at) }}</div>
              <div class="info__name">Количество:</div>
              <div class="info__data">{{ item.count }} {{ Filter.getNumberCaseCi(item.ITEMS.ci, item.count) }}</div>
              <div v-if="item.ITEMS.isLoss && Day.isNotMissLoss(item.loss)" class="info__name">Срок годности:</div>
              <div v-if="item.ITEMS.isLoss && Day.isNotMissLoss(item.loss)" class="info__data">
                {{ Day.getFullText(item.loss) }}
              </div>
            </div>
          </template>
        </VCardsItem>
      </div>
    </VCards>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import Day from '@/services/date';
  import Filter from '@/services/filter';
  import History from '@/services/history';
  import { useInfiniteScroll } from '@vueuse/core';

  const listEl = ref(null);
  const itemToShow = 10;
  const isItemsInFetch = ref(true);
  const history = ref(await getItems(0, itemToShow));

  async function getItems(start, end) {
    return await History.read(start, end);
  }

  async function getItemsOnScroll(start) {
    if (isItemsInFetch.value) {
      try {
        const newItems = await getItems(start, start + itemToShow);
        history.value.push(...newItems);
        isItemsInFetch.value = !!newItems[0];
      } catch (err) {
        console.log(err);
      }
    }
  }
  useInfiniteScroll(
    listEl,
    async () => {
      await getItemsOnScroll(history.value.length);
    },
    { distance: 10 },
  );

  const groupes = computed(() => {
    return Object.groupBy(history.value, (i) => Day.getFullText(i.created_at));
  });

  function countText(item) {
    return `${item.count} ${Filter.getNumberCaseCi(item.ITEMS.ci, item.count)}`;
  }
</script>

<style lang="scss">
  .history__all {
    width: 100%;
    overflow: auto;
  }
</style>
