<template>
  <form class="payment" @submit.prevent="checkForm">
    <p class="payment__info-title">Информация об оплате:</p>
    <div class="payment__info-input">
      <span>Номер счета:</span>
      <input
        v-model="accountNumber"
        type="text"
        title="Введите номер счета"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        pattern="[0-9]+"
        required>
    </div>
    <div class="payment__info-input">
      <span>Сумма платежа:</span>
      <input
        v-model="amount"
        type="text"
        title="Введите число больше 0"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        pattern="[0-9]+"
        required>
      <label> руб.</label>
    </div>
    <div class="card">
      <p class="card__title">Данные банковской карты</p>
      <div class="card__details">
        <div class="ext-card">
          <span>Номер карты</span>
          <br>
          <div class="ext-card__input-number">
            <input
              v-for="(elem, index) in ['cardNumber1', 'cardNumber2', 'cardNumber3', 'cardNumber4']"
              :key="index"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              maxlength="4"
              title="Введите 4 цифры"
              pattern="[0-9]{4}"
              required
              type="text"
              :v-model="elem">
          </div>
          <span>Срок действия</span>
          <br>
          <!-- Месяц срока действия -->
          <div class="ext-card__select">
            <select>
              <option v-for="(elem, index) in 12" :key="index">
                {{index+1}}
              </option>
            </select>
          </div>
          <!-- Год срока действия -->
          <div class="ext-card__select">
            <select>
              <option v-for="(elem, index) in 50" :key="index">
                {{index+1980}}
              </option>
            </select>
          </div>
          <br>
          <input
            class="ext-card__cardholder"
            v-model="cardHolder"
            type="text"
            placeholder="Держатель карты"
            title="Введите имя и фамилию держателя карты. Только латинские буквы и пробелы"
            pattern="[a-zA-Z ]{4,}"
            oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
            minlength="4"
            required>
        </div>
        <div class="int-card">
          <div class="int-card__stripe"></div>
          <p>Код CVV2 / CVC2</p>
          <div class="int-card__input-code">
            <input
              maxlength="3"
              pattern="[0-9]{3}"
              title="Введите 3 цифры"
              required
              type="text"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              v-model="cardCode">
            <span></span>
          </div>
        </div>
      </div>
      <button>Оплатить</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'payment',
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
    checkForm(e) {
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

.payment {
  &__info-input {
    margin: 0 10px 0 0;
  }

  &__info-title {
    margin-top: 0;
  }

  &__info-input {
    padding-top: 10px;
  }

  &__info-input span {
    display: inline-block;
    width: 160px;

    @media (max-width: 450px) {
      display: block;
    }
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

    @media (max-width: 800px) {
      position: static;
      height: auto;
    }
  }
}

.ext-card {
  z-index: 1;
  position: absolute;
  padding: 22px 15px 15px;
  width: 350px;
  border: 1px $color-border solid;
  border-radius: 10px;
  background: $color-backg-content;

  @media (max-width: 800px) {
    position: static;
  }

  @media (max-width: 450px) {
    width: 250px;
  }

  &__input-number:last-child {
    margin-right: 0;
  }

  &__input-number input {
    width: 40px;
  }

  &__select {
    position: relative;
    display: inline;

    @media (max-width: 450px) {
      padding-right: 20px;
    }
  }

  &__select:after {
    content: "v";
    width: 0;
    height: 0;
    position: absolute;
    pointer-events: none;
  }

  &__select:after {
    top: -10px;
    right: 35px;
    border-top: 8px solid black;
    opacity: 0.5;

    @media (max-width: 450px) {
      top: -10px;
      right: 30px;
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

.int-card {
  position: absolute;
  top: 22px;
  right: 0px;
  padding: 15px 0;
  width: 380px;
  height: 207px;
  border: 1px $color-border solid;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 800px) {
    position: static;
    margin-top: 15px;
  }

  @media (max-width: 450px) {
    width: 280px;
    height: 206px;
  }

  p {
    text-align: right;
    padding-right: 10px;
    margin-top: 18px;
    margin-bottom: 0px;
  }

  input {
    float: right;
    clear: both;
    margin-right: 10px;
    width: 107px;

    @media (max-width: 1000px) {
      width: 91px;
    }

    @media (max-width: 450px) {
      width: 82px;
      background-size: 20px 20px;
      background-position: 93% center;
    }

    &:before {
      content: 'attr(data-tooltip)';
      position: absolute;
      opacity: 0;
      visibility: hidden;
      width: 140px;
      height: 40px;
      line-height: 40px;
      background: #3C4896;
      border-radius: 5px;
      bottom: 90px;
      left: calc(50% - 70px);
    }

    &:hover:before {
      bottom: 70px;
      opacity: 1;
      visibility: visible;
      transition: .2s ease-in-out .4s; /* сделаем появление подсказки с задержкой */
    }
  }

  &__input-code span{
    position: relative;
    top: 6px;
    right: -105px;
    z-index: 3;
    width: 25px;
    height: 40px;
    float: right;
    background-image: url('../assets/hint.png');
    background-repeat: no-repeat;
    background-size: 25px 25px;
    background-position: 95% 5px;

    @media (min-width: 1000px) {
      top: 8px;
      right: -120px;
    }

    @media (max-width: 450px) {
      top: 0px;
      right: -90px;
      background-size: 20px 20px;
      background-position: 93% center;
    }

    @media (max-width: 400px) {
      top: -2px;
      right: -90px;
      background-size: 15px 15px;
      background-position: 93% center;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__stripe{
    margin-top: 8px;
    width: 100%;
    height: 37.6px;
    background: $color-border;
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
</style>
