<template>
    <ThreeScene />
</template>
  
  <script>
  import { store } from "./js/store.js";
  import ThreeScene from "./views/ThreeScene.vue";
  
  export default {
    name: "App",
    data() {
      return {
        store,
      };
    },
    components: {
      ThreeScene,
  },
  };
  </script>
  
  <style>
  @import "./style/css/App.css";
  </style>
  