import copy from "rollup-plugin-copy-assets";
import { commonPlugins } from "./rollup.common";

export default {
  input: "src/server/server.ts",
  output: {
    file: "build/server.js",
    format: "cjs",
    name: "ExitGame",
  },
  plugins: commonPlugins.concat([
    copy({
      assets: ["src/server/public"],
    }),
  ]),
};
