import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/posts/add',
    name: 'PostAdd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
      // check vuex store //
      if (store.state.accessToken) {
        next();
      } else {
        next({
          name: 'Signin', // back to safety route //
        });
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PostAdd.vue'),
  },

  {
    path: '/posts/:id',
    name: 'PostDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PostDetail.vue'),
  },

  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
