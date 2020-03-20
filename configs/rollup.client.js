import { commonPlugins } from "./rollup.common";

export default {
  input: "src/client/client.ts",
  output: {
    file: "build/client/bundle.js",
    format: "iife",
    name: "WowBasic",
  },
  plugins: commonPlugins.concat([]),
};