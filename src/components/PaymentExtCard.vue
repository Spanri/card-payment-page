<template>
  <div class="ext-card">
    <PaymentExtCardNumberOfCard
      class="ext-card__card-number"
      v-model="cardNumber" :v="v.cardNumber"
    />
    <div class="ext-card__expiration-date-wrapper">
      <PaymentExtCardExpirationDate
        class="ext-card__expiration-date"
        v-model="date" :v="v.date"
      />
      <span 
        class="error ext-card__error" 
        v-if="v.cardHolder.$invalid && v.cardHolder.$dirty"
      >
        Держатель карты - минимум 4 символа.
      </span>
    </div>
    <PaymentExtCardHolder
      class="ext-card__cardholder"
      v-model="cardHolder" :v="v.cardHolder"
    />
  </div>
</template>

<script>
export default {
  name: 'PaymentExtCard',
  components: {
    PaymentExtCardNumberOfCard: () => 
      import("@/components/PaymentExtCardNumberOfCard"),
    PaymentExtCardExpirationDate: () => 
      import("@/components/PaymentExtCardExpirationDate"),
    PaymentExtCardHolder: () => 
      import("@/components/PaymentExtCardHolder"),
  },
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
    cardNumber: {
      get() {
        return this.value.cardNumber;
      },
      set(value) {
        this.v.cardNumber.$touch();
        this.$emit('input', { ...this.value, ['cardNumber']: value, });
      },
    },
    date: {
      get() {
        return this.value.date;
      },
      set(value) {
        this.v.date.$touch();
        this.$emit('input', { ...this.value, ['date']: value, });
      },
    },
    cardHolder: {
      get() {
        return this.value.cardHolder;
      },
      set(value) {
        this.v.cardHolder.$touch();
        this.$emit('input', { ...this.value, ['cardHolder']: value, });
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

  &__error {
    width: max-content !important;
    padding-left: 30px;
    max-width: 130px;
    align-self: center;
    text-align: right;
  }

  &__expiration-date-wrapper {
    display: flex;
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

@media (max-width: 450px) {

  .error {
    display: block;
  }

  .ext-card {
    width: 230px;

    &__error {
      max-width: 100%;
      padding-left: 0;
      padding-bottom: 5px;
    }

    &__expiration-date-wrapper {
      display: block;
    }

  }

}
</style>