<template>
  <div class="number-of-card">
    <span>Номер карты </span>
    <span v-for="(v, index) in cardNumber" :key="index + 100">  
      <span class="error" v-if="v.$invalid && v.$dirty">
         Поля обязательны (по 4 символа).
      </span>
    </span>
    <br>
    <div class="number-of-card__input-number-group">
      <input
        v-for="(v, index) in cardNumber" :key="index"
        class="number-of-card__input-number"
        maxlength="4" title="Введите 4 цифры"
        v-model="v.$model" @keypress="onlyNumber"
        :class="{
          'input-error': v.$anyError && v.$dirty,
          'input-success': !v.$invalid}"
      >
    </div>
  </div>
</template>

<script>
import { input, } from "@/mixins/input";
import getComputedArray from 'vue-computed-array';

export default {
  name: 'PaymentExtCardNumberOfCard',
  mixins: [input,], // берем отсюда метод onlyNumber
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
    cardNumber: getComputedArray({
      get() { return this.value; },
      set(value) { 
        this.v.$touch();
        this.$emit('input', value); 
      },
    },
    // {
    //   get: v => { return { foo: v};},
    //   set: v => { return { id: v.foo.key, name: v.foo.title, };},
    //   map: { foo: { key: 'id', },},
    // }
    ),
  },
};
</script>

<style lang="scss" scoped>
input, select {
  @include input;
}

.number-of-card {
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
    position: relative;
    display: inline;
    margin: 10px 0;

    &_month {
      margin-right: 10px;
    }

    &:after {
      content: "v";
      width: 0;
      height: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      top: -10px;
      right: 35px;
      border-top: 8px solid black;
      opacity: 0.5;
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

@media (max-width: 800px) {

  .number-of-card {
    position: static;
  }

}

@media (max-width: 450px) {

  .number-of-card {
    width: 250px;

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