import { AbstractAction, IData } from "./types.ts";

export default class Action extends AbstractAction {
  async run(data: IData): Promise<IData> {
    return this.fn(data);
  }

  args(): IData {
    return JSON.parse(
      this.fn.toString()
        .split("\n")[0]
        .split("(")[1]
        .split(")")[0]
        .split(" ")
        .map((c: string) => {
          if (!/^[a-z]/.test(c)) return c;
          if (c.endsWith(":")) return `"${c.slice(0, -1)}":`;
          if (c.endsWith(",")) return `"${c.slice(0, -1)}":null,`;
          return `"${c}":null`;
        }).join(" "),
    );
  }
}
