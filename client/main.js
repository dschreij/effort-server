import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import VueMeteorTracker from 'vue-meteor-tracker';

import routes from './routes';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueMeteorTracker);

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes,
});

Meteor.startup(() => {
  new Vue({ // eslint-disable-line no-new
    router,
    vuetify: new Vuetify({}),
    ...App,
  }).$mount('#app');
});

if (module.hot) {
  module.hot.accept();
}
