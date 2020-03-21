import { commonPlugins } from "./rollup.common";

export default {
  input: "src/client/client.ts",
  output: {
    file: "build/public/client/bundle.js",
    format: "iife",
    name: "ExitGame",
  },
  plugins: commonPlugins.concat([]),
};
