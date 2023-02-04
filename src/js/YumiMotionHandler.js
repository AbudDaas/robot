import { Object3D } from "three";
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import yumi_path from "../assets/dae/yumi.dae";
import { TWEEN } from "@tweenjs/tween.js";

/****************************************************
 * // Usage Example
 * var position = { x: 100, y: 0 };
 * // Create a tween for position first
 * var tween = new TWEEN.Tween(position);
 * // Then tell the tween we want to 
 * // animate the x property over 1000 milliseconds
 * tween.to({ x: 200 }, 1000);
 ****************************************************/

export class YuMiMotion {
    /**
     * 
     * @param {*} scene 
     * @param {*} joint_vlaues 
     */
    constructor(scene, joint_vlaues) {
    this.scene = scene;
    this.init_jnt_vals = joint_vlaues;
    this.loader = new ColladaLoader();
      this.yumi_model = new Object3D();
      this.loadYuMi()
  }

  loadYuMi = () => {
    const onLoad = (result, yumi, kinematics) => {
      console.log(result);
      const model = result.scene.children[0];
      yumi.add(model.clone(true));
      yumi.traverse(function (child) {
        if (child.isMesh) {
          child.material.flatShading = true;
        }
      });
      kinematics = result.kinematics;
    };

    this.loader.load(yumi_path, (collada) =>
      onLoad(collada, this.yumi_model, this.kinematics)
    ),
      undefined,
      function (error) {
        console.log("An error happened", error);
      };

    this.yumi_model.position.set(0.0, 0.0, -6.0);
    this.yumi_model.rotation.set(-Math.PI / 2, 0.0, -Math.PI/2);
    this.yumi_model.scale.set(20, 20, 20);

    this.scene.add(this.yumi_model);
  };

  moveYuMi = (arm, jnt_vals, speed) => {
    console.log(arm, jnt_vals, speed);
  };
}
