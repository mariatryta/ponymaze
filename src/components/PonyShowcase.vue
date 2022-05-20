<template>
  <fieldset class="pony-showcase">
    <legend
      id="showcaseTitle"
      class="text-xl font-bold text-center block text-pink-600 mb-6"
    >
      Select a pony needing a rescue
    </legend>
    <div
      v-for="pony in defaultPonies"
      :key="pony.name"
      class="relative flex items-center focus:outline-none focus:ring-pink-300 focus:ring-2 cursor-pointer"
      :class="{ selected: selectedPony === pony.name }"
    >
      <input
        type="radio"
        name="ponies"
        :id="`pony-${pony.name}`"
        v-model="selectedPony"
        :value="pony.name"
        class="opacity-0 absolute"
      />

      <div class="z-10">
        <div
          aria-hidden="true"
          class="relative h-20 w-20 m-2 flex items-center"
        >
          <div class="absolute bg-pink-500 rounded-full h-16 w-16 z-0"></div>
          <img
            class="relative z-1 bg-contain h-full w-full"
            :src="require(`@/assets/ponies/${pony.key}.png`)"
            alt=""
          />
        </div>
      </div>
      <label :for="`pony-${pony.name}`" class="z-10 radio-label ml-5">{{
        pony.name
      }}</label>
    </div>

    <vButton @click="$emit('select', selectedPony)">
      {{ selectButton }}
    </vButton>
  </fieldset>
</template>

<script>
import vButton from "./Button.vue";

export default {
  props: {
    defaultPonies: {
      type: Array,
      require: true,
    },
    selectButton: {
      type: String,
      require: true,
    },
  },
  components: {
    vButton,
  },
  data() {
    return {
      selectedPony: null,
    };
  },
};
</script>


<style lang="scss" scoped>
.pony-showcase {
  .radio-label::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    z-index: 0;
  }

  .selected .radio-label {
    border-bottom: 2px solid #db2777;
  }

  .selected:focus-visible .radio-label {
    outline: 1px solid #de78a6;
  }
}
</style>
