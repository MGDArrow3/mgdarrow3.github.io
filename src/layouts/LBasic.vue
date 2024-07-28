<template>
  <RouterView />
</template>

<script setup>
  import Donors from '@/services/donors';
  import Givers from '@/services/givers';
  import Categories from '@/services/categories';
  import Items from '@/services/items';

  Donors.read();
  Givers.read();
  Categories.read();
  Items.read();

  (function setExpired() {
    const expired = localStorage.getItem('expired');
    if (!expired) localStorage.setItem('expired', 2);
  })();
</script>
