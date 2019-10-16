import Vue from 'vue';
import Router from 'vue-router';
import Payment from '@/views/Payment.vue';
import PaymentSuccess from '@/views/PaymentSuccess.vue';
import History from '@/views/History.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {
        title: 'Платежи',
      },
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: PaymentSuccess,
      props: true,
      meta: {
        title: 'Платеж прошел успешно',
      },
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        title: 'История платежей',
      },
    },
    {
      path: '*',
      redirect: '/history',
    },
  ],
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title ? to.meta.title : 'Страница платежей';
  });
});

export default router;
