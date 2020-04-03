import { mouseInputTick } from "./mouse";
export { Controls, keyDown } from "./keys";
export {
    setMouseCaptureEl,
    getMousePosition,
    getMouseDelta,
    getInitialMousePosition,
} from "./mouse";

export function inputTick() {
    mouseInputTick();
}
