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

      <div class="md:w-6/12 mx-10" v-if="state === 0">
        <SelectPony
          class="my-5 mx-auto"
          @nextState="state = state + 1"
        ></SelectPony>
      </div>

      <div
        class="md:w-6/12 flex justify-center mx-10 items-center flex-col"
        v-if="state === 1 && pony"
      >
        <button @click="state = 0" class="">Go back</button>
        <SelectMaze></SelectMaze>
      </div>
    </div>

    <!-- <vButton @click="startGame" v-if="pony && mazeId">I am ready</vButton> -->

    <!-- <LoadingOverlay /> -->
  </main>
</template>

<script>
import SelectPony from "../components/steps/SelectPony.vue";
import SelectMaze from "../components/steps/SelectMaze.vue";

import { mapState } from "vuex";

export default {
  components: {
    SelectPony,
    SelectMaze,
  },
  data() {
    return {
      state: 0,
    };
  },
  computed: mapState({
    pony: (state) => state.user.pony,
  }),
};
</script>

