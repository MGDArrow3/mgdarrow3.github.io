<template>
  <div class="menu">
    <div class="menu__user username">{{ Auth.username.value }}</div>
    <router-link :to="{ name: 'Settings' }" class="menu__settings">
      <VIcon name="settings" />
    </router-link>
    <div class="menu__indicator">
      <div
        class="menu__indicator-storage"
        :class="{ 'menu__indicator-act': Storage.load.value }"
        @click="Storage.read()"
      >
        <VIcon name="storage" />
      </div>
      <div class="menu__indicator-donors" :class="{ 'menu__indicator-act': Donors.load.value }" @click="Donors.read()">
        <VIcon name="organization" />
      </div>
      <div class="menu__indicator-givers" :class="{ 'menu__indicator-act': Givers.load.value }" @click="Givers.read()">
        <VIcon name="givers" />
      </div>
      <div
        class="menu__indicator-catrgories"
        :class="{ 'menu__indicator-act': Categories.load.value }"
        @click="Categories.read()"
      >
        <VIcon name="categories" />
      </div>
      <div class="menu__indicator-items" :class="{ 'menu__indicator-act': Items.load.value }" @click="Items.read()">
        <VIcon name="item" />
      </div>
    </div>
    <router-link :to="{ name: 'Storage' }" class="menu__storage">
      <div v-if="isExpired" class="menu__expired"><VIcon name="expired" /></div>
      <VIcon name="storage" /><span>Склад</span>
    </router-link>
    <router-link :to="{ name: 'Accept' }" class="menu__accept">
      <VIcon name="accept" /><span>Принять</span>
    </router-link>
    <router-link :to="{ name: 'Donate' }" class="menu__donate"> <VIcon name="give" /><span>Раздать</span> </router-link>
    <router-link :to="{ name: 'History' }" class="menu__history">
      <VIcon name="history" /><span>История</span>
    </router-link>
    <router-link :to="{ name: 'Donors' }" class="menu__donors">
      <VIcon name="organization" /><span>Жертвователи</span>
    </router-link>
    <router-link :to="{ name: 'Givers' }" class="menu__givers">
      <VIcon name="givers" /><span>Получатели</span>
    </router-link>
    <router-link :to="{ name: 'Categories' }" class="menu__categories">
      <VIcon name="categories" /><span>Категории</span>
    </router-link>
    <router-link :to="{ name: 'Items' }" class="menu__items"> <VIcon name="item" /><span>Товары</span> </router-link>
  </div>
</template>

<script setup>
  import Auth from '@/services/auth';
  import Storage from '@/services/storage';
  import Donors from '@/services/donors';
  import Givers from '@/services/givers';
  import Categories from '@/services/categories';
  import Items from '@/services/items';
  import { computed } from 'vue';

  const isExpired = computed(() => Storage.expired.value);
</script>

<style lang="scss">
  .menu {
    display: grid;
    grid-template: 5dvh 5dvh repeat(12, 1fr) / repeat(6, 1fr);
    grid-template-areas:
      'user user user user user settings'
      'indicator indicator indicator indicator indicator indicator'
      'storage storage storage storage storage storage'
      'storage storage storage storage storage storage'
      'storage storage storage storage storage storage'
      'storage storage storage storage storage storage'
      'storage storage storage storage storage storage'
      'storage storage storage storage storage storage'
      'accept accept accept donate donate donate'
      'accept accept accept donate donate donate'
      'history history history history donors donors '
      'history history history history givers givers '
      'history history history history categories categories '
      'history history history history items items ';
    gap: 1dvh;
    width: 100vw;
    height: 100dvh;
    padding: 1dvh;
    font-weight: 500;
    font-size: 1.5em;
    & a {
      display: flex;
      flex-wrap: wrap;
      color: $col-revers;
      text-transform: uppercase;
      background: $col-main;
      border-radius: 1dvh;
      place-content: center center;
    }
    & svg {
      width: 100%;
      font-size: 2em;
    }
    & span {
      width: 100%;
      text-align: center;
    }
    &__user {
      grid-area: user;
    }
    &__settings {
      grid-area: settings;
      font-size: 0.7em;
      background: $col-main-dark !important;
    }
    &__indicator {
      display: flex;
      grid-area: indicator;
      gap: 1dvh;
      color: $col-revers;
      font-size: 0.5em;
      text-transform: uppercase;
      & div {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        background: $col-main;
        border: 0.5dvh solid $col-red;
        border-radius: 1dvh;
        &.menu__indicator-act {
          border: 0.5dvh solid $col-green;
        }
        & svg {
          display: block;
        }
      }
    }
    &__storage {
      position: relative;
      grid-area: storage;
      width: 100%;
      font-size: 3.5em;
      background: $col-main-dark !important;
      border: 0.5dvh solid $col-text;
    }
    &__accept {
      grid-area: accept;
    }
    &__donate {
      grid-area: donate;
    }
    &__history {
      grid-area: history;
      font-size: 2em;
    }
    &__donors {
      grid-area: donors;
      font-size: 0.5em;
    }
    &__givers {
      grid-area: givers;
      font-size: 0.5em;
    }
    &__categories {
      grid-area: categories;
      font-size: 0.5em;
    }
    &__items {
      grid-area: items;
      font-size: 0.5em;
    }
    &__expired {
      position: absolute;
      top: 0.8dvh;
      right: 0.8dvh;
      font-size: 0.8rem;
      animation: kf-blinker 1s linear infinite;
    }
  }
  .username {
    color: $col-revers;
    text-align: center;
    background: $col-main-light;
    border-radius: 1dvh;
  }

  @keyframes kf-blinker {
    50% {
      opacity: 0;
    }
  }
</style>
