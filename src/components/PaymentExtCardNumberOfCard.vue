<template>
  <div class="number-of-card">
    <span>Номер карты </span>
    <span v-for="(v, index) in $v.cardNumber.$each.$iter" :key="index + 100">  
      <span class="error" v-if="v.name.$invalid && v.name.$dirty">
         Поля обязательны (по 4 символа).
      </span>
    </span>
    <br>
    <div class="number-of-card__input-number-group">
      <input
        v-for="(v, index) in $v.cardNumber.$each.$iter" :key="index"
        class="number-of-card__input-number"
        maxlength="4" title="Введите 4 цифры"
        v-model="v.name.$model" @keypress="onlyNumber"
        :class="{
          'input-error': v.name.$anyError && v.name.$dirty,
          'input-success': !v.name.$invalid}"
        @input="!v.name.$invalid ? setInfo(index, v.name.$model) : ''"
      >
    </div>
  </div>
</template>

<script>
import { required, minLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentExtCardNumberOfCard',
  mixins: [input,], // берем отсюда метод onlyNumber
  data() {
    return {
      cardNumber: [ {name: '',}, {name: '',}, 
        {name: '',}, {name: '',}, ],
    };
  },
  methods: {
    setInfo(index, val) {
      this.$emit('setInfo', 'cardNumber[' + index + ']', val);
    },
  },
  validations: {
    cardNumber: {
      required,
      $each: {
        name: {
          required,
          minLength: minLength(4),
        },
      },
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
  // z-index: 1;
  // position: absolute;
  // padding: 22px 15px 15px;
  // width: 350px;
  // border: 1px $color-border solid;
  // border-radius: 10px;
  // background: $color-backg-content;

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