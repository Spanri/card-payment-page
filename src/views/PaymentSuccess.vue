<template>
  <div class="payment-success">
    <p>Платеж прошел успешно. Данные платежа:</p>
    <p>Номер счета:
      <span class="payment-success__value">
        {{ paym.accountNumber }}
      </span>
    </p>
    <p>Сумма платежа:
      <span class="payment-success__value">
        {{paym.amount}}
      </span>
    </p>
    <p>Держатель карты:
      <span class="payment-success__value">
        {{paym.cardHolder}}
      </span>
    </p>
    <p>Дата оплаты:
      <span class="payment-success__value">
        {{paym.date}}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Payment-success',
  props: {
    payment: {
      type: Object,
      default: () => ({
        accountNumber: '',
        amount: 0,
        cardHolder: '',
        date: new Date(),
      }),
    },
  },
  data() {
    return {
      paym: this.payment,
    };
  },
  created() {
    if (typeof (this.paym) === 'undefined') {
      this.$router.push('/payment');
    }
  },
};
</script>

<style lang="scss" scoped>
.payment-success {
  @include content;

  &__value {
    color: $color-text-more-darker;
    font-family: OpenSans-Bold;
  }
}
</style>
