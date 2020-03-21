import node from "rollup-plugin-node-resolve";
import commonJS from "rollup-plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";

export const commonPlugins = [
  node({ preferBuiltins: true }),
  commonJS(),
  image(),
  json(),
  typescript(),
];
