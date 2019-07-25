<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item
          exact
          :to="{name: 'home'}"
        >
          <v-list-item-action>
            <v-icon>mdi-lan-connect</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Current connections</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{name: 'leaderboard'}">
          <v-list-item-action>
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>EFFORT Monitor</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fill-height>
        <v-layout>
          <v-flex>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer
      color="indigo white--text"
      app
    >
      <v-spacer />&copy; 2019 EFFORT project. Created by Daniel Schreij<v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import '/imports/collections/Time';

export default {
  data() {
    return {
      drawer: this.$vuetify.breakpoint.lgAndUp,
    };
  },
  // Vue Methods
  methods: {
    updateTime() {
      console.log('Calling Meteor Method UpdateTime');
      Meteor.call('UpdateTime'); // not Meteor reactive
    },
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Time: [],
    },
    // A helper function to get the current time
    currentTime () {
      console.log('Calculating currentTime');
      const t = Time.findOne('currentTime') || {};
      return t.time;
    },
    // A Minimongo cursor on the Time collection is added to the Vue instance
    TimeCursor () {
      // Here you can use Meteor reactive sources like cursors or reactive vars
      // as you would in a Blaze template helper
      return Time.find({}, {
        sort: { time: -1 },
      });
    },
  },
};
</script>

<style scoped>
  p {
    font-size: 2em;
  }
</style>
