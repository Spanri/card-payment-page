<template>
  <div class="nav">
    <router-link to="/" class="nav__item disable">
      Личный кабинет
    </router-link>
    <router-link to="/payment" class="nav__item">
      Платежи
    </router-link>
    <router-link to="/history" class="nav__item">
      История платежей
    </router-link>
    <router-link to="/" class="nav__item disable">
      Настройки
    </router-link>
    <router-link to="/" class="nav__item disable">
      Выйти
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  background-color: $color-backg-menu-active;
  color: $color-gray-medium;
  pointer-events: none;
  transition: all 0.4s ease-out;
}

.nav {
  @include disable;

  display: flex;
  flex-direction: column;
  padding: 0;
  font-size: 1.125em;
  min-width: 322px;

  &__item {
    font-family: $primary-font;
    color: $color-gray-light;
    padding: 30px;
    text-decoration: none;
    text-align: center;

    &:hover {
      color: $color-gray-medium;
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

  &__item:last-child {
    color: $color-gray-medium;
  }
}

@media (max-width: 1000px) {
  .nav {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .nav {
    &__item {
      padding: 20px;
    }
  }
}

@media (max-width: 400px) {
  .nav {
    font-size: 1em;

    &__item {
      padding: 15px;
    }
  }
}
</style>
