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
export default {
  data() {
    return {
      drawer: this.$vuetify.breakpoint.lgAndUp,
    };
  },
};
</script>
