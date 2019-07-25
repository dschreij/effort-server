import Vue from 'vue';
import Vuetify from 'vuetify';
import VueMeteorTracker from 'vue-meteor-tracker';
// Import the router factory
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2';

import routes from './routes';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(VueMeteorTracker);

RouterFactory.configure((factory) => {
  // Simple routes
  factory.addRoutes(routes);
});

// Create router instance
const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior,
});

Meteor.startup(() => {
  const router = routerFactory.create();
  new Vue({ // eslint-disable-line no-new
    router,
    vuetify: new Vuetify({}),
    ...App,
  }).$mount('#app');
});
