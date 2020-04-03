// w a s d
// mouse move

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
