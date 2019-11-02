<template>
  <div class="number-of-card">
    <span>Номер карты </span>
    <span v-for="(vItem, index) in v.$each.$iter" :key="index + 100">  
      <span class="error" v-if="vItem.name.$invalid && vItem.name.$dirty">
         Поля обязательны (по 4 символа).
      </span>
      {{vItem.name}}
    </span>
    <!-- {{v.$each.$iter}} -->
    <br>
    <div class="number-of-card__input-number-group">
      <input
        v-for="(vItem, index) in v.$each.$iter" :key="index"
        class="number-of-card__input-number"
        maxlength="4" title="Введите 4 цифры"
        v-model="cardNumber[index].name"
        @keypress="onlyNumber"
        :class="{
          'input-error': vItem.name.$anyError && vItem.name.$dirty,
          'input-success': !vItem.name.$invalid}"
      >
      <!-- :value="cardNumber[index].name"
      @input="setInfo(index, $event)" -->
      <!-- :value="value[index].name"
      :value="cardNumber[index].name" -->
      <!-- v-model="cardNumber[index].name" -->
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
  data() {
    return {
      a: [{name: '',},{name: '',},{name: '',},{name: '',},],
    };
  },
  computed: {
    cardNumber: {
      get() {
        return this.value;
      },
      set(value) {
        console.log(value);
        //this.v.$touch();
        //this.$emit('input', value);
      },
    },
  },
  methods: {
    setInfo(index,$event) {
      // this.cardNumber
      console.log(this.a);
      this.value.map((v, i) => {
        if(i == index) {
          this.cardNumber[i].name = $event.data;
        }
      });
      console.log(this.cardNumber);
      this.$emit('input', this.cardNumber
      // this.value.map((v, i) => {
      //   if(i == index) {
      //     this.cardNumber[i].name=$event.data;
      //   }
      // })
      );
      this.v.$touch();
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