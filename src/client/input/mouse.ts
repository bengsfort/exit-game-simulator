// DEBUG
const DEBUG = true;
const debugCursor: HTMLDivElement = document.createElement("div");
debugCursor.id = "cursor";

// Constants
// Amount of time to wait before resetting input delta, in ms
const UPDATE_THRESHOLD = 5;

// State
let lastMoveTick = 0;
let mouseCapturer: HTMLCanvasElement;
let initialX = 0,
    initialY = 0;
let x = 100,
    y = 100;
let deltaX = 0,
    deltaY = 0;

function handleMouseMoved(ev: MouseEvent) {
    lastMoveTick = ev.timeStamp;
    deltaX = ev.movementX;
    deltaY = ev.movementY;
    x += deltaX;
    y += deltaY;

    // if (x > mouseCapturer.clientWidth) {
    //     x = 0;
    // } else if (x < 0) {
    //     x = mouseCapturer.clientWidth;
    // }
    // if (y > mouseCapturer.clientHeight) {
    //     y = 0;
    // } else if (y < 0) {
    //     y = mouseCapturer.clientHeight;
    // }

    if (DEBUG) {
        debugCursor.style.left = `${x}px`;
        debugCursor.style.top = `${y}px`;
    }
}

export function setMouseCaptureEl(el: HTMLCanvasElement) {
    mouseCapturer = el;

    // Subscribe for events
    mouseCapturer.addEventListener("click", (ev: MouseEvent) => {
        if (document.pointerLockElement === mouseCapturer) return;

        console.log("Requesting pointer lock...");
        mouseCapturer.requestPointerLock();
        initialX = ev.clientX;
        initialY = ev.clientY;
        x = ev.clientX;
        y = ev.clientY;

        if (DEBUG) {
            debugCursor.style.left = `${x}px`;
            debugCursor.style.top = `${y}px`;
        }
    });

    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement === mouseCapturer) {
            console.log("Pointer locked.");
            if (DEBUG) document.body.prepend(debugCursor);
            window.addEventListener("mousemove", handleMouseMoved);
        } else {
            console.log("Pointer unlocked.");
            if (DEBUG) document.body.removeChild(debugCursor);
            window.removeEventListener("mousemove", handleMouseMoved);
        }
    });
}

export function mouseInputTick() {
    if (performance.now() - lastMoveTick > UPDATE_THRESHOLD) {
        deltaX = 0;
        deltaY = 0;
    }
}

export function getInitialMousePosition() {
    return { initialX, initialY };
}

export function getMousePosition() {
    return { x, y };
}

export function getMouseDelta() {
    return { deltaX, deltaY };
}
