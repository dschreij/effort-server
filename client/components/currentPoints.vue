<template>
  <v-card
    outlined
    class="fill-height"
  >
    <v-card-title>Collected points</v-card-title>
    <v-list>
      <div
        v-for="(value, label) in data"
        :key="label"
      >
        <v-divider v-if="label=='tournament'" />
        <v-list-item>
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
      </div>
    </v-list>
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
};
</script>
