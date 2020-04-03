import { Scene, AmbientLight, PerspectiveCamera } from "three";
import { GLTFLoader } from "../loaders/GLTFLoader";
import { blockout } from "../assets";
import { RenderCallback } from "client/types";
import { keyDown, Controls } from "../input";

export function testScene() {
  const loader = new GLTFLoader();
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  loader.parse(blockout, "", gltf => {
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
  });

  camera.position.set(-11, 24, 2);
  camera.lookAt(0, 0, 0);

  const light = new AmbientLight(0x404040);
  scene.add(light);

  return {
    update(render: RenderCallback) {
      if (keyDown(Controls.W)) {
        console.log("W IS DOWN");
      }
      render(scene, camera);
    },
    getActiveCamera() {
      return camera;
    },
  };
}
