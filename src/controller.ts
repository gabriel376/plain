import { AbstractController, IData } from "./types.ts";

export default class Controller extends AbstractController {
  async run(): Promise<IData> {
    if (this.actions.length === 0) {
      return this.context.read();
    }

    for (const [index, action] of this.actions.entries()) {
      if (this.context.contains(action.args())) {
        this.actions.splice(index, 1);
        this.context.apply(await action.run(this.context.read()));
        return this.run();
      }
    }

    throw new Error("Controller could not find a valid action to run");
  }
}
