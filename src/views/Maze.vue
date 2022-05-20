<template>
  <main class="maze">
    <MazeGrid @refreshData="refreshData" :data="mazeData"> </MazeGrid>
  </main>
</template>

<script>
import { mapState } from "vuex";
import MazeGrid from "../components/MazeGrid.vue";
import fetchData from "../helpers/fetchData.js";

export default {
  components: {
    MazeGrid,
  },
  computed: mapState({
    mazeData: (state) => state.maze.data,
  }),
  methods: {
    refreshData() {
      fetchData(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.mazeData.maze_id}`
      ).then((res) => {
        this.$store.commit("maze/setData", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.maze {
  height: 100%;
}
</style>
