<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1 class="font-weight-light">
        Tournament leaderboard
      </h1>
    </v-flex>
    <v-flex
      xs12
      md10
      offset-md1
      lg8
      offset-lg2
      xl6
      offset-xl3
      pt-5
    >
      <div
        v-if="!$subReady.Leaderboard"
        class="text-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <div v-else-if="leaderboard.length">
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                #
              </th>
              <th class="text-left">
                Points
              </th>
              <th class="text-left">
                Average RT (ms)
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Cabin
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ptcp, i) in leaderboard"
              :key="ptcp._id._str"
            >
              <td>{{ (i+1) }}</td>
              <td class="font-weight-bold">
                {{ ptcp.points.tournament }}
              </td>
              <td>{{ Math.floor(ptcp.current.last_avg_rt) }}</td>
              <td>{{ ptcp.first_name }} {{ ptcp.last_name1 }} {{ ptcp.last_name2 }}</td>
              <td>{{ ptcp.cabin }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <v-flex
        v-else
        text-center
      >
        <h2 class="font-weight-light primary--text">
          No scores received yet.
        </h2>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { Sessions } from '../../imports/collections/Sessions';

export default {
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Leaderboard: [],
    },
    leaderboard () {
      return Sessions.find({}, {
        sort: {
          'points.tournament': -1,
          'current.last_avg_rt': 1,
        },
      });
    },
  },
};
</script>
