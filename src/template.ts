import { AbstractTemplate, IData } from "./types.ts";

export default class Template extends AbstractTemplate {
  build(data: IData): string {
    data = Object.keys(data).reduce(
      (obj, key) =>
        /^[a-zA-Z]+$/.test(key) ? { ...obj, [key]: data[key] } : obj,
      {},
    );
    return new Function(...Object.keys(data), `return \`${this.template}\`;`)(
      ...Object.values(data),
    );
  }
}
