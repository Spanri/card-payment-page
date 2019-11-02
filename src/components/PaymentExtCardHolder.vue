<template>
  <div class="cardholder">
    <input
      class="cardholder__input" placeholder="Держатель карты"
      title="Введите имя и фамилию держателя карты" minlength="4"
      v-model="cardHolder" @keypress="onlyLatinLetters"
      :class="{
        'input-error': v.$invalid && v.$dirty,
        'input-success': !v.$invalid}"
    >
  </div>
</template>

<script>
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentExtCard',
  mixins: [input,], // берем отсюда метод onlyLatinLetters
  props: {
    value: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardHolder: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      },
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

@media (max-width: 768px) {

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