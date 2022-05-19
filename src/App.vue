<template>
  <div id="app">
    <vHeader></vHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from "./components/Header.vue";

export default {
  name: "App",
  components: {
    vHeader,
  },
  data() {
    return {
      ponyNames: [],
    };
  },
  mounted() {
    // fetch("http://ponyweb.ml/v1/character/all")
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Something went wrong while fetching pony names.");
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     this.ponyNames = data.data;
    //   })
    //   .catch((error) => console.log(error));
  },
};
</script>

<style>
@import "../node_modules/modern-normalize/modern-normalize.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
