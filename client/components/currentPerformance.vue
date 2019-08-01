<template>
  <v-card
    outlined
    class="fill-height"
  >
    <v-card-title>Performance</v-card-title>
    <v-card-text>
      <v-layout
        wrap
        mt-4
      >
        <v-flex
          xs12
          sm6
          text-center
        >
          <p class="subtitle-2 grey--text text--darken-1">
            Accuracy
          </p>
          <v-progress-circular
            :size="100"
            :width="15"
            :rotate="90"
            :value="scores.acc"
            :color="accColor"
          >
            {{ scores.acc }}%
          </v-progress-circular>
        </v-flex>
        <v-flex
          xs12
          sm6
          text-center
        >
          <p class="subtitle-2 grey--text text--darken-1">
            Average RT
          </p>

          <v-sheet color="transparent">
            <v-sparkline
              :smooth="16"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :line-width="3"
              :value="scores.avg_rt"
              stroke-linecap="round"
            />
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-card-text>
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
    scores () {
      return pick(this.data, ['acc', 'avg_rt']);
    },
    accColor () {
      if (this.data.acc >= 80) {
        return 'success';
      }
      if (this.data.acc >= 50 && this.data.acc < 80) {
        return 'warning';
      }
      if (this.data.acc > 0 && this.data.acc < 50) {
        return 'red';
      }
      return 'grey';
    },
  },

};
</script>
