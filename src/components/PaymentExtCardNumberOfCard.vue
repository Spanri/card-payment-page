<template>
  <div class="number-of-card">
    <span>Номер карты </span>
    <span class="error number-of-card__error" v-if="v.$invalid && v.$dirty">
      Поля обязательны (по 4 символа).
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

  &__error {
    padding-left: 10px;
  }

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

}

@media (max-width: 768px) {

  .number-of-card {
    position: static;
  }

}

@media (max-width: 450px) {

  .number-of-card {
    
    &__error {
      display: block;
      padding-left: 0;
      margin-bottom: -20px;
    }

  }

}
</style>