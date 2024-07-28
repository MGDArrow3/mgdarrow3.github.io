<template>
  <main class="history">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="history" />История</h1>
    </router-link>
    <HistoryMenu v-model="menu" />
    <HistoryCalendar v-if="menu !== 'all'" v-model="date" />

    <Suspense>
      <HistoryAll v-if="menu === 'all'" />
      <template #fallback>
        <div class="back__loader">
          <span class="loader" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <HistoryStat v-if="menu === 'month'" :date="date" />
      <template #fallback>
        <div class="back__loader">
          <span class="loader" />
        </div>
      </template>
    </Suspense>

    <Suspense>
      <HistoryPerson v-if="menu === 'person'" :date="date" />
      <template #fallback>
        <div class="back__loader">
          <span class="loader" />
        </div>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
  import HistoryCalendar from '@/components/HistoryCalendar.vue';
  import HistoryMenu from '@/components/HistoryMenu.vue';
  import HistoryAll from '@/components/HistoryAll.vue';
  import HistoryStat from '@/components/HistoryStat.vue';
  import HistoryPerson from '@/components/HistoryPerson.vue';
  import { ref } from 'vue';

  const menu = ref('all');
  const date = ref(Date.now());
</script>

<style lang="scss">
  .back__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
