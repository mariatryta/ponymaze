<template>
  <main class="md:flex flex-col h-full flex-1">
    <div class="md:flex flex-1 items-center">
      <div class="md:w-6/12">
        <img
          class="md:mt-0 mt-20 mx-auto bg-center"
          src="@/assets/ponies.png"
          alt=""
        />
      </div>
      <div class="md:w-6/12">
        <vInput class="my-5 mx-auto" name="pony" @submit="submitValue"
          >Write a valid pony name</vInput
        >
        <p
          @click="showDefaultPonies = true"
          class="text-sm font-light text-gray-600 cursor-pointer"
        >
          Don't know any ponies ? Choose one here
        </p>
      </div>
    </div>

    <Card class="my-auto" :data="pony" v-if="pony"></Card>
    <vButton @click="startGame" v-if="pony && mazeId">I am ready</vButton>

    <!-- <LoadingOverlay /> -->
    <Modal
      v-show="showDefaultPonies"
      labeledBy="showcaseTitle"
      selectButton="Confirm Selection"
      closeButton="Cancel"
      @close="showDefaultPonies = false"
    >
      <template slot="main">
        <PonyShowcase
          class="mt-auto"
          :defaultPonies="defaultPonies"
        ></PonyShowcase>
      </template>
    </Modal>
  </main>
</template>

<script>
import vInput from "../components/Input.vue";
import Card from "../components/Card.vue";
import vButton from "../components/Button.vue";
import PonyShowcase from "../components/PonyShowcase.vue";
import Modal from "../components/Modal.vue";

import { mapState } from "vuex";

export default {
  components: {
    vInput,
    Card,
    vButton,
    PonyShowcase,
    Modal,
  },
  data() {
    return {
      showDefaultPonies: false,
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
}
</style>
