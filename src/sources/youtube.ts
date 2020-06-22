import { Source, Model, Field } from "../types.ts";

const youtube = new Source({
  description: "Search YouTube",
  args: [
    {
      name: "--query <query>",
      description: "Search query",
      config: { default: "" },
    },
    {
      name: "--page <page>",
      description: "Results pagination",
      config: { default: 1 },
    },
  ],
  url:
    "https://www.youtube.com/results?search_query=${query}&page=${page || 1}",
  model: new Model({
    root: "html",
    body: {
      results: new Model({
        root: ".yt-lockup",
        body: {
          title: new Field({
            selector: ".yt-lockup-title a",
          }),
          description: new Field({
            selector: ".yt-lockup-description",
          }),
          duration: new Field({
            selector: ".video-time",
          }),
          channel: new Field({
            selector: ".yt-lockup-byline a",
          }),
          views: new Field({
            selector: ".yt-lockup-meta-info li",
            index: 0,
          }),
          posted: new Field({
            selector: ".yt-lockup-meta-info li",
            index: 1,
          }),
          link: new Field({
            selector: ".yt-lockup-thumbnail a",
            attr: "href",
            template: "https://www.youtube.com${link}",
          }),
        },
        template: "[${index}] ${bold(green(title))}\n" +
          "${gray(`${channel} | ${views} | ${posted}`)}\n" +
          "${description}\n" +
          "${blue(underline(link))}\n\n",
      }),
    },
    template: "${results}",
  }),
});

export default youtube;
