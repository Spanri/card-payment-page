<template>
  <div class="nav">
    <nav class="nav-inner nav__big">
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
    </nav>
    <nav class="nav-inner nav__small">
      <Hamburger 
        class="nav__hamburger" 
        @click="open = !open"
        @openMenu="openMenu"
        :open="open"
      />
      <!-- <transition name="fade"> -->
        <div class="nav__links" v-if="open">
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
      <!-- </transition> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {
    Hamburger: () => import("@/icons/Hamburger.vue"),
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openMenu(value) {
      this.open = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.nav {
  @include disable;

  z-index: 20;

  &__hamburger {
    padding: 15px 20px 15px 0;
    align-self: flex-end;
  }

  &-inner {
    display: flex;
    flex-direction: column;

    padding: 0;
    font: 1.125em;
    min-width: 322px;

    &.nav__big {
      display: flex;
    }

    &.nav__small {
      display: none;
    }

  }

  &__item {
    font: $primary-font;
    color: $color-gray-light;
    padding: 30px;
    text-decoration: none;
    text-align: center;

    &:hover {
      color: $color-gray-medium;
      transition: all 0.4s ease-out;
    }

    &.router-link-exact-active {
      background-color: $color-backg-menu-active;
      background-color: red;
      color: $color-gray-medium;
      pointer-events: none;
      transition: all 0.4s ease-out;
    }

  }

  /* полоса после 1ого пункта меню */
  &__item:first-child {
    border-bottom: 1px $color-stroke-dark solid;
  }

  /* полоса после 4ого пункта меню */
  &__item:first-child + * + * + * {
    border-bottom: 1px $color-stroke-light solid;
  }

  /* 1-3 элементы */
  &__item:nth-child(-n+3) {
    background: $color-backg-menu-top;
  }

  /* 4-5 элементы */
  &__item:nth-child(n+4) {
    background: $color-backg-menu-bottom;
  }

  &__item:last-child {
    color: $color-gray-medium;
  }

  &__links {
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 60px;

    padding: 0;
    font: 1.125em;
    width: 100%;
  }

}

@media (max-width: 1000px) {

  .nav {

    &-inner {
      min-width: 150px;
    }

    &__item {
      text-align: center;
    }
    
  }

}

@media (max-width: 768px) {

  .nav {

    &-inner {

      &.nav__big {
        display: none;
      }

      &.nav__small {
        display: flex;
      }

    }

    &__item {
      padding: 20px;
    }

  }

}

@media (max-width: 400px) {

  .nav {
    
    &-inner {
      font-size: 1em;
    }

    &__item {
      padding: 15px;
    }

  }
  
}
</style>
