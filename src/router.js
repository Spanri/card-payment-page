import Vue from 'vue'
import Router from 'vue-router'
import Payment from './components/Payment.vue'
import PaymentSuccess from './components/PaymentSuccess.vue'
import History from './components/History.vue'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: PaymentSuccess,
      props: true,
      // beforeEnter: ifPaymentSuccess,
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/',
      redirect: '/history'
    },
  ]
})
