import node from "rollup-plugin-node-resolve";
import commonJS from "rollup-plugin-commonjs";
import image from "@rollup/plugin-image";
import typescript from "rollup-plugin-typescript2";

export const commonPlugins = [node(), commonJS(), image(), typescript()];