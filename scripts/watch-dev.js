const loadConfigFile = require("rollup/dist/loadConfigFile");
const rollup = require("rollup");

const fs = require("fs");
const fsPromises = fs.promises;

const path = require("path");
const child = require("child_process");

const NOOP = () => {};

const CLIENT_CONFIG = path.resolve(__dirname, "../configs/rollup.client.js");
const SERVER_CONFIG = path.resolve(__dirname, "../configs/rollup.server.js");
const BUILT_SERVER_PATH = path.resolve(__dirname, "../build/server.js");

console.log("Loading server config file at:", SERVER_CONFIG);
console.log("Loading client config file at:", CLIENT_CONFIG);

const timerPrmise = interval =>
  new Promise(resolve => {
    setTimeout(() => resolve(), interval);
  });

async function waitForBundle(dir, retries = 10, interval = 150) {
  let currentTry = 0;
  let result = false;

  while (currentTry < retries) {
    try {
      await fsPromises.access(dir, fs.constants.R_OK);
      result = true;
      currentTry = retries + 1;
    } catch {
      currentTry += 1;
      console.log(
        `Server bundle doesn't exist yet, retrying... (try ${currentTry}/${retries})`
      );
      await timerPromise(interval);
    }
  }

  return result;
}

async function waitForProcessClosed(
  childProcess,
  retries = 10,
  interval = 150
) {
  let currentTry = 0;

  while (!childProcess.killed) {
    await timerPrmise(interval);
    currentTry += 1;
    console.log(
      `Process not killed yet. Retrying... (try ${currentTry}/${retries})`
    );
    if (currentTry < retries) process.kill(0);
  }
}

function clientWatcher(config) {
  const watch = rollup.watch(config);

  watch.on("restart", () => console.log("Client watcher restarted."));
  watch.on("change", id =>
    console.log("Client watcher detected a change:", id)
  );
  watch.on("event", event => {
    if (event.code === "START") {
      console.log("\nClient watcher started.\n");
    } else if (event.code === "END") {
      console.log("Client bundle built.\n-----------------------\n");
    } else if (event.code === "ERROR") {
      console.log("Client bundle errored:\n", event.error);
    }
  });

  return () => watch.close();
}

function serverWatcher(config, clientConfig) {
  const watch = rollup.watch(config);
  let srvProcess = null;
  let closeClient = NOOP;

  watch.on("restart", () => console.log("Server watcher restarted."));
  watch.on("change", id => {
    console.log("Server watcher detected a change:", id);
    if (srvProcess) srvProcess.kill("SIGINT");
  });
  watch.on("event", async event => {
    if (event.code === "START") {
      console.log("\nStarting server watcher.\n");
    } else if (event.code === "END") {
      console.log("Server bundle built. Restarting server...");

      // Close shit
      if (srvProcess) await waitForProcessClosed(srvProcess);
      if (closeClient) closeClient();

      // Wait for bundle
      const exists = await waitForBundle(BUILT_SERVER_PATH, 10, 1000);
      if (!exists) {
        console.log(
          "\nServer bundle is taking too long to build. Retrying once more.\n"
        );
        if (!(await waitForBundle(BUILT_SERVER_PATH, 20, 1000))) {
          process.exit(0);
        }
      }
      console.log("\nServer bundle written. Starting server.");

      // Restart shit
      srvProcess = child.fork(BUILT_SERVER_PATH, [], {
        cwd: path.dirname(BUILT_SERVER_PATH),
      });
      closeClient = clientWatcher(clientConfig);
    } else if (event.code === "ERROR") {
      console.log("Server bundle errored:\n", event.error);
    }
  });

  return () => watch.close();
}

async function main() {
  const server = await loadConfigFile(SERVER_CONFIG);
  const client = await loadConfigFile(CLIENT_CONFIG);

  console.log(`
        Server warnings: ${server.warnings.count}.
        Client warnings: ${client.warnings.count}.
        Flushing warnings.
    `);
  server.warnings.flush();
  client.warnings.flush();

  serverWatcher(server.options, client.options);
}

main();
