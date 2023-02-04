import {
    Mesh,
    Vector3,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* BasePlate Dimensions 6.4 x ?? x 6.4 */
import base_plate_path from "../assets/glb/BasePlate_16x16.glb";
/* Lego Dimensions: (0.8 x 0.48 x 0.8) */

class ModelCreator {
    /**********************************************
     * 
     * @param {*} model_path 
     * @param {*} model_containers 
     * @param {*} model_positions 
     * @param {*} model_rotation 
     * @param {*} model_color 
     * @param {*} model_names 
     * @param {*} scene 
     **********************************************/
    constructor(model_path, model_containers,
        model_positions, model_rotation, model_color, model_names, scene) {
        this.model_path = model_path;
        this.model_containers = model_containers;
        this.model_positions = model_positions;
        this.model_rotation = model_rotation;
        this.model_color = model_color;
        this.model_names = model_names;
        this.scene = scene;
        this.loader = new GLTFLoader();
    }

    create = () => {
        this.loadModel();
        this.duplicateModel();
    }

    loadModel = () => {
        const onLoad = (result, model_containers) => {
            const model = result.scene.children[0];
            for (let i = 0; i < model_containers.length; i++) {

                model_containers[i].geometry = model.geometry.clone();
                model_containers[i].material = model.material.clone();
                model_containers[i].scale.set(0.05, 0.05, 0.05);
                model_containers[i].material.color.set(this.model_color)
            }
        };
        this.loader.load(
            this.model_path,
            gltf => onLoad(gltf, this.model_containers),
        ), undefined, function (error) {
            console.log('An error happened');
        };
    }

    duplicateModel = () => {
        for (let i = 0; i < this.model_containers.length; i++) {

            this.model_containers[i].translateX(this.model_positions[i].x);
            this.model_containers[i].translateY(this.model_positions[i].y);
            this.model_containers[i].translateZ(this.model_positions[i].z);

            if (this.model_rotation) {
                this.model_containers[i].rotateY(Math.PI / 2);
            }

            /* Supplementary Information */
            this.model_containers[i].userData.color = this.model_color;
            this.model_containers[i].name = this.model_names[i];
            this.scene.add(this.model_containers[i]);
        }
    }
}
/************************************************
 * 
 * @param {*} scene 
 ***********************************************/
export function createBase(scene) {
    /* 16x16 ==> 48x24 */
    let bases = [];
    let bases_pos = [];
    let bases_names = [];

    for (let i = 0; i < 6; i++) {
        bases.push(new Mesh());
        bases_names.push("base_" + i);
    }

    const base_pos_0 = new Vector3(0.0, 0.0, 0.0);
    const base_pos_1 = new Vector3(-6.4, 0.0, 0.0);
    const base_pos_2 = new Vector3(6.4, 0.0, 0.0);
    const base_pos_3 = new Vector3(-6.4, 0.0, 3.2);
    const base_pos_4 = new Vector3(0.0, 0.0, 3.2);
    const base_pos_5 = new Vector3(6.4, 0.0, 3.2);

    bases_pos.push(base_pos_0);
    bases_pos.push(base_pos_1);
    bases_pos.push(base_pos_2);
    bases_pos.push(base_pos_3);
    bases_pos.push(base_pos_4);
    bases_pos.push(base_pos_5);

    const baseCreator_ = new ModelCreator(base_plate_path, bases, bases_pos,
        false, 0x004904, bases_names, scene);

    baseCreator_.create()
}
