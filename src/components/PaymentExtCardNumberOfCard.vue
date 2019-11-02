<template>
  <div class="number-of-card">
    <span>Номер карты </span>
    <span class="error" v-if="v.$invalid && v.$dirty">
      &emsp;Поля обязательны (по 4 символа).
    </span>
    <br>
    <div class="number-of-card__input-number-group">
      <input
        v-for="(vItem, index) in v.$each.$iter" :key="index"
        class="number-of-card__input-number"
        maxlength="4" title="Введите 4 цифры"
        :value="cardNumber[index].name"
        @input="setInfo(index, $event.target.value)"
        @keypress="onlyNumber"
        :class="{
          'input-error': vItem.name.$anyError && vItem.name.$dirty,
          'input-success': !vItem.name.$invalid}"
      >
    </div>
  </div>
</template>

<script>
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentExtCardNumberOfCard',
  mixins: [input,], // берем отсюда метод onlyNumber
  props: {
    value: {
      type: Array,
      default: () => {},
    },
    v: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardNumber() {
      return this.value;
    },
  },
  methods: {
    setInfo(index, value) {
      this.value.map((v, i) => {
        if(i == index) {
          this.cardNumber[i].name = value;
        }
      });
      this.$emit('input', this.cardNumber);
      console.log(this.v.$each.$iter[index].name);
      this.v.$each.$iter[index].name.$touch();
    },
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