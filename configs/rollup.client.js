import { commonPlugins } from "./rollup.common";
import gltf from "rollup-plugin-gltf";

export default {
  input: "src/client/client.ts",
  output: {
    file: "build/public/client/bundle.js",
    format: "iife",
    sourcemap: true,
    name: "ExitGame",
  },
  plugins: [
    gltf({
      inline: true,
      include: ["**/*.gltf"],
    }),
    ...commonPlugins,
  ],
};
