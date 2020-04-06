import { Scene, Camera, Vector3, Quaternion } from "three";

export type RenderCallback = (scene: Scene, camera: Camera) => void;

export interface RealtimeUser {
    id: string;
    name: string;
    position: Vector3;
    quaternion: Quaternion;
}
