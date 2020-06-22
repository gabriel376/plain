import { AbstractApp, IData } from "./types.ts";
import Controller from "./controller.ts";
import Actions from "./actions.ts";
import Context from "./context.ts";

export default class App extends AbstractApp {
  async run(): Promise<IData> {
    return new Controller(Actions, new Context({ config: this.config }))
      .run();
  }
}
