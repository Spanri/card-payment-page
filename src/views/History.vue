<template>
  <div class="history">
    <table
      class="history__table"
      v-if="payments.length != 0"
    >
      <thead class="history__head">
        <tr class="history__head-tr">
          <th class="history__item">Дата</th>
          <th class="history__item">Номер счета</th>
          <th class="history__item">Сумма платежа</th>
        </tr>
      </thead>
      <tbody class="history__body" v-cloak>
        <tr
          v-for="(payment, index) in payments" :key="index"
          class="history__body-tr"
        >
          <td class="history__item">{{payment.date}}</td>
          <td class="history__item">{{payment.accountNumber}}</td>
          <td class="history__item">{{payment.amount}}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Вы не совершили ни одного платежа.</p>
  </div>
</template>

<script>
export default {
  name: 'History',
  computed: {
    payments() {
      return this.$store.getters.getPayments;
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  @include content;

  &__table {
    border-collapse: collapse;
    width: calc(100% - 30px);
    margin: 15px;
    margin-bottom: 0;
    text-align: center;
  }

  &__head {
    background-color: $color-backg-menu-bottom;

    .history__item {
      padding: 15px;
      color: $color-gray-light;
    }
  }

  &__body {
    word-break: break-all;

    &-tr {
      border-bottom: 1px $color-border solid;
    }

    .history__item {
      padding: 20px;
    }

  }
  
}

@media (max-width: 768px) {

  .history {
    flex: 100%;

    &__table {
      width: 100%;
      margin: 0;
    }

  }
  
}
</style>
