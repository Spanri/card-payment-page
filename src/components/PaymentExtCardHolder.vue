<template>
  <div class="cardholder">
    <input
      class="cardholder__input" placeholder="Держатель карты"
      title="Введите имя и фамилию держателя карты" minlength="4"
      v-model="$v.cardHolder.$model" @keypress="onlyLatinLetters"
      :class="{
        'input-error': $v.cardHolder.$invalid && $v.cardHolder.$dirty,
        'input-success': !$v.cardHolder.$invalid}"
      @input="!$v.cardHolder.$invalid ? 
        setInfo('cardHolder', $v.cardHolder) : ''"
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
  name: 'PaymentExtCard',
  mixins: [input,], // берем отсюда метод onlyLatinLetters
  methods: {
    setInfo(valName, val) {
      this.$emit('setInfo', valName, val);
    },
  },
  data() {
    return {
      cardHolder: '',
    };
  },
  validations: {
    cardHolder: {
      type: String,
      required,
      minLength: minLength(3), // 1 для фамилии + пробел + 1 для имени
    },
  },
};
</script>

<style lang="scss" scoped>
input, select {
  @include input;
}

.cardholder {
  @include error;

  &__input {
    width: calc(100% - 20px);
  }

}

@media (max-width: 800px) {

  .cardholder {
    position: static;
  }

}

@media (max-width: 450px) {

  .cardholder {
    width: 250px;
  }

}
</style>