<template>
  <div class="expiration-date">
    <span>Срок действия</span>
    <br>
    <!-- Месяц срока действия -->
    <div class="expiration-date__select-wrapper">
      <select 
        class="expiration-date__select expiration-date__select_month"
        v-model="month" placeholder="ffff"
      >
        <option v-for="(elem, index) in 12" :key="index">
          {{index + 1}}
        </option>
      </select>
    </div>
    <!-- Год срока действия -->
    <div class="expiration-date__select-wrapper">
      <select 
        class="expiration-date__select expiration-date__select_year"
        v-model="year"
      >
        <option v-for="(elem, index) in 50" :key="index">
          {{index + 1980}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentExtCardExpirationDate',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    v: {
      type: Object,
      required: true,
    },
  },
  computed: {
    month: {
      get() {
        return this.value.month;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', { ...this.value, ['month']: value, });
      },
    },
    year: {
      get() {
        return this.value.year;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', { ...this.value, ['year']: value, });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.expiration-date {
  @include error;

  &__input-number-group:last-child {
    margin-right: 0;
  }

  &__input-number {
    width: 40px;
    margin: 10px 0;
  }

  &__input-number + &__input-number {
    margin-left: 10px;
  }

  &__select {
    @include input;

    appearance: none;
    padding-right: 30px;
    margin: 5px 10px 10px 0;

    &-wrapper {
      position: relative;
      display: inline;
    }

    &_month {
      margin-right: 10px;
    }

    &::-ms-expand {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }

    &-wrapper:after {
      content: "v";
      font-family: OpenSans, sans-serif;
      color: $color-gray-medium;
      
      width: 0;
      height: 0;
      position: relative;
      top: 0px;
      left: -30px;
      cursor: pointer;
    }

  }

  &__cardholder {
    width: calc(100% - 20px);
  }

  &__input-code div {
    position: absolute;

    /* These are set relative to the height of the input box to bound the box neatly inside. This is aesthetic to me but you may change the dimensions of course. */
    right: 0.3rem;
    top: 0.3rem;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.3rem;

    /* content in the icon div is centered, without bootstrap or font-awesome you may wish to add your own text in the span */
    display: flex;
    justify-content: center;
    align-items: center;
    
    box-sizing: border-box;
  }

}

@media (max-width: 768px) {

  .expiration-date {
    position: static;
  }

}

@media (max-width: 450px) {

  .expiration-date {

    &__select {
      padding-right: 20px;

      &:after {
        top: -10px;
        right: 30px;
      }

    }

  }

}
</style>