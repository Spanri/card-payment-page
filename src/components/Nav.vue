<template>
  <div class="nav">
    <router-link to="/" class="nav__item nav__item_disabled">Личный кабинет</router-link>
    <router-link to="/payment" class="nav__item">Платежи</router-link>
    <router-link to="/history" class="nav__item">История платежей</router-link>
    <router-link to="/" class="nav__item nav__item_disabled">Настройки</router-link>
    <router-link to="/" class="nav__item nav__item_disabled">Выйти</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/css/variables';

.nav {
  display: flex;
  flex-direction: column;
  padding: 0;
  font-size: 1.125em;
  min-width: 322px;

  @media (max-width: 1000px) {
    min-width: 200px;
  }

  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 400px) {
    text-align: center;
    font-size: 1em;
  }

  a {
    font-family: $primary-font;
    color: $color-text-light;
    padding: 30px;
    text-decoration: none;

    @media (max-width: 768px) {
      padding: 20px;
    }

    @media (max-width: 400px) {
      padding: 15px;
    }

    &:hover {
      color: $color-text-dark;
    }

    &.router-link-exact-active {
      background-color: $color-backg-menu-active;
      color: $color-text-dark;
      pointer-events: none;
      transition: all 0.4s ease-out;
    }
  }

  /* полоса после 1ого пункта меню */
  &__item:nth-child(1) {
    border-bottom: 1px $color-stroke-dark solid;
  }

  /* полоса после 4ого пункта меню */
  &__item:nth-child(4) {
    border-bottom: 1px $color-stroke-light solid;
  }

  /* 1-3 элементы */
  &__item:nth-child(-n+3) {
    background-color: $color-backg-menu-top;
  }

  /* 4-5 элементы */
  &__item:nth-child(n+4) {
    background-color: $color-backg-menu-bottom;
  }

  /* некликабельные ссылки */
  &__item_disabled {
    pointer-events: none;
  }

  &__item:nth-last-child(1) {
    color: $color-text-dark;
  }
}
</style>