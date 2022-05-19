<template>
  <div>i am maze</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    mazeId: (state) => state.maze.id,
    pony: (state) => state.user.pony,
  }),
};
</script>

<style lang="scss" scoped>
</style>
