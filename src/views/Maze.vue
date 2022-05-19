<template>
  <div class="maze">
    <MazeGrid @refreshData="refreshData" :data="mazeData"> </MazeGrid>
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
  methods: {
    refreshData() {
      fetch(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.mazeData.maze_id}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Woops");
        })
        .then((res) => {
          this.$store.commit("maze/setData", res);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.maze {
  height: 100%;
}
</style>
