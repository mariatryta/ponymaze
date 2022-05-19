<template>
  <header class="header">
    <ul class="list">
      <li class="list--item">
        <router-link class="list--link" to="/">Home</router-link>
      </li>
      <li class="list--item">
        <router-link to="/about" class="list--link">Go to About</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  .list {
    display: block;

    &--item {
      display: inline-block;
      margin: 0 10px;
    }
  }
}
</style>
