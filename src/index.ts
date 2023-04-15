import type { ConfigType } from "../config";
import createDepContainer from "./lib/dependency/index";

// Introduce dependency injection
const container = createDepContainer();
const config = container.resolve("config");
const createLogger = container.resolve('createLogger');

console.log("hello here we go")

const startServer = async (config: ConfigType) => {
    const log = createLogger("main");

    log(`Starting thinktank server`);
}

startServer(config).catch(console.error);