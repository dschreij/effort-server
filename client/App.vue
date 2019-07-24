<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout>
          <v-flex text-center>
            It works!
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import '/imports/collections/Time';

export default {
  props: {
    source: String,
  },
  data() {
    return {
      drawer: null
    }
  },
  // Vue Methods
  methods: {
    updateTime() {
      console.log('Calling Meteor Method UpdateTime');
      Meteor.call('UpdateTime');          // not Meteor reactive
    }
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      'Time': []
    },
    // A helper function to get the current time
    currentTime () {
      console.log('Calculating currentTime');
      var t = Time.findOne('currentTime') || {};
      return t.time;
    },
    // A Minimongo cursor on the Time collection is added to the Vue instance
    TimeCursor () {
      // Here you can use Meteor reactive sources like cursors or reactive vars
      // as you would in a Blaze template helper
      return Time.find({}, {
        sort: {time: -1}
      })
    },
  }
}
</script>

<style scoped>
  p {
    font-size: 2em;
  }
</style>