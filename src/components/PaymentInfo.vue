<template>
  <div class="info">
    <p class="info__title">Информация об оплате:</p>
    <div class="info__input-group">
      <span class="info__span">Номер счета:</span>
      <input
        class="info__input"
        v-model="accountNumber"
        type="text"
        title="Введите номер счета"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        pattern="[0-9]+"
        required
      >
    </div>
    <div class="info__input-group">
      <span class="info__span">Сумма платежа:</span>
      <input
        class="info__input"
        v-model="amount"
        type="text"
        title="Введите число больше 0"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        pattern="[0-9]+"
        required
      >
      <label> руб.</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  @include content;

  &__input {
    @include input;

    margin: 0 10px 0 0;
    padding-top: 10px;
  }

  &__title {
    margin-top: 0;
  }

  &__span {
    display: inline-block;
    width: 160px;
  }
}

@media (max-width: 450px) {
  .info {
    &__span {
      display: block;
    }
  }
}
</style>