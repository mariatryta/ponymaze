<template>
  <div class="maze__wrapper">
    <div class="maze__grid" :style="getGridStyle">
      <div
        v-for="(cell, index) in data.data"
        :key="index"
        :id="`cell-${index}`"
        :class="['grid__cell', ...mappedCells[index]]"
      ></div>

      <div class="maze__characters" :style="getGridStyle">
        <div class="icon icon--domokun" ref="domokun">
          <img src="../assets/domokun.png" alt="" />
        </div>
        <div class="icon icon--end-point" ref="end">
          <img src="../assets/rainbow.png" alt="" />
        </div>
        <div class="icon icon--pony" ref="pony">
          <img src="../assets/pony.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      elements: {},
      mappedCells: [],
      gameStatus: "active",
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
      console.log("call make move");
      fetch(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.data.maze_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            direction,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          const state = res["state-result"].toLowerCase();
          this.gameStatus = res.state;

          if (res.state === "active" && state === "move accepted") {
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
    window.removeEventListener("keydown", () => {});
  },
};
</script>

<style lang="scss" scoped>
.maze__wrapper {
  .maze__grid {
    position: relative;
    display: grid;
    width: 75vw;
    max-width: 850px;
    border-bottom: 3px solid pink;
    border-right: 3px solid pink;
    aspect-ratio: 1/1;
    margin: 0 auto;
  }

  .maze__characters {
    display: grid;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    min-height: 0;
    min-width: 0;
  }

  .grid__cell {
    &.b-n {
      border-top: 3px solid pink;
    }
    &.b-s {
      border-bottom: 3px solid pink;
    }
    &.b-e {
      border-right: 3px solid pink;
    }
    &.b-w {
      border-left: 3px solid pink;
    }
  }

  .icon {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
