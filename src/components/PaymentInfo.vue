<template>
  <div class="info">
    <p class="info__title">Информация об оплате:</p>
    <div class="info__input-group">
      <span class="info__span">Номер счета:</span>
      <b-form-input
        class="info__input" title="Введите номер счета"
        v-model="$v.accountNumber.$model" @keypress="onlyNumber"
        :state="$v.accountNumber.$dirty ? !$v.accountNumber.$error : null"
        aria-describedby="info__invalid-account-number" maxlength="3"
      />
      <b-form-invalid-feedback id="info__invalid-account-number">
        Необходимо ввести 3 цифры.
      </b-form-invalid-feedback>
      <!-- <input
        class="info__input" title="Введите номер счета" 
        v-model="$v.accountNumberComputed.$model" type="text"
        :state="$v.accountNumberComputed.$dirty ?  
          $v.accountNumberComputed.$error : null"
      >
      {{ $v.accountNumberComputed }} -->
    </div>
    <div class="info__input-group">
      <span class="info__span">Сумма платежа:</span>
      <input
        class="info__input" v-model="amount"
        type="text" title="Введите число больше 0"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        pattern="[0-9]+" required
      >
      <label> руб.</label>
    </div>
  </div>
</template>

<script>
import { required, minLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentInfo',
  mixins: [input,], // берем отсюда метод OnlyNumber
  data() {
    return {
      accountNumber: '',
    };
  },
  computed: {
    accountNumberComputed: {
      get() {
        return this.accountNumber;
      },
      set(value) {
        this.$emit('setCardCode', value);
        this.accountNumber = value;
      },
    },
  },
  validations: {
    accountNumberComputed: {
      type: Number,
      required,
      minLength: minLength(5),
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  @include content;

  &__input {
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