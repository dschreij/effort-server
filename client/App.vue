<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<script>
const defaultLayout = 'default';

export default {
  computed: {
    layout () {
      return `${this.$route.meta.layout || defaultLayout}-layout`;
    },
  },
};
</script>
