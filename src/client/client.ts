import { WebGLRenderer } from "three";
import { testScene } from "./scenes";
import { setMouseCaptureEl, inputTick } from "./input";

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
setMouseCaptureEl(renderer.domElement);

function animate() {
    window.requestAnimationFrame(animate);
    inputTick();
    scene.update(renderTick);
}
animate();
