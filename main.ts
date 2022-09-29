import { Configuration } from "./configuration.ts";
import { CreateToDoHttpControllerFactory } from "./create-todo-http-controller-factory.ts";
import { HelloWorldHttpControllerFactory } from "./hello-world-http-controller-factory.ts";
import { HttpServer } from "./http-server.ts";

const configuration = new Configuration();

const hostname = configuration.getHostname();
const port = configuration.getPort();

const httpServer = new HttpServer()

await httpServer
  .get("/hello", HelloWorldHttpControllerFactory.make())
  .post("/todos", CreateToDoHttpControllerFactory.make())
  .listen(hostname, port);
