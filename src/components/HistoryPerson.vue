<template>
  <div class="history__all">
    <VCards :col="'c1'">
      <div v-for="(groupe, date) in groupes" :key="groupe.id" class="cards">
        <div class="cards__title" :style="{ background: groupe.isAccept ? 'var(--col-green)' : 'var(--col-red)' }">
          {{ date }}
        </div>
        <VCardsItem v-for="(item, name) in groupe.items" :key="item.id" :open="false">
          <template v-slot:basic>
            <div class="basic__info">
              <div class="basic__info-name">
                {{ name }}
              </div>
              <div class="basic__info-count">{{ countText(item) }}</div>
            </div>
          </template>
        </VCardsItem>
      </div>
    </VCards>
  </div>
</template>

<script setup>
  import { computed, ref, watch, toRefs } from 'vue';
  import Filter from '@/services/filter';
  import History from '@/services/history';

  const props = defineProps(['date']);
  const { date } = toRefs(props);
  const history = ref([]);
  await History.readMonth(date.value).then((e) => (history.value = e));
  watch(date, async (newValue) => {
    await History.readMonth(newValue).then((e) => (history.value = e));
  });

  const groupes = computed(() => {
    const g = Object.groupBy(history.value, (i) => i.DONORS?.name || i.GIVERS?.name);

    for (const giver in g) {
      g[giver] = {
        isAccept: !!g[giver][0].DONORS?.name,
        items: Object.groupBy(g[giver], (i) => i.ITEMS.name),
      };

      for (const item in g[giver].items) {
        g[giver].items[item] = {
          count: g[giver].items[item].reduce((acc, i) => acc + i.count, 0),
          ci: g[giver].items[item][0].ITEMS.ci,
        };
      }
    }
    return g;
  });

  function countText(item) {
    return `${item.count} ${Filter.getNumberCaseCi(item.ci, item.count)}`;
  }
</script>

<style lang="scss">
  .history__all {
    width: 100%;
    overflow: auto;
  }
</style>
