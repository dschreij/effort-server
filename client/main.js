import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Vuetify from 'vuetify/lib';
import VueMeteorTracker from 'vue-meteor-tracker';

import App from './App.vue';
import DefaultLayout from './layouts/Default.vue';
import BareLayout from './layouts/Bare.vue';

import routes from './routes';

import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueMeteorTracker);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

Vue.component('default-layout', DefaultLayout);
Vue.component('bare-layout', BareLayout);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes,
});

Meteor.startup(() => {
  new Vue({// eslint-disable-line no-new
    router,
    vuetify: new Vuetify({}),
    ...App
  }).$mount('#app');
});

if (module.hot) {
  module.hot.accept();
}
