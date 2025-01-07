import Gio from "gi://Gio";
import GLib from "gi://GLib";

import YAML from "js-yaml";

Gio._promisify(Gio.File.prototype, "load_contents_async");

class Configuration {
  configFile: Gio.File;
  constructor() {
    let dataDir = GLib.get_user_config_dir();
    console.debug("🚀 ~ file: MainWindow.ts:109 ~ dataDir:", dataDir);
    const configFilePath = GLib.build_filenamev([
      dataDir,
      "bender",
      "config.yaml",
    ]);
    this.configFile = Gio.File.new_for_path(configFilePath);
  }

  async #readFile(file: Gio.File) {
    try {
      const [contents, eTag] = await file.load_contents_async(null);
      const decoder = new TextDecoder("utf-8");
      const contentString = decoder.decode(contents);

      console.debug("read config file success : ", contentString);
      return contentString;
    } catch (err) {
      console.debug("read config file failed. ");
      console.debug(err);
      return "";
    }
  }

  async #parseFile(contentsString: string): Promise<Config> {
    try {
      const doc: Config = YAML.load(contentsString) as Config;

      console.debug("parse config file success : ", doc);
      return doc;
    } catch (err) {
      console.debug("parse config file failed : ", err);
      return { version: "1", actions: [] } as Config;
    }
  }

  async getContents() {
    let contents = await this.#readFile(this.configFile);
    if (!contents) {
      contents = `
version: 1.0
actions:
  - label: UPPER CASE
    action: uppercase
  - label: lower case
    action: lowercase
  - label: Underscore
    action: replace ' ' '_'
  - label: "hypenate (dash/-)"
    action: 'replace " " "-"'
  - label: "remove space"
    action: 'replace " " ""'
  - label: "enum"
    action: 'replace " " "_" | uppercase'
      `;
    }
    return await this.#parseFile(contents);
  }
}

export default Configuration;
