<template>
  <v-card
    outlined
    class="fill-height pb-4"
  >
    <v-card-title class="font-weight-light">
      Collected points
    </v-card-title>
    <template v-for="(value, label) in data">
      <v-divider
        v-if="label=='tournament'"
        :key="label+'d'"
      />
      <v-layout
        :key="label"
        wrap
        px-4
      >
        <v-flex
          xs6
          lg5
          py-1
          grey--text
          text--darken-2
        >
          {{ label }}
          <span v-if="label !== 'tournament'"> task</span>
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
    <v-divider />
    <v-layout
      wrap
      px-4
    >
      <v-flex
        xs6
        lg5
        py-1
        font-weight-bold
      >
        total
      </v-flex>
      <v-flex
        xs6
        lg7
        py-1
        grey--text
        text--darken-1
      >
        {{ total }}
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    total() {
      return Object.values(this.data).reduce((sum, val) => sum + val, 0);
    },
  },
};
</script>
