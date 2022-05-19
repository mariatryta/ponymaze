<template>
  <div class="maze">
    <MazeGrid :data="mazeData"> </MazeGrid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MazeGrid from "../components/MazeGrid.vue";

export default {
  components: {
    MazeGrid,
  },
  computed: mapState({
    mazeData: (state) => state.maze.data,
  }),
};
</script>

<style lang="scss" scoped>
.maze {
  height: 100%;
}
</style>
