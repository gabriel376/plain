import App from "./app.ts";

await new App({
  name: "plain",
  version: "0.0.1",
  cache: `${Deno.env.get("HOME")}/.cache/plain/`,
  args: Deno.args,
}).run().then(({ input: { args }, json, text }) => {
  console.log(args.json ? JSON.stringify(json, null, 2) : text);
  Deno.exit(0);
}).catch(({ message }) => {
  console.error(message);
  Deno.exit(1);
});
