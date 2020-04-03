export enum Controls {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

const keysMap: { [key: string]: boolean } = {
  w: false,
  a: false,
  s: false,
  d: false,
};

// keyboard event handling
window.onkeydown = ({ key }: KeyboardEvent) => {
  if (keysMap.hasOwnProperty(key)) {
    keysMap[key] = true;
  }
};

window.onkeyup = ({ key }: KeyboardEvent) => {
  if (keysMap.hasOwnProperty(key)) {
    keysMap[key] = false;
  }
};

export function keyDown(key: Controls) {
  return keysMap[key];
}
