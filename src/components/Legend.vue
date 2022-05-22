<template>
  <div class="relative bg-white rounded-lg shadow">
    <h2
      class="flex mx-auto my-2 text-center font-bold justify-center item-center"
      @click="toggleDropdown"
    >
      How to play the game
      <ArrowDown
        class="w-2 ml-2 transition ease-in-out duration-400"
        :class="{ 'transform rotate-180	': showDropdown }"
      ></ArrowDown>
    </h2>
    <ul
      class="absolute divide-y-2 divide-gray-100 text-left w-full bg-white rounded-lg shadow z-10 top-130"
      v-show="showDropdown"
    >
      <li class="flex items-center p-3">
        <Expand class="w-3 mr-2 flex-shrink-0 flex-grow-0"></Expand>
        <p>Use your arrow keys to move pony</p>
      </li>
      <li class="flex items-center p-3">
        <Over class="w-3 mr-2 flex-shrink-0 flex-grow-0"></Over>
        <p>Try to reach the rainbow before domokun catches you!</p>
      </li>
      <li class="flex items-center p-3">
        <Checkmark class="w-3 mr-2 flex-shrink-0 flex-grow-0"></Checkmark>
        <p>No stress, you can always try again</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Expand from "@/assets/icons/expand.svg";
import Over from "@/assets/icons/over.svg";
import Checkmark from "@/assets/icons/checkmark.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";

export default {
  components: {
    Checkmark,
    Over,
    Expand,
    ArrowDown,
  },
  data() {
    return {
      showDropdown: true,
    };
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },

  mounted() {
    if (window.innerWidth <= 768) {
      this.wWidth = window.innerWidth;
      this.showDropdown = false;
    }

    window.addEventListener("resize", () => {
      this.wWidth = window.innerWidth;
      if (window.innerWidth <= 768) {
        this.showDropdown = false;
      } else {
        this.showDropdown = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
