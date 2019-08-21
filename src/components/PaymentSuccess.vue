<template>
  <div class="payment-success">
    <p>Платеж прошел успешно. Данные платежа:</p>
    <p>Номер счета: <span>{{paym.accountNumber}}</span></p>
    <p>Сумма платежа: <span>{{paym.amount}}</span></p>
    <p>Держатель карты: <span>{{paym.cardHolder}}</span></p>
    <p>Дата оплаты: <span>{{paym.date}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'payment-success',
  props: {
    payment: Object
  },
  data() {
    return{
      paym: this.payment
    }
  },
  created() {
    if (typeof(this.paym) == "undefined") {
      this.$router.push('/payment');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';
@import '../assets/css/right-part';

span {
  color: $color-text-more-darker;
  font-family: OpenSans-Bold;
}
</style>
