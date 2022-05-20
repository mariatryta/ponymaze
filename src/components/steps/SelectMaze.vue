<template>
  <Card class="w-6/12" :image="pony.image[0]" :title="`You chose ${pony.name}`">
    <MazeConfig></MazeConfig>
  </Card>
</template>

<script>
import Card from "../Card.vue";
import MazeConfig from "../MazeConfig.vue";

import { mapState } from "vuex";

export default {
  components: {
    Card,
    MazeConfig,
  },

  computed: mapState({
    pony: (state) => state.user.pony,
  }),
};
</script>

<style lang="scss" scoped>
</style>
