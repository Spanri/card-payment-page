<template>
  <form class="payment" @submit.prevent="submit">
    <!-- <PaymentInfo class="payment__info"/> -->
    <div class="payment__card">
      <p class="payment__card-title">Данные банковской карты</p>
      <div class="payment__card-details">
        <!-- <PaymentExtCard class="payment__ext-card" /> -->
        <PaymentIntCard
          class="payment__ext-card" @setIntCard="setIntCard"
        />
        <PaymentIntCard
          class="payment__int-card" @setIntCard="setIntCard"
        />
      </div>
    </div>
    <button type="submit" class="payment__submit">
      Оплатить
    </button>
  </form>
</template>

<script>
export default {
  name: 'Payment',
  components: {
    //PaymentInfo: () => import("@/components/PaymentInfo"),
    // PaymentExtCard: () => import("@/components/PaymentExtCard"),
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
    setIntCard(val) {
      this.cardCode = val;
      console.log(this.cardCode);
    },
    dateFormat(date) {
      let months = [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек', ];
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    },
    submit2() {
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
    submit() {
      this.$v.$touch();
      // if (!this.$v.$invalid) {
      //   this.$store.dispatch("register").then(() => {
      //     this.$emit("next", "SignUp3");
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
input, select {
  color: $color-gray-pre-dark;
  border: 1px $color-border solid;
  padding: 10px;
  font-size: 1em;

  @media (max-width: 450px) {
    padding: 5px;
  }
}

.payment {
  @include content;

  &__card {
    &-title {
      font-family: OpenSans-Bold, sans-serif;
      font-size: 1.374em;
      color: $color-gray-dark;
    }

    &-details {
      position: relative;
      height: 260px;
    }
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
  color: $color-gray-pre-medium !important;
  opacity: 1;
}

button {
  border: 0;
  border-radius: 30px;
  background: $color-payment-button-dark;
  background: linear-gradient(0deg, $color-payment-button-dark 0%, $color-payment-button-light 100%);
  color: $color-gray-light;
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
