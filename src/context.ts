import { AbstractContext, IData } from "./types.ts";

export default class Context extends AbstractContext {
  contains(data: IData): boolean {
    return Object.keys(data)
      .every((key) =>
        data[key] && data[key].constructor == Object
          ? new Context(this.data[key] || {}).contains(data[key])
          : this.data[key]
      );
  }

  apply(data: IData): void {
    Object.assign(this.data, data);
  }

  read(): IData {
    return this.data;
  }
}
