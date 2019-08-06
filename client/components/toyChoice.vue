<template>
  <v-card
    class="pb-5 fill-height"
    hover
    :disabled="!selected && !affordable"
    @click="$emit('tapped', toy);"
  >
    <v-fade-transition>
      <v-overlay
        v-if="selected"
        absolute
        color="teal"
      >
        <v-icon
          size="128"
          color="success lighten-3"
        >
          mdi-check-bold
        </v-icon>
      </v-overlay>
    </v-fade-transition>
    <v-card-title class="font-weight-light">
      {{ toy.name }}
    </v-card-title>
    <v-card-text>
      <v-icon color="yellow darken-3">
        mdi-coin
      </v-icon> {{ toy.points }} puntos<br>
      <span class="black--text">{{ toy.note }}</span>
    </v-card-text>
    <v-layout>
      <v-img
        :src="toy.img"
        aspect-ratio="1.8"
        contain
      />
      <v-img
        v-if="toy.img2"
        :src="toy.img2"
        :aspect-ratio="toy.imgRatio || 1.5"
        contain
      />
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    toy: {
      type: Object,
      required: true,
    },
    affordable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
