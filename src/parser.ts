import Cheerio from "https://dev.jspm.io/cheerio@0.22.0";
import {
  AbstractParser,
  Model,
  Field,
  IData,
  ICheerioStatic,
  ICheerio,
} from "./types.ts";
import Template from "./template.ts";

export default class Parser extends AbstractParser {
  private $: ICheerioStatic;

  constructor(html: string, model: Model) {
    super(html, model);
    this.$ = Cheerio.load(html);
  }

  parse(
    model: Model = this.model,
    container: ICheerio = this.$.root(),
    data: IData = {},
  ): IData {
    for (const [key, val] of Object.entries(model.body)) {
      if (val instanceof Model) {
        const model = val as Model;
        container.find(model.root).each((index, element) => {
          data[key] = (data[key] || []).concat(
            this.parse(model, this.$(element), {}),
          );
        });
      } else if (val instanceof Field) {
        const field = val as Field;
        let result = container.find(field.selector);
        if (field.index != null) {
          result = this.$(result[field.index]);
        }
        if (field.attr != null) {
          data[key] = result.attr(field.attr);
        } else {
          data[key] = result.text();
        }
        if (field.template != null) {
          data[key] = new Template(field.template).build({ [key]: data[key] });
        }
      }
    }

    return data;
  }
}
