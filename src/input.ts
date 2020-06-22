import cac from "https://dev.jspm.io/cac@6.5.10";
import { AbstractInput, IData } from "./types.ts";

export default class Input extends AbstractInput {
  async read(args: string[]): Promise<IData> {
    return new Promise(async (resolve, reject) => {
      const cli = cac(this.name);

      for (const file of Deno.readDirSync("./src/sources")) {
        const name = file.name.slice(0, -3).replace("_", "-");
        const source = (await import(`./sources/${file.name}`)).default;
        const command = cli.command(name, source.description);
        for (const { name, description, config } of source.args) {
          command.option(name, description, config);
        }
        command.action((args: string[]) =>
          resolve({ source: source, args: args })
        );
      }

      cli.option("--json", "Print JSON object", { default: false })
        .option("--refresh", "Refresh cache", { default: false })
        .version(this.version)
        .help()
        .parse(["deno", "cli"].concat(args));
    });
  }
}
