<template>
  <div class="info">
    <p class="info__title">Информация об оплате:</p>
    <div class="info__input-group">
      <span class="info__span">Номер счета:</span>
      <!-- <input
        class="info__input" title="Введите номер счета"
        v-model="$v.accountNumber.$model" @keypress="onlyNumber"
        :class="{
          'input-error': $v.accountNumber.$invalid && $v.accountNumber.$dirty,
          'input-success': !$v.accountNumber.$invalid}"
        maxlength="20"
        @input="
          !$v.accountNumber.$invalid ? 
            setInfo('accountNumber', $v.accountNumber) : '';
          !$v.accountNumber.$invalid && $v.accountNumber.$model.length == 20 ? 
            $event.target.nextElementSibling.focus() : ''"
      > -->
      <input
        class="info__input" title="Введите номер счета"
        v-model="accountNumber" @keypress="onlyNumber"
        :class="{
          'input-error': v.accountNumber.$invalid && v.accountNumber.$dirty,
          'input-success': !v.accountNumber.$invalid}"
        maxlength="20"
      >
      <div 
        class="error"
        v-if="!v.accountNumber.required && v.accountNumber.$dirty"
      >
        Поле обязательно.
      </div>
      <div 
        class="error" 
        v-if="!v.accountNumber.minLength && v.accountNumber.$dirty"
      >
        Необходимо ввести 20 цифр.
      </div>
    </div>
    <div class="info__input-group">
      <span class="info__span">Сумма платежа:</span>
      <input
        class="info__input" title="Введите сумму платежа"
        v-model="amount" @keypress="onlyNumber"
        :class="{
          'input-error': v.amount.$invalid && v.amount.$dirty,
          'input-success': !v.amount.$invalid}" 
        maxlength="20"
      >
      <label>&nbsp;&nbsp;руб.</label>
      <div class="error" v-if="!v.amount.required && v.amount.$dirty">
        Поле обязательно.
      </div>
      <div class="error" v-if="!v.amount.minValue  && v.amount.$dirty">
        Сумма должна быть больше или равна 100.
      </div>
    </div>
  </div>
</template>

<script>
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentInfo',
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
    accountNumber: {
      get() {
        return this.value.accountNumber;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', { ...this.value, ['accountNumber']: value, });
      },
    },
    amount: {
      get() {
        return this.value.amount;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', { ...this.value, ['amount']: value, });
      },
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