<template>
  <div>
    <div
      id="showcaseTitle"
      class="text-xl font-bold text-center block text-pink-600 mb-6"
    >
      Select a pony needing a rescue
    </div>
    <div
      class="flex items-center focus:outline-none focus:ring-pink-300 focus:ring-2 cursor-pointer"
      v-for="pony in defaultPonies"
      :key="pony.name"
      tabindex="1"
      @click="selectPony"
      @keydown.enter="selectPony"
    >
      <div class="relative h-20 w-20 m-2 flex items-center">
        <div class="absolute bg-pink-500 rounded-full h-16 w-16 z-0"></div>
        <img
          class="relative z-1 bg-contain h-full w-full"
          :src="require(`@/assets/ponies/${pony.key}.png`)"
          alt=""
        />
      </div>
      <div class="ml-5">{{ pony.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultPonies: {
      type: Array,
      require: true,
    },
  },
};
</script>

