import Vue from 'vue';
import Vuetify from 'vuetify';
import VueMeteorTracker from 'vue-meteor-tracker';
import App from './App.vue';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

Vue.use(Vuetify);
Vue.use(VueMeteorTracker);

Meteor.startup(() => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    vuetify: new Vuetify({}),
    ...App,
  });
});
