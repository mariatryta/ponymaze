<template>
  <main class="home">
    <div class="hero">
      <div class="hero__col">
        <img src="@/assets/ponies.png" alt="" />
      </div>
      <div class="hero__col">
        <vInput name="pony" @submit="submitValue"
          >Write a valid pony name</vInput
        >
      </div>
    </div>

    <Card :data="pony" v-if="pony"></Card>
    <vButton @click="startGame" v-if="pony && mazeId">I am ready</vButton>

    <!-- <LoadingOverlay /> -->
    <PonyShowcase :defaultPonies="defaultPonies"></PonyShowcase>
  </main>
</template>

<script>
import vInput from "../components/Input.vue";
import Card from "../components/Card.vue";
import vButton from "../components/Button.vue";
import PonyShowcase from "../components/PonyShowcase.vue";

import { mapState } from "vuex";

export default {
  components: {
    vInput,
    Card,
    vButton,
    PonyShowcase,
  },
  data() {
    return {
      defaultPonies: [
        { name: "Rarity", key: "rarity" },
        { name: "Princess Luna", key: "princess-luna" },
        { name: "Fluttershy", key: "fluttershy" },
        { name: "Spike", key: "spike" },
        { name: "Twilight Sparkle", key: "twillight-sparkle" },
      ],
    };
  },
  computed: mapState({
    mazeId: (state) => state.maze.id,
    pony: (state) => state.user.pony,
  }),
  methods: {
    submitValue(value) {
      if (!value || value === "") {
        return;
      }

      fetch(`http://ponyweb.ml/v1/character/${value}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong while fetching pony's name.");
        })
        .then(({ data }) => {
          if (data.length > 0) {
            this.$store.commit("user/setPony", data[0]);
            return this.initGame();
          }

          throw new Error("Couldn't find pony with this name");
        })
        .catch((error) => console.log(error));
    },

    initGame() {
      const data = {
        "maze-width": 15,
        "maze-height": 20,
        "maze-player-name": this.pony.name,
        difficulty: 1,
      };

      fetch("https://ponychallenge.trustpilot.com/pony-challenge/maze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Only ponies can play");
        })
        .then(({ maze_id }) => this.$store.commit("maze/setId", maze_id))
        .catch((error) => console.log(error));
    },
    startGame() {
      this.loading = true;

      fetch(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.mazeId}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Only ponies can play");
        })
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
.home {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .hero {
    display: flex;
    flex: 1;
    align-items: center;

    &__col {
      width: 50%;
    }
  }

  ::v-deep .input-wrapper {
    margin: 45px 0;
  }

  ::v-deep .card {
    margin: 0 auto;
  }

  ::v-deep .showcase {
    margin-top: auto;
  }
}
</style>
