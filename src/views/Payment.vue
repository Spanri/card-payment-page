<template>
  <form 
    class="payment" @submit.prevent="submit"
    novalidate
  >
    <PaymentInfo 
      class="payment__info" 
      v-model="info" :v="$v.info"
    />
    <div class="payment__card">
      <p class="payment__card-title">Данные банковской карты</p>
      <div class="payment__card-details">
        <PaymentExtCard 
          class="payment__ext-card"
          v-model="extCard" :v="$v.extCard"
        />
        <PaymentIntCard 
          class="payment__int-card"
          v-model="intCard" :v="$v.intCard"
        />
      </div>
    </div>
    <button type="submit" class="payment__submit">
      Оплатить
    </button>
  </form>
</template>

<script>
import { required, minLength, } from 'vuelidate/lib/validators';

export default {
  name: 'Payment',
  components: {
    PaymentInfo: () => import("@/components/PaymentInfo"),
    PaymentExtCard: () => import("@/components/PaymentExtCard"),
    PaymentIntCard: () => import("@/components/PaymentIntCard"),
  },
  data() {
    return {
      info: {
        accountNumber: '', 
        amount: '',
      },
      extCard: {
        cardNumber: [
          {name: '',}, {name: '',}, 
          {name: '',}, {name: '',}, 
        ],
        date: {
          month: (new Date()).getMonth(),
          year: (new Date()).getFullYear(),
        },
        cardHolder: '',
      },
      intCard: {
        cardCode: '',
      },
    };
  },
  validations: {
    info: {
      accountNumber: {
        type: Number,
        required,
        minLength: minLength(20),
      },
      amount: {
        type: Number,
        required,
        minValue: (value) => value >= 100,
      },
    },
    extCard : {
      cardNumber: {
        required,
        $each: {
          name: {
            required,
            minLength: minLength(4),
          },
        },
      },
      date: {
        $each: {
          month: {},
          year: {},
        },
      },
      cardHolder: {
        type: String,
        required,
        minLength: minLength(3), // 1 для фамилии + 1 пробел + 1 для имени
      },
    },
    intCard: {
      cardCode: {
        type: Number,
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    setInfo(valName, val) {
      console.log(valName, val);
      this[valName] = val;
    },
    dateFormat(date) {
      let months = [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек', ];
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    },
    submit2() {
      let payment = {
        accountNumber: this.accountNumber,
        amount: this.amount,
        cardNumber: this.cardNumber,
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
      if (!this.$v.$invalid) {
        let payment = {
          accountNumber: this.info.accountNumber,
          amount: this.info.amount,
          cardNumber: this.extCard.cardNumber,
          cardHolder: this.extCard.cardHolder,
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
      }
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
      font: 1.374em OpenSans-Bold, sans-serif;
      color: $color-gray-dark;
    }

    &-details {
      position: relative;
      height: 260px;
    }

  }

  &__ext-card {
    z-index: 1;
    position: absolute;
    padding: 22px 15px 15px;
    width: 350px;
    border: 1px $color-border solid;
    border-radius: 10px;
    background: $color-backg-content;
  }

  &__int-card {
    position: absolute;
    top: 22px;
    right: 0px;

    padding: 15px 0;
    width: 380px;
    height: 207px;
    border: 1px $color-border solid;
    border-radius: 10px;
    overflow: hidden;
  }

  &__submit {
    border: 0;
    border-radius: 30px;
    background: $color-payment-button-dark;
    background: linear-gradient(
      0deg, $color-payment-button-dark 0%, 
      $color-payment-button-light 100%);
    color: $color-gray-light;
    padding: 13px 30px;
    font: .875em OpenSans-Bold, sans-serif;
    margin: 40px 15px 0 15px;

    &:hover {
      cursor: pointer;
      background: $color-payment-button-dark-hover;
      background: linear-gradient(
        0deg, $color-payment-button-dark-hover 0%, $color-payment-button-light-hover 100%);
    }

  }

}

@media (max-width: 768px) {

  .card {
    position: static;
    height: auto;
  }

}
</style>
