<template>
  <v-card outlined>
    <v-card-title primary-title>
      Tu seleccion
    </v-card-title>

    <v-list-item
      v-for="toy in selected"
      :key="toy.name"
    >
      <v-list-item-avatar>
        <img :src="toy.img">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="toy.name" />
        <v-list-item-subtitle>{{ toy.points }} puntos </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          small
          @click="$emit('clicked-remove', toy)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-subheader>Puntos</v-subheader>
    <v-card-text>
      <v-layout
        wrap
        body-2
        black--text
      >
        <v-flex
          xs6
          py-0
        >
          Gastable:
        </v-flex>
        <v-flex
          xs6
          py-0
        >
          {{ points.spendable }}
        </v-flex>
        <v-flex
          xs6
          py-0
        >
          Gastado:
        </v-flex>
        <v-flex
          xs6
          py-0
        >
          {{ points.allocated }}
        </v-flex>
        <v-flex
          xs6
          py-0
        >
          Restante:
        </v-flex>
        <v-flex
          xs6
          py-0
        >
          {{ points.available }}
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!selected.length"
        color="success"
        @click="$emit('clicked-proceed')"
      >
        Proceder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array,
      required: true,
    },
    points: {
      type: Object,
      required: true,
    },
  },
};
</script>
