<template>
  <button class="button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  border: 2px solid pink;
  background: yellow;
}
</style>
