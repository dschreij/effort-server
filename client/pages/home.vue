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
      <div
        v-if="!$subReady.Sessions"
        class="text-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <div v-else-if="sessions.length">
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
                  md4
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
                  md2
                  hidden-sm-and-down
                >
                  ID
                </v-flex>
                <v-flex md2 />
              </v-layout>
            </v-expansion-panel-header>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="session in sessions"
            :key="session._id.valueOf()"
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
                    v-if="session.status === STATUS_DISCONNECTED"
                    color="grey lighten-2"
                  >
                    mdi-access-point-network-off
                  </v-icon>
                  <v-icon
                    v-if="session.status === STATUS_OK"
                    color="success"
                  >
                    mdi-access-point-network
                  </v-icon>
                  <v-icon
                    v-if="session.status === STATUS_WARNING"
                    color="warning"
                  >
                    mdi-alert
                  </v-icon>
                  <v-icon
                    v-if="session.status === STATUS_FINISHED"
                    color="success"
                  >
                    mdi-check-circle
                  </v-icon>
                </v-flex>
                <v-flex
                  xs6
                  md4
                  font-weight-medium
                >
                  <v-icon class="hidden-sm-and-down">
                    mdi-account-circle
                  </v-icon> {{ session.first_name }} {{ session.last_name1 }} {{ session.last_name2 }}
                </v-flex>
                <v-flex
                  xs5
                  md3
                >
                  <v-icon class="hidden-sm-and-down">
                    mdi-map-marker
                  </v-icon>
                  {{ session.cabin }}
                </v-flex>
                <v-flex
                  md2
                  hidden-sm-and-down
                >
                  <v-icon class="hidden-sm-and-down">
                    mdi-account-badge
                  </v-icon>
                  {{ session.ID }}
                </v-flex>
                <v-flex
                  md2
                  pr-3
                  text-right
                >
                  <v-btn
                    class="py-0 my-0"
                    x-small
                    icon
                    text
                    color="primary"
                    @click.stop="deleteRecord(session._id)"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <span class="font-weight-medium">Heartbeat: </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-flex
        v-else
        text-center
      >
        <h2 class="font-weight-light primary--text">
          There are currently no active connections.
        </h2>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { Sessions } from '../../imports/collections/Sessions';

export default {
  data: () => ({
    STATUS_DISCONNECTED: 0,
    STATUS_OK: 1,
    STATUS_WARNING: 2,
    STATUS_FINISHED: 3,
  }),
  methods: {
    deleteRecord(_id) {
      Meteor.call('deleteSession', _id);
    },
  },
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
