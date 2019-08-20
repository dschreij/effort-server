<template>
  <div>
    <v-expansion-panel-header
      :class="panelColor(session.status)"
    >
      <v-layout
        align-center
        spacer
      >
        <v-flex
          xs2
          md1
          text-xs-center
        >
          <status-icon
            :status="session.status"
            :connected="connected"
          />
        </v-flex>
        <v-flex
          xs8
          md4
          font-weight-medium
        >
          <v-icon class="hidden-sm-and-down">
            mdi-account-circle
          </v-icon>
          {{ session.first_name }} {{ session.last_name1 }} {{ session.last_name2 }}
        </v-flex>
        <v-flex
          xs3
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
          xs1
          md2
          pr-3
          text-right
        >
          <v-btn
            v-if="[STATUS_STOPPED, STATUS_FINISHED].includes(session.status) || !connected"
            class="py-0 my-0"
            x-small
            icon
            text
            color="primary"
            @click.stop="confirmDelete"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pt-4">
      <v-container
        grid-list-lg
        fluid
      >
        <v-layout wrap>
          <v-flex
            xs12
            md4
          >
            <current-stage
              :data="session.current"
              :finished="session.status === STATUS_FINISHED"
            />
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <current-performance :data="session.current" />
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <current-points :data="session.points" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
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
            @click="$emit('clicked-delete', session)"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import differenceInSeconds from 'date-fns/difference_in_seconds';
import CurrentPoints from './currentPoints.vue';
import CurrentPerformance from './currentPerformance.vue';
import CurrentStage from './currentStage.vue';
import StatusIcon from './statusIcon.vue';
import { Heartbeats } from '../../imports/collections/Sessions';
import { STATUS } from '../constants';

export default {
  components: {
    StatusIcon, CurrentStage, CurrentPerformance, CurrentPoints,
  },
  props: {
    session: {
      type: Object,
      required: true,
    },
    now: {
      type: Date,
      required: true,
    },
  },
  data: () => ({
    ...STATUS,
    dialog: {
      visible: false,
      title: '',
      contents: ''
    },
  }),
  computed: {
    connected() {
      if (this.heartbeat) {
        const tdiff = Math.abs(differenceInSeconds(this.now, this.heartbeat.client_time));
        if (tdiff < 60) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    panelColor(status) {
      return {
        'error lighten-3': status === this.STATUS_STOPPED,
        'warning lighten-3': status === this.STATUS_WARNING,
        'warning lighten-5': status === this.STATUS_PAUSED,
        'success lighten-5': status === this.STATUS_FINISHED,
      };
    },
    confirmDelete() {
      this.dialog.title = 'Are you sure?';
      this.dialog.contents = `You are about to delete the session of ${this.session.first_name}
        ${this.session.last_name1} ${this.session.last_name2}`;
      this.dialog.visible = true;
    },
  },
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Heartbeats: [],
    },
    heartbeat () {
      return Heartbeats.findOne({ session: this.session._id });
    },
  },
};
</script>
