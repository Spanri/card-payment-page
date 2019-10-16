<template>
  <form class="payment" @submit.prevent="submit">
    <PaymentInfo class="payment__info"/>
    <div class="card">
      <p class="card__title">Данные банковской карты</p>
      <div class="card__details">
        <PaymentExtCard class="card__ext-card" />
        <PaymentIntCard class="card__int-card"/>
      </div>
      <button class="card__submit">Оплатить</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Payment',
  components: { 
    PaymentInfo: () => import("@/components/PaymentInfo"),
    PaymentExtCard: () => import("@/components/PaymentExtCard"),
    PaymentIntCard: () => import("@/components/PaymentIntCard"),
  },
  data() {
    return {
      accountNumber: '',
      amount: '',
      cardNumber1: '',
      cardNumber2: '',
      cardNumber3: '',
      cardNumber4: '',
      cardHolder: '',
      cardCode: '',
    };
  },
  methods: {
    dateFormat(date) {
      let months = [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек', ];
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    },
    submit() {
      let payment = {
        accountNumber: this.accountNumber,
        amount: this.amount,
        cardHolder: this.cardHolder,
        date: this.dateFormat(new Date()),
      };
      this.$store.dispatch('addPayment', payment)
        .then(() => {
          this.$router.push({
            name: 'payment-success',
            params: {
              payment: payment,
            },
          });
        }).catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
input, select {
  color: $color-text-darker;
  border: 1px $color-border solid;
  padding: 10px;
  font-size: 1em;

  @media (max-width: 450px) {
    padding: 5px;
  }
}

input {
  &:invalid:focus {
    border: 1px solid red;
  }

  &:not(.payment__info-input) {
    margin: 5px 10px 10px 0;
  }

  &::-ms-clear {
    display: none;
  }
}

.card {
  &__title {
    font-family: OpenSans-Bold, sans-serif;
    font-size: 1.374em;
    color: $color-text-more-darker;
  }

  &__details {
    position: relative;
    height: 260px;
  }
}

select {
  appearance: none;
  padding-right: 30px;
  margin: 5px 10px 10px 0;

  &:hover {
    cursor: pointer;
  }

  &::-ms-expand {
    display: none;
  }
}

input::placeholder{
  color: $color-text !important;
  opacity: 1;
}

.payment {
  @include content;
}

button {
  border: 0;
  border-radius: 30px;
  background: $color-payment-button-dark;
  background: linear-gradient(0deg, $color-payment-button-dark 0%, $color-payment-button-light 100%);
  color: $color-text-light;
  padding: 13px 30px;
  font-family: OpenSans-Bold, sans-serif;
  font-size: 0.875em;
  margin: 40px 15px 0 15px;

  &:hover {
    cursor: pointer;
    background: $color-payment-button-dark-hover;
    background: linear-gradient(0deg, $color-payment-button-dark-hover 0%, $color-payment-button-light-hover 100%);
  }
}

@media (max-width: 800px) {
  .card {
    position: static;
    height: auto;
  }
}
</style>
