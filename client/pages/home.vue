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
            <session-expansion-panel
              :session="session"
              :now="now"
              @clicked-delete="deleteRecord"
            />
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
import SessionExpansionPanel from '../components/sessionExpansionPanel.vue';
import { Sessions } from '../../imports/collections/Sessions';

export default {
  components: { SessionExpansionPanel },
  data() {
    return {
      now: new Date(),
    };
  },
  created () {
    this.updateTime();
    setInterval(this.updateTime, 5000);
  },
  destroyed () {
    clearInterval(this.updateTime);
  },
  methods: {
    deleteRecord(session) {
      Meteor.call('deleteSession', session._id);
    },
    updateTime() {
      this.now = new Date();
    },
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Sessions: [],
      Heartbeats: [],
    },
    sessions () {
      return Sessions.find();
    },
  },
};
</script>
