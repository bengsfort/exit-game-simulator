import { Scene, Camera } from "three";

export type RenderCallback = (scene: Scene, camera: Camera) => void;
