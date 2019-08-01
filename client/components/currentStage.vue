<template>
  <v-card
    outlined
    class="fill-height"
  >
    <v-card-title>Current status</v-card-title>
    <v-list>
      <template
        v-for="(value, label) in status"
      >
        <v-list-item
          v-if="value"
          :key="label"
        >
          <v-list-item-title
            class="font-weight-bold"
            style="min-width: 50%"
          >
            {{ label }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ value }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-list>
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
  },
  computed: {
    status() {
      return pick(this.data, ['phase', 'task', 'mode', 'round']);
    },
  },
};
</script>
