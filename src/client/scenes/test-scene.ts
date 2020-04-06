import { Scene, HemisphereLight, PerspectiveCamera } from "three";
import { GLTFLoader } from "../loaders/GLTFLoader";
import { blockout } from "../assets";
import { RenderCallback } from "client/types";
import { fpCamera } from "client/entities/fp-camera";

export function testScene() {
    const loader = new GLTFLoader();
    const scene = new Scene();
    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const light = new HemisphereLight(0xffffff, 0x444444);

    const cameraMovement = fpCamera(camera);

    loader.parse(blockout, "", gltf => {
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse(obj => {
            if (obj.name === "Spawn") {
                camera.position.set(
                    obj.position.x,
                    obj.position.y + 4,
                    obj.position.z
                );
            }
            if (obj.name === "Light") {
                light.position.set(
                    obj.position.x,
                    obj.position.y,
                    obj.position.z
                );
            }
        });
        scene.add(gltf.scene);
    });

    scene.add(light);

    return {
        update(render: RenderCallback) {
            cameraMovement();
            render(scene, camera);
        },
        getActiveCamera() {
            return camera;
        },
    };
}
