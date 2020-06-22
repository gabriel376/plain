import { Source, Model, Field } from "../types.ts";

const duckduckgo = new Source({
  description: "Search DuckDuckGo",
  args: [
    {
      name: "--query <query>",
      description: "Search query",
      config: { default: "" },
    },
  ],
  url: "https://duckduckgo.com/html?q=${query}",
  model: new Model({
    root: "html",
    body: {
      results: new Model({
        root: ".result",
        body: {
          title: new Field({
            selector: ".result__a",
          }),
          description: new Field({
            selector: ".result__snippet",
          }),
          link: new Field({
            selector: ".result__url",
            template: "${link.trim()}",
          }),
        },
        template: "[${index}] ${bold(green(title))}\n" +
          "${description}\n" +
          "${blue(underline(link))}\n\n",
      }),
    },
    template: "${results}",
  }),
});

export default duckduckgo;
