<template>
  <div class="info">
    <p class="info__title">Информация об оплате:</p>
    <div class="info__input-group">
      <span class="info__span">Номер счета:</span>
      <b-form-input
        class="info__input" title="Введите номер счета"
        v-model="$v.accountNumber.$model" @keypress="onlyNumber"
        :state="$v.accountNumber.$dirty ? !$v.accountNumber.$error : null"
        aria-describedby="info__invalid-account-number" maxlength="20"
      />
      <b-form-invalid-feedback id="info__invalid-account-number">
        Необходимо ввести 20 цифр.
      </b-form-invalid-feedback>
    </div>
    <div class="info__input-group">
      <span class="info__span">Сумма платежа:</span>
      <b-form-input
        class="info__input" title="Введите сумму платежа"
        v-model="$v.amount.$model" @keypress="onlyNumber"
        :state="$v.amount.$dirty ? !$v.amount.$error : null"
        aria-describedby="info__invalid-amount"
      />
      <label> руб.</label>
      <b-form-invalid-feedback id="info__invalid-amount">
        Необходимо ввести сумму от 100р.
      </b-form-invalid-feedback>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentInfo',
  mixins: [input,], // берем отсюда метод OnlyNumber
  data() {
    return {
      accountNumber: '',
      amount: '',
    };
  },
  watch: {
    /* Отслеживаем изменение параметра invalid. Если он 
      сменился на false, значит значение больше не инвалид, 
      то есть валид, следовательно отправляем в родительский 
      блок. */
    '$v.accountNumber.$invalid'(newVal) {
      if (newVal == false) {
        this.$emit('setInfo', {
          accountNumber: this.accountNumber,
        });
      }
    },
    '$v.amount.$invalid'(newVal) {
      if (newVal == false) {
        this.$emit('setInfo', {
          amount: this.amount,
        });
      }
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
      maxValue: (value) => value > 100,
    },
  },
};
</script>

<style lang="scss" scoped>
.info {

  &__input-group {
    @include input;

    margin: 0 10px 0 0;
    padding-top: 10px;
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