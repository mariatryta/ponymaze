<template>
  <form class="flex justify-between flex-wrap" @submit.prevent="initGame">
    <vInput
      :value.sync="config.width"
      name="width"
      min="15"
      max="25"
      type="number"
      classNames="mb-3 w-3/12 flex-0"
      >Width:
    </vInput>
    <vInput
      name="height"
      min="15"
      max="25"
      type="number"
      :value.sync="config.height"
      classNames="mb-3 w-3/12 flex-0"
      >Height:
    </vInput>

    <vInput
      name="diffuculty"
      min="0"
      max="10"
      type="number"
      :value.sync="config.difficulty"
      classNames="mb-3 w-3/12 flex-0"
      >Diffculty</vInput
    >

    <vButton type="submit">Start </vButton>
  </form>
</template>

<script>
import vButton from "./Button.vue";
import vInput from "./Input.vue";
import { mapState } from "vuex";
import fetchData from "../helpers/fetchData.js";

export default {
  components: {
    vButton,
    vInput,
  },
  data() {
    return {
      config: {
        width: 15,
        height: 15,
        difficulty: 1,
      },
    };
  },
  computed: {
    ...mapState({
      pony: (state) => state.user.pony,
      mazeId: (state) => state.maze.id,
    }),
  },
  methods: {
    initGame() {
      const data = {
        "maze-width": parseInt(this.config.width),
        "maze-height": parseInt(this.config.height),
        "maze-player-name": this.pony.name,
        difficulty: parseInt(this.config.difficulty),
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const body = JSON.stringify(data);

      fetchData(
        `${process.env.VUE_APP_TRUSTPILOT_API}/maze`,
        "POST",
        headers,
        body
      )
        .then(({ maze_id }) => {
          this.$store.commit("maze/setId", maze_id), this.startGame();
        })
        .catch((e) => {
          console.log(e);
          alert(
            "Looks like this pony is home and safe, go back and try a new pony"
          );
        });
    },
    startGame() {
      this.loading = true;

      fetchData(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.mazeId}`,
        "GET"
      )
        .then((res) => {
          this.$store.commit("maze/setData", res);
          this.$router.push("/maze");
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
