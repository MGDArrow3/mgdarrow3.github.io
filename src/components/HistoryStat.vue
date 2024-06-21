<template>
  <div class="history__all">
    <VCards :col="'c1'">
      <div v-for="(groupe, date) in groupes" :key="groupe.id" class="cards">
        <div class="cards__title" :style="{ background: date === 'Получено' ? 'var(--col-green)' : 'var(--col-red)' }">
          {{ date }}
        </div>
        <VCardsItem v-for="(item, name) in groupe" :key="item.id" :open="false">
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
    const g = Object.groupBy(history.value, (i) => {
      if (i.DONORS?.name) return 'Получено';
      return 'Отдано';
    });

    if (g['Получено']) {
      g['Получено'] = Object.groupBy(g['Получено'], (i) => i.ITEMS.name);
      for (const items in g['Получено']) {
        g['Получено'][items] = {
          count: g['Получено'][items].reduce((acc, i) => acc + i.count, 0),
          ci: g['Получено'][items][0].ITEMS.ci,
        };
      }
    }
    if (g['Отдано']) {
      g['Отдано'] = Object.groupBy(g['Отдано'], (i) => i.ITEMS.name);
      for (const items in g['Отдано']) {
        g['Отдано'][items] = {
          count: g['Отдано'][items].reduce((acc, i) => acc + i.count, 0),
          ci: g['Отдано'][items][0].ITEMS.ci,
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
