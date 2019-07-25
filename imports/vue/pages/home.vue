<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1 class="font-weight-light">
        Connections
      </h1>
      <p>These computers are currently connected to the server</p>
    </v-flex>
    <v-flex
      xs12
      xl10
      offset-xl1
      pt-5
    >
      <v-expansion-panels>
        <v-expansion-panel
          v-for="session in sessions"
          :key="session._id"
        >
          <v-expansion-panel-header>
            <v-layout
              align-center
              spacer
            >
              <v-flex
                xs1
                shrink
              >
                <v-avatar size="15px">
                  <v-icon>
                    mdi-alert
                  </v-icon>
                </v-avatar>
              </v-flex>
              <v-flex><strong>{{ session.first }} {{ session.last }}</strong></v-flex>
              <v-flex><strong>Number: </strong>{{ session.number }}</v-flex>
            </v-layout>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-flex>
  </v-layout>
</template>

<script>
import '/imports/collections/Sessions';

export default {
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Sessions: [],
    },
    // A helper function to get the current time
    sessions () {
      return Sessions.find({});
    },
  },
};
</script>
