<template>
  <div>
    <div v-if="status === STATUS_OK">
      <v-icon
        v-if="connected"
        color="success"
      >
        mdi-access-point-network
      </v-icon>
      <v-icon
        v-else
        color="grey"
      >
        mdi-access-point-network-off
      </v-icon>
    </div>
    <v-icon
      v-if="status === STATUS_STOPPED"
      color="danger lighten-2"
    >
      mdi-close-circle
    </v-icon>
    <v-icon
      v-if="status === STATUS_WARNING"
      color="warning"
    >
      mdi-alert
    </v-icon>
    <v-icon
      v-if="status === STATUS_FINISHED"
      color="success"
    >
      mdi-check-circle
    </v-icon>
    <v-icon
      v-if="status === STATUS_PAUSED"
      color="warning"
    >
      mdi-pause
    </v-icon>
  </div>
</template>

<script>
import { STATUS } from '../constants';

export default {
  props: {
    status: {
      type: Number,
      required: true,
    },
    connected: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    ...STATUS,
  }),
};
</script>
