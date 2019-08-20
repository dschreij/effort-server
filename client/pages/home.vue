<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1 class="font-weight-light">
        Sessions
      </h1>
      <p>The sessions that are or have recently been active.</p>
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
        <v-expansion-panels multiple>
          <!-- Status bar -->
          <v-expansion-panel
            class="blue-grey lighten-5 black--text"
            readonly
          >
            <v-expansion-panel-header
              :hide-actions="true"
            >
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
                  xs8
                  md4
                >
                  Name
                </v-flex>
                <v-flex
                  xs3
                  md3
                >
                  Cabin
                </v-flex>
                <v-flex
                  md2
                  hidden-sm-and-down
                >
                  ID
                </v-flex>
                <v-flex
                  xs1
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
                    :disabled="incompleteSessions"
                    @click.stop="clickedDeleteAll"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-flex>
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
          There are currently no sessions to show.
        </h2>
      </v-flex>
    </v-flex>
    <v-dialog
      v-model="dialog.visible"
      persistent
      max-width="350"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="headline">
          {{ dialog.title }}
        </v-card-title>
        <v-card-text class="body-1">
          {{ dialog.contents }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog.visible = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteAllRecords"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import SessionExpansionPanel from '../components/sessionExpansionPanel.vue';
import { Sessions } from '../../imports/collections/Sessions';
import { STATUS } from '../constants';

export default {
  components: { SessionExpansionPanel },
  data() {
    return {
      now: new Date(),
      dialog: {
        visible: false,
        title: '',
        contents: ''
      },
    };
  },
  computed: {
    incompleteSessions() {
      return this.sessions.some((el) => (
        ![STATUS.STATUS_STOPPED, STATUS.STATUS_FINISHED].includes(el.status)
      ));
    }
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
    clickedDeleteAll() {
      this.dialog.title = 'Are you sure?';
      this.dialog.contents = 'You are about to delete all sessions';
      this.dialog.visible = true;
    },
    deleteAllRecords() {
      Meteor.call('deleteAllSessions');
      this.dialog.visible = false;
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
    },
    sessions () {
      return Sessions.find({}, {
        sort: {
          cabin: 1,
        },
      });
    },
  },
  metaInfo: {
    title: 'Sessions',
  }
};
</script>
