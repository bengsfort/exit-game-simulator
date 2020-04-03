import { PerspectiveCamera, Vector3, MathUtils } from "three";
import {
    getMousePosition,
    getInitialMousePosition,
    keyDown,
    Controls,
} from "client/input";

const DEFAULT_DELTA = 1 / 60;
const DEFAULT_WALKING_SPEED = 5;
const DEFAULT_MOUSE_SPEED = 0.1;

enum Directions {
    Forward = 0,
    Backward = 1,
    Left = 2,
    Right = 3,
}
const MOVEMENT_DIRECTIONS = [
    new Vector3(0, 0, -1),
    new Vector3(0, 0, 1),
    new Vector3(-1, 0, 0),
    new Vector3(1, 0, 0),
];

export function fpCamera(camera: PerspectiveCamera) {
    const target = new Vector3(0, 0, 0);
    const movementDirection = new Vector3(0, 0, 0);

    let deltaX = 0;
    let deltaY = 0;

    function updateRotation() {
        const { initialX, initialY } = getInitialMousePosition();
        const { x, y } = getMousePosition();

        // Update rotation of camera
        deltaX = x - initialX;
        deltaY = y - initialY;
        target.set(
            Math.sin(MathUtils.degToRad(deltaY * DEFAULT_MOUSE_SPEED + 90)) *
                Math.cos(MathUtils.degToRad(deltaX * DEFAULT_MOUSE_SPEED - 90)),
            Math.cos(MathUtils.degToRad(deltaY * DEFAULT_MOUSE_SPEED + 90)),
            Math.sin(MathUtils.degToRad(deltaY * DEFAULT_MOUSE_SPEED + 90)) *
                Math.sin(MathUtils.degToRad(deltaX * DEFAULT_MOUSE_SPEED - 90))
        );
        target.add(camera.position);
        camera.lookAt(target);
    }

    function updatePosition() {
        if (keyDown(Controls.W)) {
            movementDirection.add(MOVEMENT_DIRECTIONS[Directions.Forward]);
        } else if (keyDown(Controls.S)) {
            movementDirection.add(MOVEMENT_DIRECTIONS[Directions.Backward]);
        }
        if (keyDown(Controls.A)) {
            movementDirection.add(MOVEMENT_DIRECTIONS[Directions.Left]);
        } else if (keyDown(Controls.D)) {
            movementDirection.add(MOVEMENT_DIRECTIONS[Directions.Right]);
        }

        const movementSpeed = DEFAULT_DELTA * DEFAULT_WALKING_SPEED;
        camera.translateX(movementDirection.x * movementSpeed);
        camera.translateZ(movementDirection.z * movementSpeed);
        movementDirection.set(0, 0, 0);
    }

    return () => {
        updatePosition();
        updateRotation();
    };
}
