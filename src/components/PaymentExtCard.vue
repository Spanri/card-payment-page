<template>
  <div class="ext-card">
    <span>Номер карты</span>
    <br>
    <div class="ext-card__input-number-group">
      <input
        v-for="(v, index) in $v.cardNumber.$each.$iter" :key="index"
        class="ext-card__input-number"
        maxlength="4" title="Введите 4 цифры"
        v-model="v.$model" @keypress="onlyNumber"
        :class="{
          'input-error': v.$anyError && v.$dirty,
          'input-success': !v.$invalid}"
        @input="!v.$invalid ? setInfo('cardHolder', v.$model) : ''"
      >
      <div v-for="(v, index) in $v.cardNumber.$each.$iter" :key="index + 100">  
        <div class="error" v-if="!v.required && v.$dirty">
          Поле {{ +index + 1 }} обязательно.
        </div>
        <div class="error" v-if="!v.minLength && v.$dirty">
          В поле {{ +index + 1 }} необходимо ввести 4 символа.
        </div>
         <!-- {{ v }} -->
      </div>
    </div>
    <span>Срок действия</span>
    <br>
    <!-- Месяц срока действия -->
    <select class="ext-card__select ext-card__select_month">
      <option v-for="(elem, index) in 12" :key="index">
        {{index + 1}}
      </option>
    </select>
    <!-- Год срока действия -->
    <select class="ext-card__select ext-card__select_year">
      <option v-for="(elem, index) in 50" :key="index">
        {{index + 1980}}
      </option>
    </select>
    <br>
    <input
        class="ext-card__cardholder" placeholder="Держатель карты"
        title="Введите имя и фамилию держателя карты" minlength="4"
        v-model="$v.cardHolder.$model" @keypress="onlyLatinLetters"
        :class="{
          'input-error': $v.cardHolder.$invalid && $v.cardHolder.$dirty,
          'input-success': !$v.cardHolder.$invalid}"
        @input="!$v.cardHolder.$invalid ? 
          setInfo('cardHolder', $v.cardHolder.$model) : ''"
      >
      <div 
        class="error" 
        v-if="!$v.cardHolder.required && $v.cardHolder.$dirty"
      >
        Поле обязательно.
      </div>
      <div 
        class="error" 
        v-if="!$v.cardHolder.minLength && $v.cardHolder.$dirty"
      >
        Необходимо ввести как минимум 4 символа.
      </div>
  </div>
</template>

<script>
import { required, minLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentInfo',
  mixins: [input,], // берем отсюда метод onlyLatinLetters, onlyNumber
  data() {
    return {
      cardNumber: ['', '', '',],
      cardHolder: '',
      date: {
        month: '',
        year: '',
      },
    };
  },
  methods: {
    setInfo(valName, val) {
      this.$emit('setInfo', valName, val);
    },
  },
  validations: {
    cardHolder: {
      type: String,
      required,
      minLength: minLength(4),
    },
    cardNumber: {
      required,
      minLength: minLength(3),
      $each: {
        required,
        minLength: minLength(3),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
input, select {
  @include input;
}

.ext-card {
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

  .ext-card {
    position: static;
  }

}

@media (max-width: 450px) {

  .ext-card {
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