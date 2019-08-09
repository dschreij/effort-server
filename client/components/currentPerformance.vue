<template>
  <v-card
    outlined
    class="fill-height"
  >
    <v-card-title class="font-weight-light">
      Current performance
    </v-card-title>
    <v-card-text>
      <v-layout wrap>
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

          <v-card
            flat
            color="transparent"
          >
            <v-card-text v-if="scores.last_avg_rt">
              <v-layout
                align-center
                justify-center
              >
                <v-icon
                  color="indigo"
                  size="30"
                  class="mr-2"
                >
                  mdi-timer
                </v-icon>

                <span
                  class="subtitle-1 font-weight-black"
                  v-text="Math.floor(scores.last_avg_rt)"
                />
                <strong>ms</strong>
              </v-layout>
            </v-card-text>

            <v-sheet
              v-if="isArray(scores.avg_rt) && scores.avg_rt.length >= 2"
              color="transparent"
            >
              <v-sparkline
                :smooth="16"
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                :line-width="3"
                :value="scores.avg_rt"
                auto-draw
                stroke-linecap="round"
              />
            </v-sheet>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import pick from 'lodash/pick';
import isArray from 'lodash/isArray';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    scores () {
      return pick(this.data, ['acc', 'avg_rt', 'last_avg_rt']);
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
  methods: {
    isArray,
  },

};
</script>
