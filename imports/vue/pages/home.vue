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
        <!-- Status bar -->
        <v-expansion-panel
          disabled
          class="blue-grey lighten-5 black--text"
        >
          <v-expansion-panel-header :hide-actions="true">
            <v-layout
              align-center
              spacer
              mr-3
              pr-3
              class="font-weight-bold"
            >
              <v-flex
                xs2
                md1
              >
                <span class="hidden-md-and-down">Status</span>
              </v-flex>
              <v-flex
                md3
                xs5
              >
                Name
              </v-flex>
              <v-flex
                md3
                xs5
              >
                Cabin
              </v-flex>
              <v-flex
                md3
                hidden-sm-and-down
              >
                Number
              </v-flex>
              <v-flex
                md2
                hidden-sm-and-down
              >
                ID
              </v-flex>
            </v-layout>
          </v-expansion-panel-header>
        </v-expansion-panel>

        <v-expansion-panel
          v-for="session in sessions"
          :key="session._id"
        >
          <v-expansion-panel-header :class="{'warning lighten-3': session.status === 2}">
            <v-layout
              align-center
              spacer
            >
              <v-flex
                xs2
                md1
                text-xs-center
              >
                <v-icon
                  v-if="session.status === 1"
                  color="success"
                >
                  mdi-access-point
                </v-icon>
                <v-icon
                  v-if="session.status === 2"
                  color="warning"
                >
                  mdi-warning
                </v-icon>
              </v-flex>
              <v-flex
                xs6
                md3
                font-weight-medium
              >
                {{ session.first_name }} {{ session.last_name }}
              </v-flex>
              <v-flex
                xs5
                md3
              >
                {{ session.cabin }}
              </v-flex>
              <v-flex
                md3
                hidden-sm-and-down
              >
                {{ session.number }}
              </v-flex>
              <v-flex
                md2
                hidden-sm-and-down
              >
                {{ session.ID }}
              </v-flex>
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
