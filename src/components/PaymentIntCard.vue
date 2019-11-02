<template>
  <div class="int-card">
    <div class="int-card__line"></div>
    <p class="int-card__title">Код CVV2 / CVC2</p>
    <div class="int-card__input-group">
      <input
        class="int-card__input" title="Введите 3 цифры"
        v-model="cardCode" @keypress="onlyNumber"
        :class="{
          'input-error': v.cardCode.$invalid && v.cardCode.$dirty,
          'input-success': !v.cardCode.$invalid}"
        maxlength="3"
      >
      <span class="int-card__span"></span>
      <div 
        class="error int-card__error" 
        v-if="!v.cardCode.required && v.cardCode.$dirty"
      >
        Поле обязательно.
      </div>
      <div 
        class="error int-card__error" 
        v-if="!v.cardCode.minLength && v.cardCode.$dirty"
      >
        Нужно ввести 3 цифры.
      </div>
    </div>
  </div>
</template>

<script>
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentIntCard',
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
    cardCode: {
      get() {
        return this.value.cardCode;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', { ...this.value, ['cardCode']: value, });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control.is-invalid ~ .invalid-feedback {
  display: inline-block;
}

.invalid-feedback {
  text-align: right;
  padding: 5px 10px 0 0;
}

.int-card {
  @include error;

  &__error {
    display: inline-block;
    text-align: right;
    padding-right: 7px;
    box-sizing: border-box;
  }

  &__title {
    text-align: right;
    padding-right: 10px;
    margin-top: 18px;
    margin-bottom: 0px;
  }

  &__input {
    @include input;
    
    float: right;
    clear: both;
    margin-right: 10px;
    width: 107px;
  }

  &__span{
    position: relative;
    top: 2px;
    right: -105px;

    width: 25px;
    height: 40px;

    z-index: 3;
    float: right;
    background: url('../assets/hint.png') no-repeat;
    background-size: 25px 25px;
    background-position: 95% 5px;

    &:hover {
      cursor: pointer;
    }

    &:after {
      content: 'Код на обратной стороне карты';
      position: absolute;
      bottom: -90px;
      right: -10px;

      opacity: 0;
      visibility: hidden;
      background: $color-border;
      border-radius: 5px;
      padding: 5px;

      color: $color-gray-pre-dark;
      line-height: 20px;
      text-align: center;

      width: 115px;
      height: auto;
    }

    /* появление подсказки */
    &:hover:after {
      bottom: -55px;
      opacity: 1;
      visibility: visible;
      transition: all ease-in-out .4s;
    }

  }

  &__line{
    width: 100%;
    height: 37.6px;

    margin-top: 8px;
    background: $color-border;
  }

}

@media (max-width: 1000px) {

  .int-card {

    &__input {
      width: 91px;
    }

  }

}

@media (max-width: 768px) {

  .int-card {
    position: static;
    margin-top: 15px;
  }

}

@media (max-width: 450px) {

  .int-card {
    width: 280px;
    height: 206px;

    &__input {
      width: 82px;
      background-size: 20px 20px;
      background-position: 93% center;
    }

    &__span {
      top: -5px;
      right: -90px;

      background-size: 20px 20px;
      background-position: 93% center;
    }

  }

}

@media (max-width: 450px) {

  .int-card {
    height: 170px;
  }
}

@media (max-width: 400px) {

  .int-card {

    &__span {
      top: -7px;
      right: -90px;

      background-size: 15px 15px;
      background-position: 93% center;
    }

  }

}
</style>