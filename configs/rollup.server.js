import { commonPlugins } from "./rollup.common";

export default {
  input: "src/server/server.ts",
  output: {
    file: "build/server.js",
    format: "esm",
    name: "WoWBasic",
  },
  plugins: commonPlugins.concat([]),
};