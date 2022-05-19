<template>
  <div class="maze__wrapper">
    <div class="maze__grid" :style="getGridStyle">
      <div
        v-for="(cell, index) in data.data"
        :key="index"
        :id="`cell-${index}`"
        :class="['grid__cell', setWalls(cell)]"
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
    };
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
    setWalls(cellData) {
      const walls = [];

      cellData.forEach((wall) => {
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

      return walls;
    },
  },
  mounted() {
    this.elements = {
      pony: this.$refs.pony,
      domokun: this.$refs.domokun,
      "end-point": this.$refs.end,
    };

    Object.keys(this.elements).forEach((key) => {
      // [15,25] x, y
      // number 65

      const row = this.data[key] / this.data.size[0]; // 65/15
      const leftover = row - Math.floor(row); // 0.333333333333
      const col = leftover * this.data.size[0]; // 0.3333333333 * 15
      console.log(row, col); // 4.3333333, 4.999999999
      console.log(Math.floor(row), Math.ceil(col)); // 5 5

      this.elements[key].style.gridColumn = Math.round(col) + 1;
      this.elements[key].style.gridRow = Math.floor(row) + 1;
    });
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
