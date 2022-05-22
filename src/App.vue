<template>
  <div id="app">
    <header class="py-3 lg:py-7 px-2 h10v">
      <h1
        class="font-bold text-pink-800 md:text-xl lg:text-4xl mb-6 text-center"
      >
        Help saving a little pony
      </h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "../node_modules/modern-normalize/modern-normalize.css";

#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: $lightest;
  display: flex;
  flex-direction: column;
  color: $font-color;
}
</style>


