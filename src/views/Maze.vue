<template>
  <main class="h-90v">
    <div
      class="mx-10 flex items-center justify-center lg:flex-row flex-col h-full"
    >
      <Legend class="lg:w-2/12 lg:mr-8 w-full mb-10 md:flex-1"></Legend>
      <MazeGrid
        class="flex-1 md:flex-none max-w-full w-full lg:w-9/12 md:h-full flex flex-col md:items-center mb-10 md:mb-0 justify-center"
        @refreshData="refreshData"
        :data="mazeData"
      >
      </MazeGrid>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import MazeGrid from "../components/MazeGrid.vue";
import fetchData from "../helpers/fetchData.js";
import Legend from "../components/Legend.vue";

export default {
  components: {
    MazeGrid,
    Legend,
  },
  computed: mapState({
    mazeData: (state) => state.maze.data,
  }),
  methods: {
    refreshData() {
      fetchData(
        `${process.env.VUE_APP_TRUSTPILOT_API}/maze/${this.mazeData.maze_id}`
      ).then((res) => {
        this.$store.commit("maze/setData", res);
      });
    },
  },
  mounted() {
    if (!this.mazeData) {
      this.$router.push("/");
    }
  },
};
</script>


