<template>
  <div class="history">
    <table v-if="payments.length != 0">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Номер счета</th>
          <th>Сумма платежа</th>
        </tr>
      </thead>
      <tbody>
        <tr
            :key="index"
            v-for="(payment, index) in payments">
          <td>{{payment.date}}</td>
          <td>{{payment.accountNumber}}</td>
          <td>{{payment.amount}}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Вы не совершили ни одного платежа.</p>
  </div>
</template>

<script>
export default {
  name: 'history',
  computed: {
    payments() {
      return this.$store.getters.getPayments;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/variables';
@import '../assets/css/right-part';

table {
  border-collapse: collapse;
  width: calc(100% - 30px);
  margin: 15px;
  margin-bottom: 0;
  text-align: center;
  word-break: break-all;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }

  thead {
    background-color: $color-backg-menu-bottom;

    th {
      padding: 15px;
      color: $color-text-light;
    }
  }

  tbody tr{
    border-bottom: 1px $color-border solid;

    td {
      padding: 20px;
    }
  }
}
</style>
