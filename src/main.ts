import "reflect-metadata";
import { expressServer } from "./api/http";

function main() {
  expressServer.start();
}

main();
