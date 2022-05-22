<template>
  <div>
    <div
      class="relative grid w-full md:w-auto max-h-83 md:h-full mx-auto md:mb-0 mb-10"
      :style="getGridStyle"
    >
      <div
        v-for="(cell, index) in data.data"
        :key="index"
        :id="`cell-${index}`"
        :class="['grid-cell', ...mappedCells[index]]"
      ></div>

      <div
        class="grid absolute t-0 l-0 h-full w-full min-h-0 min-w-0 border-4 border-pink-400"
        :style="getGridStyle"
      >
        <div class="w-full h-full" ref="domokun">
          <img
            class="w-full h-full object-contain"
            src="../assets/domokun.png"
            alt=""
          />
        </div>
        <div class="w-full h-full" ref="end">
          <img
            class="w-full h-full object-contain"
            src="../assets/rainbow.png"
            alt=""
          />
        </div>
        <div class="w-full h-full" ref="pony">
          <img
            class="w-full h-full object-contain"
            src="../assets/pony.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <Modal
      v-if="showEndModal"
      closeButton="Try again"
      @close="endGame"
      :isActive="showEndModal"
    >
      <template slot="main">
        <p
          class="text-lg font-semibold tracking-widest text-pink-500 uppercase mb-5"
        >
          {{ gameStatus["state-result"] }}
        </p>
        <img
          v-if="gameStatus['hidden-url']"
          :src="`https://ponychallenge.trustpilot.com${gameStatus['hidden-url']}`"
          alt=""
        />
      </template>
    </Modal>

    <KeyboardNav class="md:hidden mx-auto" @makeMove="makeMove"></KeyboardNav>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import fetchData from "../helpers/fetchData.js";
import KeyboardNav from "../components/KeyboardNav.vue";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    Modal,
    KeyboardNav,
  },
  data() {
    return {
      elements: {},
      mappedCells: [],
      gameStatus: { state: "active" },
    };
  },
  watch: {
    data() {
      this.calculatePosition(this.data, this.elements);
    },
  },
  computed: {
    getGridStyle() {
      return {
        "grid-template-columns": `repeat(${this.data.size[0]}, 1fr)`,
        "grid-template-rows": `repeat(${this.data.size[1]}, 1fr)`,
        "aspect-ratio": `${this.data.size[0]} / ${this.data.size[1]}`,
      };
    },
    showEndModal() {
      return this.gameStatus.state.toLowerCase() !== "active";
    },
  },
  methods: {
    setupWalls() {
      this.mappedCells = this.data.data.map((cell, i) => {
        return [
          ...this.getCellWalls(
            cell,
            this.data.data[i + 1],
            this.data.data[i + this.data.size[0]]
          ),
        ];
      });
    },
    makeMove(direction) {
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        direction,
      });

      fetchData(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.data.maze_id}`,
        "POST",
        headers,
        body
      ).then((res) => {
        const state = res["state-result"].toLowerCase();
        this.gameStatus = { ...res };

        if (state !== "over") {
          this.$emit("refreshData");
        }
      });
    },

    listenToKeydown(e) {
      const key = e.keyCode.toString();
      const keyMap = {
        38: "north",
        37: "west",
        39: "east",
        40: "south",
      };

      if (!Object.keys(keyMap).includes(key)) {
        return;
      }

      this.makeMove(keyMap[key]);
    },
    getCellWalls(currentCell, nextCell, bottomCell) {
      const walls = [];

      currentCell.forEach((wall) => {
        switch (wall) {
          case "north":
            walls.push("b-n");
            break;
          case "west":
            walls.push("b-w");
            break;
          default:
            break;
        }
      });

      nextCell && nextCell.includes("west") && walls.push("b-e");
      bottomCell && bottomCell.includes("north") && walls.push("b-s");

      return walls;
    },
    calculatePosition(data, elements) {
      Object.keys(elements).forEach((key) => {
        const row = data[key] / data.size[0];
        const leftover = row - Math.floor(row);
        const col = leftover * data.size[0];

        this.elements[key].style.gridColumn = Math.round(col) + 1;
        this.elements[key].style.gridRow = Math.floor(row) + 1;
      });
    },
    endGame() {
      this.$store.dispatch("resetGame");
      this.$router.push("/");
    },
  },
  mounted() {
    this.elements = {
      pony: this.$refs.pony,
      domokun: this.$refs.domokun,
      "end-point": this.$refs.end,
    };

    this.calculatePosition(this.data, this.elements);
    this.setupWalls();
    window.addEventListener("keydown", this.listenToKeydown);
  },
  beforeDestroy() {
    this.mappedCells = [];

    window.removeEventListener("keydown", () => {});
  },
};
</script>

<style lang="scss" scoped>
.grid-cell {
  &.b-n {
    border-top: 3px solid rgb(244, 114, 182);
  }
  &.b-s {
    border-bottom: 3px solid rgb(244, 114, 182);
  }
  &.b-e {
    border-right: 3px solid rgb(244, 114, 182);
  }
  &.b-w {
    border-left: 3px solid rgb(244, 114, 182);
  }
}
</style>
