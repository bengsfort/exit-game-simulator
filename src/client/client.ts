import { WebGLRenderer } from "three";
import { testScene } from "./scenes";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const renderTick = renderer.render.bind(renderer);
const scene = testScene();

// Setup global event handling
window.addEventListener("resize", () => {
  const camera = scene.getActiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Pointer lock handling
renderer.domElement.addEventListener("click", () => {
  console.log("Requesting pointer lock...");
  renderer.domElement.requestPointerLock();
});
document.addEventListener("pointerlockchange", () => {
  if (document.pointerLockElement === renderer.domElement) {
    console.log("Pointer locked.");
  } else {
    console.log("Pointer unlocked.");
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  scene.update(renderTick);
}
animate();
