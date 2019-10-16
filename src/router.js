import Vue from 'vue';
import Router from 'vue-router';
import Payment from '@/views/Payment.vue';
import PaymentSuccess from '@/views/PaymentSuccess.vue';
import History from '@/views/History.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: PaymentSuccess,
      props: true,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '*',
      redirect: '/history',
    },
  ],
});
