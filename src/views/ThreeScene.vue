<template>
  <div id="container"></div>
  <SceneControls
    @rotate-cam="rotateCamera"
    @reset-cam="resetCamera"
    @zoom-cam="zoomCamera"
  />
</template>

<script lang="js">
import { Vector3 } from "three";
  import SceneCreator from "../js/SceneCreator.js";
import SceneControls from "../components/SceneControls.vue";
import CreateLego from "../js/LegoCreator.js";
  import { createBase } from "../js/ModelCreator.js";
import { YuMiMotion } from "../js/YumiMotionHandler.js";
  import { store } from "../js/store";

  export default {
    name: "ThreeScene",
    data() {
        return {
            store,
        };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.container = document.getElementById("container");
        const sceneCreator_ = new SceneCreator(this.container);
        this.scene = sceneCreator_.getScene();
        this.camera = sceneCreator_.getCamera();
        this.renderer = sceneCreator_.getRenderer();
        createBase(this.scene);
        const YuMiMotion_ = new YuMiMotion(this.scene,
            [0.0, -2.271, 2.352, 0.523, 0.0, 0.7, 0.0, 0.0, -2.267, -2.358, 0.525, 0.0, 0.7, 0.0]
        );
            let lego_pos = new Vector3(0, 0, 0);
            const lego_2x2 = new CreateLego(this.scene, 2, 'r', "rc1", lego_pos);
      },
      resetCamera() {
        this.scene.rotation.set(0, 0, 0);
        this.camera.position.set(0.1, 10, 10);
      },
      rotateCamera(rx, ry) {
        let new_rot_x;
        let new_rot_y;
        let new_rot_z;
        new_rot_x = this.scene.rotation.x + rx;
        new_rot_y = this.scene.rotation.y + ry;
        new_rot_z = this.scene.rotation.z;
        this.scene.rotation.set(new_rot_x, new_rot_y, new_rot_z);
      },
      moveCamera(dx, dz) {
        let new_pos_x = this.camera.position.x + dx;
        let new_pos_y = this.camera.position.y;
        let new_pos_z = this.camera.position.z + dz;
        this.camera.position.set(new_pos_x, new_pos_y, new_pos_z);
      },
      zoomCamera(away = false) {
        let new_pos_x;
        let new_pos_y;
        let new_pos_z;
        if (!away) {
          new_pos_x = this.camera.position.x;
          new_pos_y = this.camera.position.y + 2.5;
          new_pos_z = this.camera.position.z + 1.25;
          this.camera.position.set(new_pos_x, new_pos_y, new_pos_z);
        } else {
          new_pos_x = this.camera.position.x;
          new_pos_y = this.camera.position.y - 2.5;
          new_pos_z = this.camera.position.z - 1.25;
          this.camera.position.set(new_pos_x, new_pos_y, new_pos_z);
        }
      },
    },
    components: {
      SceneControls,
    },
  };
</script>

<style>
@import "../style/css/ThreeScene.css";
</style>
