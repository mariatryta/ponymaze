<template>
  <main class="md:flex flex-col h-3/4 flex-1 mb-10">
    <div class="md:flex flex-1 items-center">
      <div class="md:w-6/12">
        <img
          class="md:my-0 my-5 mx-auto bg-center"
          src="@/assets/ponies.png"
          alt=""
        />
      </div>

      <div v-if="state === 0" id="select-pony" class="md:w-6/12 mx-10">
        <SelectPony
          class="my-5 mx-auto"
          @nextState="state = state + 1"
        ></SelectPony>
      </div>

      <div
        v-if="state === 1"
        id="select-maze"
        class="md:w-6/12 flex justify-center mx-10 items-center flex-col"
      >
        <button @click="state = 0" class="text-m text-gray-500">Go back</button>
        <SelectMaze></SelectMaze>
      </div>
    </div>
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

