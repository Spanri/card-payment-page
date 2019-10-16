<template>
  <div class="ext-card">
    <span>Номер карты</span>
    <br>
    <div class="ext-card__input-number">
      <input
        v-for="(elem, index) in ['cardNumber1', 'cardNumber2', 'cardNumber3', 'cardNumber4']" :key="index"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        maxlength="4" title="Введите 4 цифры"
        pattern="[0-9]{4}" required
        type="text" :v-model="elem"
      >
    </div>
    <span>Срок действия</span>
    <br>
    <!-- Месяц срока действия -->
    <div class="ext-card__select">
      <select>
        <option v-for="(elem, index) in 12" :key="index">
          {{index + 1}}
        </option>
      </select>
    </div>
    <!-- Год срока действия -->
    <div class="ext-card__select">
      <select>
        <option v-for="(elem, index) in 50" :key="index">
          {{index + 1980}}
        </option>
      </select>
    </div>
    <br>
    <input
      class="ext-card__cardholder" v-model="cardHolder"
      type="text" placeholder="Держатель карты"
      title="Введите имя и фамилию держателя карты. Только латинские буквы и пробелы" pattern="[a-zA-Z ]{4,}"
      oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
      minlength="4" required
    >
  </div>
</template>

<style lang="scss" scoped>
input {
  @include input;
}

.ext-card {
  z-index: 1;
  position: absolute;
  padding: 22px 15px 15px;
  width: 350px;
  border: 1px $color-border solid;
  border-radius: 10px;
  background: $color-backg-content;

  &__input-number:last-child {
    margin-right: 0;
  }

  &__input-number input {
    width: 40px;
  }

  &__select {
    position: relative;
    display: inline;

    &:after {
      content: "v";
      width: 0;
      height: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      top: -10px;
      right: 35px;
      border-top: 8px solid black;
      opacity: 0.5;
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

@media (max-width: 800px) {
  .ext-card {
    position: static;
  }
}

@media (max-width: 450px) {
  .ext-card {
    width: 250px;

    &__select {
      padding-right: 20px;

      &:after {
        top: -10px;
        right: 30px;
      }
    }
  }
}
</style>