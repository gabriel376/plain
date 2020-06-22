import { ensureDir } from "https://deno.land/std@0.58.0/fs/ensure_dir.ts";
import { IData } from "./types.ts";
import Action from "./action.ts";
import Input from "./input.ts";
import Template from "./template.ts";
import Parser from "./parser.ts";
import Formatter from "./formatter.ts";

const actions = [
  new Action(
    async function ({ input: { source }, html }: IData): Promise<IData> {
      return { json: new Parser(html, source.model).parse() };
    },
  ),
  new Action(
    async function ({ input: { args, source } }: IData): Promise<IData> {
      return { url: new Template(source.url).build(args) };
    },
  ),
  new Action(
    async function (
      { config: { name, version, args } }: IData,
    ): Promise<IData> {
      return new Input(name, version)
        .read(args)
        .then((input) => ({ input: input }));
    },
  ),
  new Action(
    async function ({ config: { cache }, path, html }: IData): Promise<IData> {
      return ensureDir(cache)
        .then(() => Deno.writeTextFile(path, html))
        .then(() => ({}))
        .catch(() => ({}));
    },
  ),
  new Action(
    async function ({ input: { source }, json }: IData): Promise<IData> {
      return { text: new Formatter(json, source.model).format() };
    },
  ),
  new Action(
    async function ({ input: { args }, url, path }: IData): Promise<IData> {
      return (args.refresh ? Promise.reject() : Deno.readTextFile(path))
        .then((html) => new Response(html))
        .catch(() => fetch(url))
        .then((response) => response.text())
        .then((html) => ({ html: html }))
        .catch(() => {
          throw new Error(`Could not fetch ${url}`);
        });
    },
  ),
  new Action(
    async function ({ config: { cache }, url }: IData): Promise<IData> {
      return { path: `${cache}${btoa(url)}` };
    },
  ),
];

export default actions;
