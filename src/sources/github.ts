import { Source, Model, Field } from "../types.ts";

const github = new Source({
  description: "Search GitHub",
  args: [
    {
      name: "--query <query>",
      description: "Search query",
      config: { default: "" },
    },
    {
      name: "--page <page>",
      description: "Search GitHub",
      config: { default: 1 },
    },
  ],
  url: "https://github.com/search?q=${query}&p=${page}",
  model: new Model({
    root: "html",
    body: {
      results: new Model({
        root: ".repo-list-item",
        body: {
          title: new Field({
            selector: ".text-normal a",
          }),
          stars: new Field({
            selector: ".mr-3:has(svg)",
            template: "${stars.trim() || 0}",
          }),
          programmingLanguage: new Field({
            selector: ".mr-3:has(.repo-language-color)",
            template: "${programmingLanguage.trim()}",
          }),
          updated: new Field({
            selector: ".mr-3:has(relative-time)",
            template: "${updated.trim()}",
          }),
          description: new Field({
            selector: ".mb-1",
            template: "${description.trim()}",
          }),
          link: new Field({
            selector: ".text-normal a",
            attr: "href",
            template: "https://github.com${link}",
          }),
        },
        template: "[${index}] ${bold(green(title))}\n" +
          "${gray(`${stars} stars | ${programmingLanguage} | ${updated}`)}\n" +
          "${description}\n" +
          "${blue(underline(link))}\n\n",
      }),
    },
    template: "${results}",
  }),
});

export default github;
