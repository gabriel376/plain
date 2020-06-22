import * as Colors from "https://deno.land/std@0.58.0/fmt/colors.ts";
import { AbstractFormatter, IData, Model } from "./types.ts";
import Template from "./template.ts";

export default class Formatter extends AbstractFormatter {
  constructor(data: IData, model: Model) {
    super(data, model);
    this.data = JSON.parse(JSON.stringify(this.data));
  }

  format(
    model: Model = this.model,
    data: IData = this.data,
    text = "",
  ): string {
    for (const [key, val] of Object.entries(model.body)) {
      if (val instanceof Model) {
        const model = val as Model;
        data[key] = this.format(model, data[key]);
      }
    }

    if (data instanceof Array) {
      for (const [index, element] of data.entries()) {
        text += new Template(model.template).build(
          Object.assign({ ...Colors, index: index }, element),
        );
      }
    } else {
      text += new Template(model.template).build(
        Object.assign({ ...Colors }, data),
      );
    }

    return text;
  }
}
