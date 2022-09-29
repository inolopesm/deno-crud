import { HelloWorldHttpController } from "./hello-world-http-controller.ts";

export class HelloWorldHttpControllerFactory {
  static make() {
    return new HelloWorldHttpController();
  }
}
