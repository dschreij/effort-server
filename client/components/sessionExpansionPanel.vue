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
          xs6
          md4
          font-weight-medium
        >
          <v-icon class="hidden-sm-and-down">
            mdi-account-circle
          </v-icon>
          {{ session.first_name }} {{ session.last_name1 }} {{ session.last_name2 }}
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
            @click.stop="$emit('clicked-delete', session)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pt-4">
      Content
    </v-expansion-panel-content>
  </div>
</template>

<script>
import differenceInSeconds from 'date-fns/difference_in_seconds';
import StatusIcon from './statusIcon.vue';
import { Heartbeats } from '../../imports/collections/Sessions';
import { STATUS } from '../constants';

export default {
  components: { StatusIcon },
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
  }),
  computed: {
    connected() {
      const tdiff = differenceInSeconds(this.now, this.heartbeat.client_time);
      if (tdiff < 60) {
        return true;
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