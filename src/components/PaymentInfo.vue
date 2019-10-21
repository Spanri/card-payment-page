<template>
  <div class="info">
    <p class="info__title">Информация об оплате:</p>
    <div class="info__input-group">
      <span class="info__span">Номер счета:</span>
      <input
        class="info__input" title="Введите номер счета"
        v-model="$v.accountNumber.$model" @keypress="onlyNumber"
        :class="{
          'input-error': $v.accountNumber.$invalid && $v.accountNumber.$dirty,
          'input-success': !$v.accountNumber.$invalid}"
        maxlength="20"
        @input="
          !$v.accountNumber.$invalid ? 
            setInfo('accountNumber', $v.accountNumber.$model) : '';
          !$v.accountNumber.$invalid && $v.accountNumber.$model.length == 20 ? 
            $event.target.nextElementSibling.focus() : ''"
      >
      <div 
        class="error" 
        v-if="!$v.accountNumber.required && $v.accountNumber.$dirty"
      >
        Поле обязательно.
      </div>
      <div 
        class="error" 
        v-if="!$v.accountNumber.minLength && $v.accountNumber.$dirty"
      >
        Необходимо ввести 20 цифр.
      </div>
    </div>
    <div class="info__input-group">
      <span class="info__span">Сумма платежа:</span>
      <input
        class="info__input" title="Введите сумму платежа"
        v-model="$v.amount.$model" @keypress="onlyNumber"
        :class="{
          'input-error': $v.amount.$invalid && $v.amount.$dirty,
          'input-success': !$v.amount.$invalid}" 
        maxlength="20"
        @input="!$v.amount.$invalid ? 
          setInfo('amount', $v.amount.$model) : ''"
      >
      <label>&nbsp;&nbsp;руб.</label>
      <div class="error" v-if="!$v.amount.required && $v.amount.$dirty">
        Поле обязательно.
      </div>
      <div class="error" v-if="!$v.amount.minValue  && $v.amount.$dirty">
        Сумма должна быть больше или равна 100.
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentInfo',
  mixins: [input,], // берем отсюда метод onlyNumber
  data() {
    return {
      accountNumber: '',
      amount: '',
    };
  },
  methods: {
    setInfo(valName, val) {
      this.$emit('setInfo', valName, val);
    },
  },
  validations: {
    accountNumber: {
      type: Number,
      required,
      minLength: minLength(20),
      maxLength: maxLength(20),
    },
    amount: {
      type: Number,
      required,
      minValue: (value) => value >= 100,
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  @include error;
  margin-bottom: 25px;

  &__input-group {
    margin: 0 10px 0 0;
    padding-top: 10px;
  }

  &__input {
    @include input;
    min-width: 220px;
    background: $color-gray-light;
    color: $color-gray-dark;
    // border: 2px $color-gray-pre-medium solid;
    padding: 5px;
    font: 1em;
  }

  &__title {
    margin-top: 0;
  }

  &__span {
    display: inline-block;
    width: 160px;
  }

}

@media (max-width: 450px) {

  .info {

    &__span {
      display: block;
    }

  }

}
</style>