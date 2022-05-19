<template>
  <button
    class="w-full mt-5 inline-block px-12 py-3 text-sm font-medium text-pink-600 border-2 border-pink-600 rounded hover:bg-pink-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-200 ease-in"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
