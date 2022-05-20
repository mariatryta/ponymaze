<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      ponyNames: [],
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/modern-normalize/modern-normalize.css";

#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 50px;
  min-height: 100vh;
  background: $lightest;
  display: flex;
  flex-direction: column;
  color: $font-color;
}
</style>


