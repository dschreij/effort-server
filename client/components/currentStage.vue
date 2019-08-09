<template>
  <v-card
    outlined
    class="fill-height pb-4"
  >
    <v-card-title class="font-weight-light">
      Current status
    </v-card-title>
    <v-card-title v-if="finished">
      <span class="success--text">Finished</span>
    </v-card-title>
    <template
      v-for="(value, label) in status"
      v-else
    >
      <v-layout
        v-if="value"
        :key="label"
        wrap
        px-4
      >
        <v-flex
          xs6
          lg5
          font-weight-medium
          py-1
        >
          {{ label }}
        </v-flex>
        <v-flex
          xs6
          lg7
          py-1
          grey--text
          text--darken-1
        >
          {{ value }}
        </v-flex>
      </v-layout>
    </template>
  </v-card>
</template>

<script>
import pick from 'lodash/pick';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    status() {
      return pick(this.data, ['phase', 'task', 'mode', 'round']);
    },
  },
};
</script>
