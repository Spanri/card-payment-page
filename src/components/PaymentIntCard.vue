<template>
  <div class="int-card">
    <div class="int-card__line"></div>
    <p class="int-card__title">Код CVV2 / CVC2</p>
    <div class="int-card__input-group">
      <b-form-input
        class="int-card__input" title="Введите 3 цифры"
        v-model="$v.cardCode.$model" @keypress="onlyNumber"
        :state="$v.cardCode.$dirty ? !$v.cardCode.$error : null"
        aria-describedby="int-card__invalid" maxlength="3"
      />
      <b-form-invalid-feedback id="int-card__invalid">
        Необходимо ввести 3 цифры.
      </b-form-invalid-feedback>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, } from 'vuelidate/lib/validators';
import { input, } from "@/mixins/input";

export default {
  name: 'PaymentIntCard',
  mixins: [input,], // берем отсюда метод OnlyNumber
  data() {
    return {
      cardCode: '',
      errors: [],
    };
  },
  watch: {
    /* Отслеживаем изменение параметра invalid у
      cardCode. Если он сменился на false, значит
      значение больше не инвалид, то есть валид,
      следовательно отправляем в родительский блок. */
    '$v.cardCode.$invalid'(newVal) {
      if (newVal == false) {
        this.$emit('setIntCard', this.cardCode);
      }
    },
  },
  validations: {
    cardCode: {
      type: Number,
      required,
      minLength: minLength(3),
      maxLength: maxLength(3),
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control.is-invalid ~ .invalid-feedback {
  display: inline-block;
}

.invalid-feedback {
  text-align: right;
  padding: 5px 10px 0 0;
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

  &__title {
    text-align: right;
    padding-right: 10px;
    margin-top: 18px;
    margin-bottom: 0px;
  }

  &__input {
    @include input;
    
    float: right;
    clear: both;
    margin-right: 10px;
    width: 107px;

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

    /* появление подсказки */
    &:hover:before {
      bottom: 70px;
      opacity: 1;
      visibility: visible;
      transition: .2s ease-in-out .4s;
    }
  }

  &__span{
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

    &:hover {
      cursor: pointer;
    }
  }

  &__line{
    margin-top: 8px;
    width: 100%;
    height: 37.6px;
    background: $color-border;
  }
}

@media (max-width: 1000px) {
  .int-card {
    &__input {
      width: 91px;
    }

    &__span {
      top: 8px;
      right: -120px;
    }
  }
}

@media (max-width: 800px) {
  .int-card {
    position: static;
    margin-top: 15px;
  }
}

@media (max-width: 450px) {
  .int-card {
    width: 280px;
    height: 206px;

    &__input {
      width: 82px;
      background-size: 20px 20px;
      background-position: 93% center;
    }

    &__span {
      top: 0px;
      right: -90px;
      background-size: 20px 20px;
      background-position: 93% center;
    }
  }
}

@media (max-width: 400px) {
  .int-card {
    &__span {
      top: -2px;
      right: -90px;
      background-size: 15px 15px;
      background-position: 93% center;
    }
  }
}
</style>